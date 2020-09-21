import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponseData, AuthService } from '@modules/auth/services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    error = '';
    token = '';

    constructor(
        private fb: FormBuilder,
        private modalService: NgbModal,
        private router: Router,
        private authService: AuthService
    ) {}

    /* Accessor Methods */

    get emailControl() {
        return this.loginForm.get('email') as FormControl;
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
        return this.loginForm.get('password') as FormControl;
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
    // isLoginMode = true;

    @ViewChild('confirmationModal') confirmationModal!: TemplateRef<unknown>;
    @ViewChild('errorModal') errorModal!: TemplateRef<unknown>;
    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        checkbox: [false],
    });

    // onSwitchMode() {
    //     this.isLoginMode = !this.isLoginMode;
    // }
    ngOnInit() {}

    onSubmit() {
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;
        let authObs: Observable<AuthResponseData>;

        if (this.loginForm.status === 'VALID') {
            // console.log(email, password);
            authObs = this.authService.login(email, password);
        } else {
            alert('This is alert box!');
            console.log(email, password);
        }
        authObs.subscribe(
            resData => {
                console.log('restdata ', resData);
                this.authService.isLogged.next(true);
                this.authService.isLogged2 = true;
                console.log(this.authService.isLogged2);
                localStorage.setItem('access-token', resData.idToken);
                this.router.navigate(['/talents/list']);
                // console.log(localStorage.getItem('access-token'));
            },
            errorMessage => {
                this.authService.isLogged.next(false);
                console.log(errorMessage);
                this.error = errorMessage;
                this.modalService.open(this.errorModal).result.then(
                    result => {
                        if (result === 'ERROR') {
                            this.router.navigate(['/auth/login']);
                        }
                    },
                    reason => {}
                );
            }
        );
        for (const key in this.loginForm.controls) {
            const control = this.loginForm.controls[key];
            control.markAllAsTouched();
        }
    }
}
