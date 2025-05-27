import { Injectable } from '@angular/core';
import { AppData } from '../interfaces/appdata-interface';


@Injectable({
  providedIn: 'root'
})
export class HuchaService {

  private storageKey = 'huchaData';

  localData(): AppData {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : {savings: [], goal: 1000};
  }

  saveData(data: AppData) : void{
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }
}
