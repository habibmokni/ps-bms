import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from '@modules/auth/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
    selector: 'sb-register',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './register.component.html',
    styleUrls: ['register.component.scss'],
})
export class RegisterComponent implements OnInit {
    @ViewChild('confirmationModal') confirmationModal!: TemplateRef<unknown>;
    @ViewChild('errorModal') errorModal!: TemplateRef<unknown>;
    error = '';
    registerForm = this.fb.group(
        {
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]],
        },
        { validator: this._checkPasswords }
    );

    constructor(
        private fb: FormBuilder,
        private modalService: NgbModal,
        private router: Router,
        private authService: AuthService
    ) {}
    ngOnInit() {
        this.authService.autoLogin();
        console.log('sss');
    }

    onSubmit() {
        const email = this.registerForm.value.email;
        const password = this.registerForm.value.password;
        let authObs: Observable<AuthResponseData>;

        if (this.registerForm.status === 'VALID') {
            authObs = this.authService.signup(email, password);
            authObs.subscribe(
                resData => {
                    console.log(resData);
                    this.modalService.open(this.confirmationModal).result.then(
                        result => {
                            if (result === 'TALENTS') {
                                this.router.navigate(['/talents/list']);
                            }
                        },
                        reason => {}
                    );
                },
                errorMessage => {
                    console.log(errorMessage);
                    this.error = errorMessage;
                }
            );
        } else {
            this.modalService.open(this.errorModal).result.then(
                result => {
                    if (result === 'ERROR') {
                        this.error = result;
                        console.log(result);
                        this.router.navigate(['/auth/register']);
                    }
                },
                reason => {}
            );
        }
        for (const key in this.registerForm.controls) {
            const control = this.registerForm.controls[key];
            control.markAllAsTouched();
        }
    }
    _checkPasswords(group: FormGroup) {
        const pass = group.controls.password.value;
        const confirmPass = group.controls.confirmPassword.value;
        return pass === confirmPass ? null : { passwordMismatch: true };
    }
    /* Accessor Methods */ get firstNameControl() {
        return this.registerForm.get('firstName') as FormControl;
    }
    get firstNameControlValid() {
        return this.firstNameControl.touched && !this.firstNameControlInvalid;
    }
    get firstNameControlInvalid() {
        return this.firstNameControl.touched && this.firstNameControl.hasError('required');
    }
    get lastNameControl() {
        return this.registerForm.get('lastName') as FormControl;
    }
    get lastNameControlValid() {
        return this.lastNameControl.touched && !this.lastNameControlInvalid;
    }
    get lastNameControlInvalid() {
        return this.lastNameControl.touched && this.lastNameControl.hasError('required');
    }
    get emailControl() {
        return this.registerForm.get('email') as FormControl;
    }
    get emailControlValid() {
        return this.emailControl.touched && !this.emailControlInvalid;
    }
    get emailControlInvalid() {
        return (
            this.emailControl.touched &&
            (this.emailControl.hasError('required') || this.emailControl.hasError('email'))
        );
    }
    get passwordControl() {
        return this.registerForm.get('password') as FormControl;
    }
    get passwordControlValid() {
        return this.passwordControl.touched && !this.passwordControlInvalid;
    }
    get passwordControlInvalid() {
        return (
            this.passwordControl.touched &&
            (this.passwordControl.hasError('required') ||
                this.passwordControl.hasError('minlength'))
        );
    }
    get confirmPasswordControl() {
        return this.registerForm.get('confirmPassword') as FormControl;
    }
    get confirmPasswordControlValid() {
        return this.confirmPasswordControl.touched && !this.confirmPasswordControlInvalid;
    }
    get confirmPasswordControlInvalid() {
        return (
            this.confirmPasswordControl.touched &&
            (this.confirmPasswordControl.hasError('required') ||
                this.confirmPasswordControl.hasError('minlength') ||
                this.registerForm.hasError('passwordMismatch'))
        );
    }
}
