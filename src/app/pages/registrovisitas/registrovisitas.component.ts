import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrovisitas',
  templateUrl: './registrovisitas.component.html',
  styleUrls: ['./registrovisitas.component.scss']
})
export class RegistrovisitasComponent implements OnInit {
  currentTime: string;
  timeControl: FormControl;
  
  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: true
  }
  
  constructor() { 
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  ngOnInit(): void {
    // this.timeControl = new FormControl('', [
    //   Validators.required,
    //   Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]')
    // ]);
  }
}
