import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-portones',
  templateUrl: './portones.component.html',
  styleUrls: ['./portones.component.scss']
})
export class PortonesComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PortonesComponent>, private buildr: FormBuilder) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    console.log(this.data);
  }

  setpopupdata(code: any) {


    
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    descripcion: this.buildr.control('')
  });

  SavePorton() {
    this.closepopup();

    
  }

}