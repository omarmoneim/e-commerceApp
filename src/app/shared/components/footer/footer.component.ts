import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';


@Component({
  selector: 'app-footer',
  imports: [InputTextModule,FormsModule ,FloatLabel],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
      value1: string | undefined;


}
