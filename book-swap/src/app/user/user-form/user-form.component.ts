import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() selectedUser: User;

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  public userForm: FormGroup;
  public hidePassword = true;

  constructor(private formBuilder: FormBuilder) { }

  private createForm() {
    this.userForm = this.formBuilder.group({
      key: new FormControl(''),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      name: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });

    if (this.selectedUser && this.selectedUser.key) {
      this.userForm.patchValue(this.selectedUser);
    }
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this.save.emit(this.userForm);
  }

  onDelete() {
    this.delete.emit(this.userForm);
  }

  onCancel() {
    this.cancel.emit();
    this.userForm.reset();
  }

}
