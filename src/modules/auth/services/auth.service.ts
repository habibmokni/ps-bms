import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AlertComponent } from '../../app-common/components';
import { User } from '../models/user.model';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registred?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    isLogged = new BehaviorSubject(true);
    isLogged2 = false;

    constructor(private http: HttpClient, private router: Router) {}

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    signup(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoSgOQ7EgXy1lTu679fBfgxIwHeGL9YfQ',
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuth(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    login(email: string, password: string) {
        return this.http
            .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoSgOQ7EgXy1lTu679fBfgxIwHeGL9YfQ',
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            )
            .pipe(
                catchError(this.handleError),
                tap(resData => {
                    // this.isAuth.next(resData.idToken);
                    this.handleAuth(
                        resData.email,
                        resData.localId,
                        resData.idToken,
                        +resData.expiresIn
                    );
                })
            );
    }

    logout() {
        /*
        this.user.next(null);
        this.router.navigate(['/auth/login']);
        window.localStorage.removeItem('access-token'); */

        this.user.next(null);
        this.router.navigate(['/auth/login']);
        localStorage.removeItem('userData');
        localStorage.removeItem('access-token');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
        console.log('handleAuth');
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                alert(errorMessage);
                location.reload();
                break;
            case 'EMAIL_NOT_FOUND':
                alert('Login failed: Invalid username or password.');
                errorMessage = 'This email does ont exist';
                location.reload();
                break;
            case 'INVALID_PASSWORD':
                alert('Login failed: Invalid username or password.');
                errorMessage = 'Password not correct';
                location.reload();
                break;
        }
        return throwError(errorMessage);
    }
    /* getAuth$(): Observable<{}> {
        return of({});
    } */
}
