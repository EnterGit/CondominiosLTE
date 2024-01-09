import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RutService  } from 'rut-chileno';
@Component({
  selector: 'app-registrovisitas',
  templateUrl: './registrovisitas.component.html',
  styleUrls: ['./registrovisitas.component.scss']
})
export class RegistrovisitasComponent implements OnInit {
  currentTime: string;
  timeControl: FormControl;
  form!: FormGroup;
  formValid!: string;
  currentDate = new Date();
  twoDaysAgo = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate() - 2);

  
  // date: Date = new Date();
  // settings = {
  //     bigBanner: true,
  //     timePicker: false,
  //     format: 'dd-MM-yyyy',
  //     defaultOpen: true
  // }
  
  constructor(
    private fb: FormBuilder, 
    private rutService: RutService
    ) { 
  }

  ngOnInit(): void {
    this.updateTime();

  this.form = this.fb.group({
    nombre: ["", [Validators.required, Validators.minLength(5)]],
    rut: ["", [Validators.required, this.rutService.validaRutForm]], // <- Aqui es donde viene el validador la funcion validaRutForm la cual retorna un null o un objeto { [key: string]: boolean } 
  });

  }



  dateFilter = (date: Date | null): boolean => {
    if (date) {
      // Allow only dates before today.
      return date >= this.twoDaysAgo && date <= this.currentDate;
    }
    return true;
  }

  updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;
  }

  inputEvent(event : Event) {
    let rut = this.rutService.getRutChileForm(1, (event.target as HTMLInputElement).value)
    if (rut)
      this.form.controls['rut'].patchValue(rut, {emitEvent :false});
  }

  save() {
    console.log(this.form)

    if (this.form.valid) {
      this.formValid = "Form valid ";
    }
    console.log(this.form.value);
  }

}
