import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  encrypt(value: string): string {
    const encrypted = CryptoJS.AES.encrypt(value, environment.encryption.secretKey);

    return encrypted.toString();
  }

  decrypt(value: string): string {
    const decrypted = CryptoJS.AES.decrypt(value, environment.encryption.secretKey);

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
