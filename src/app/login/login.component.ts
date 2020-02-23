import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { User } from '../editor/models/user';


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
    submitted = false;
    loginUser: User;
    submitForm;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) { 
        //     this.router.navigate(['/']);
        // }
        this.submitForm = this.formBuilder.group({
          email: '',
          password: ''
        });
    }

    ngOnInit() {
      
        // this.loginForm = this.formBuilder.group({
        //     username: ['', Validators.required],
        //     password: ['', Validators.required]
        // });

        // // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }

    onSubmit(formValue: any) {
      this.submitted = true;
      this.authenticationService.getUserId(formValue.email, formValue.password).subscribe({
        next: userId => {
          if (userId) {
            this.router.navigate(['/editor']);
            localStorage.setItem('loggedUser', JSON.stringify({userId: userId, loggedDate: Date.now}))
          } else {
            alert('Wrong email address or password.\nPlease try again.')
          }
        }
      });
      
    }
}
