import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public dbContext: AngularFireDatabase) { }

  private getTable(tableName: string) {
    return this.dbContext
      .list(tableName);
  }

  // Return a single observable item
  get(tableName: string, key: string): Observable<any> {
    return this.dbContext
      .object(`/${tableName}/${key}`)
      .valueChanges()
      .pipe(
        map((record: any) => record ? ({ key, ...record }) : record)
      );
  }

  // Return a list of observable item
  getAll(tableName: string): Observable<any[]> {
    return this.getTable(tableName)
      .snapshotChanges()
      .pipe(
        map((records: any[]) => records.map(record => record ? ({ key: record.key, ...record.payload.val() as any }) : record))
      );
  }

  // Save single item
  save(tableName: string, record: any): Promise<any> {
    const { key, ...model } = record;
    delete model.key;

    if (!key) {
      return this.create(tableName, model);
    } else {
      return this.update(tableName, key, model);
    }
  }

  // Create a new item
  private create(tableName: string, record: any): Promise<any> {
    return this.getTable(tableName)
      .push(record)
      .then((response: any) => {
        console.log(`Record created in table [${tableName}].`);
        console.log('record =', record);
        console.log('create().response =', response);

        return response;
      })
      .catch(error => this.handleError(error));
  }

  // Update an existing item
  private update(tableName: string, key: string, record: any): Promise<void> {
    return this.getTable(tableName)
      .update(key, record)
      .then((response: any) => {
        console.log(`Record with key [${key}] updated successfully in table [${tableName}].`);
        console.log('record =', record);
        console.log('update().response =', response);

        return response;
      })
      .catch((error: any) => this.handleError(error));
  }

  // Deletes a single item
  delete(tableName: string, key: string): Promise<void> {
    return this.getTable(tableName)
      .remove(key)
      .then(response => {
        console.log(`Record with key [${key}] deleted successfully from table [${tableName}].`);
        console.log('delete().response =', response);

        return response;
      })
      .catch(error => this.handleError(error));
  }

  // Deletes the entire list of items
  deleteAll(tableName: string): Promise<void> {
    return this.getTable(tableName)
      .remove()
      .then(response => {
        console.log(`All records were deleted successfully from table [${tableName}].`);
        console.log('deleteAll().response =', response);

        return response;
      })
      .catch(error => this.handleError(error));
  }

  // Default error handling for all actions
  private handleError(error: any) {
    console.error(error);
  }
}
