import { Component } from '@angular/core';
import { AppData } from './interfaces/appdata-interface';
import { HuchaService } from './services/hucha.service';
import { Saving } from './interfaces/saving-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-hucha';

  currentView: 'dashboard' | 'add' | 'withdraw' | 'history' | 'settings' = 'dashboard';

  data: AppData;
  amount=2;
  note='';
  newGoal='';
  withdrawAmount=2;
  withdrawNote='';

  constructor(private huchaService: HuchaService){
    this.data = this.huchaService.localData();
    this.newGoal=this.data.goal.toString();
  }

  get totalSaved(): number{
    return this.data.savings.reduce((sum, s)=>sum+s.amount, 0);
  }

  get progress() : number{
    return this.data.goal >0 ? (this.totalSaved /this.data.goal) *100 : 0;
  }

  addSaving(){
    const saving: Saving = {
      id: Date.now.toString(),
      amount: this.amount,
      note: this.note,
      date: new Date().toISOString(),
    };
    this.data.savings.unshift(saving);
    this.save();
    this.amount=2;
    this.note='';
    this.currentView='dashboard';
  }

  removeSaving(amount: number, note: string){
    const withdrawal: Saving = {
      id: Date.now.toString(),
      amount: -amount,
      note,
      date: new Date().toISOString(),
    };
    this.data.savings.unshift(withdrawal);
    this.save();
  }

  handleWithdrawal(){
    if(this.withdrawAmount && this.withdrawNote){
      this.removeSaving(this.withdrawAmount, this.withdrawNote);
      this.withdrawAmount=2;
      this.withdrawNote='';
      this.currentView='dashboard';
    }
  }

  updateGoal(){
    this.data.goal=parseFloat(this.newGoal);
    this.save();
  }

  resetSavings(){
    if(confirm('¿Estás seguro de querer reiniciar la hucha?')){
      this.data.savings=[];
      this.save();
    }
  }

  private save(){
    this.huchaService.saveData(this.data);
  }
}
