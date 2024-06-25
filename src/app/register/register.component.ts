import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserMgmService } from "../user-mgm/user-mgm.service";
import { Roles } from "../models";

// The main responsibility of this component is to handle the user's login process.
// This is the starting point for the login process. Any component that needs to authenticate
// a user can simply perform a redirect to this component with a returnUrl query parameter and
// let the component perform the login and return back to the return url.
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true
})
export class RegisterComponent {
  constructor(private userService: UserMgmService) {
  }

  registerFormGroup = new FormGroup({
    emailField: new FormControl('', [ Validators.required, Validators.email ]),
    pass1Field: new FormControl('', [ Validators.required ]),
    pass2Field: new FormControl('', [ Validators.required ]),
  })

  selectRole = Roles[0]

  registerHandle() {
    this.userService.register({
      email: this.registerFormGroup.controls.emailField.value!,
      pass: this.registerFormGroup.controls.pass1Field.value!,
      tags: [],
      role: this.selectRole,
      subscribedTo: [],
      tgId: '',
      selectedChannel: 'none',
    })
  }

  onSelectedRole(value: string) {
    this.selectRole = value
  }

  protected readonly Roles = Roles;
}
