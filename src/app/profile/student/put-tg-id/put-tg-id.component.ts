import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@Component({
  selector: 'app-put-tg-id',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        NgMultiSelectDropDownModule
    ],
  templateUrl: './put-tg-id.component.html',
  styleUrl: './put-tg-id.component.css'
})
export class PutTgIdComponent {

}
