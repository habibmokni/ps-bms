// tslint:disable: prettier
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    /* intercept(req: HttpRequest<any>, next: HttpHandler){

        if(localStorage.getItem('access-token') != null) {
            const token =  localStorage.getItem('access-token');
            // const headers = new HttpHeaders().set('access-token', token);
            const AuthRequest = req.clone({
                params: new HttpParams().set('auth', token)
            });
            console.log(AuthRequest);
            return next.handle(AuthRequest)
        }else {
            return next.handle(req);
        }
    } */

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
          take(1),
          exhaustMap(user => {
            if (!user) {
              return next.handle(req);
            }
            const userReq = req.clone({
              params: new HttpParams().set('auth', user.token)
            });
            return next.handle(userReq);
          })
        );
      }

}



        /* console.log('//////////////////////////interceptor');
                /* localStorage.setItem('token', 'code');
                console.log(localStorage.getItem('token'));
        const bla = this.authService.user.subscribe(value => {
            console.log(value);
        });
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                console.log(user);
                if (!user) {
                    return next.handle(req);
                }else{
                    // console.log(user.token);
                    const userReq = req.clone({
                        params: new HttpParams().set('auth', user.token)
                    });
                    console.log(userReq.params);
                    return next.handle(userReq);
                }

            })
        );
    }} */

