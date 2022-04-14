import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {

  testForm : FormGroup;


  constructor(private _formBuilder: FormBuilder) { 
    this.testForm = this._formBuilder.group({
      name : '',
      tipo_usuario : 0
    })
  }

  ngOnInit(): void {

    
  }


  onFormSubmit(data){
    
    this.testForm.reset();

    console.warn('Your order has been submitted', data.name);
  }

}
