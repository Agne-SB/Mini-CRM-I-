import { Component } from '@angular/core';
import { FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-company',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './new-company.html',
  styleUrl: './new-company.css',
})
export class NewCompany {

  public newCompanyForm: FormGroup;

  constructor() {
    this.newCompanyForm = new FormGroup({

      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),

      'companyCode': new FormControl(null, [
        Validators.pattern('^[0-9]*$')
      ]),

      'vatCode': new FormControl(null, [
        Validators.pattern('^(LT)?[0-9]*$')
      ]),

      'address': new FormControl(null),

      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),

      'phone': new FormControl(null, [
        Validators.pattern(/^(\+370[0-9]{6,8})?$/)
      ]),

      'contacts': new FormArray([
        this.createContactGroup()
      ])
    });
  }


  get contacts(): FormArray {
    return this.newCompanyForm.get('contacts') as FormArray;
  }

  private createContactGroup(): FormGroup {
    return new FormGroup({

      'firstName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),

      'lastName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),

      'position': new FormControl(null),

      'contactPhone': new FormControl(null, [
        Validators.pattern(/^(\+370[0-9]{6,8})?$/)
      ])
    });
  }

  public addContact(): void {
    this.contacts.push(this.createContactGroup());
  }

  public removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  public submitForm() {
    if (this.newCompanyForm.invalid) {
      this.newCompanyForm.markAllAsTouched();
      console.log('Forma užpildyta neteisingai');
      console.log(this.newCompanyForm.value);
      return;
    }

    console.log('Saugoti duomenis');
    console.log(this.newCompanyForm.value);
    console.log(this.newCompanyForm.valid);
  }

}
