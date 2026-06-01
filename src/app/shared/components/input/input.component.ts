import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';


@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule,FloatLabelModule,InputTextModule,Message],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control:any
  @Input() element:string= 'input'
  @Input() inputId!:string
  @Input() inputType!:string
  @Input() LabelInput!:string
  @Input() readonly:boolean = false

  flagPassword :boolean = true



}
