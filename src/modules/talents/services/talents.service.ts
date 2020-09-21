import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, UserService } from '@modules/auth/services';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { talentProfil } from '../interfaces/talentsProfil';

@Injectable()
export class TalentsService {
    ProfilData: any;
    constructor(
        private http: HttpClient,
        private userServ: UserService,
        private authService: AuthService
    ) {}

    createandStoreTalents(form: talentProfil): Observable<any> {
        return this.http.post<{ name: string }>(
            'https://peaksoft-47458.firebaseio.com/talents.json',
            form
        );
    }

    fetchTalents() {
        const param = {
            auth: localStorage.getItem('access-token'),
        };
        return this.http
            .get<{ [key: string]: talentProfil }>(
                'https://peaksoft-47458.firebaseio.com/talents.json',
                { params: param }
            )
            .pipe(
                map(responseData => {
                    const talentsArray: talentProfil[] = [];
                    for (const key in responseData) {
                        if (responseData.hasOwnProperty(key)) {
                            talentsArray.push({ ...responseData[key], id: key });
                            // console.log(this.authService.login);
                        }
                    }
                    console.log(talentsArray);
                    return talentsArray;
                })
            );
    }

    deleteTalent(id: string) {
        const param = {
            auth: localStorage.getItem('access-token'),
        };
        return this.http.delete(`https://peaksoft-47458.firebaseio.com/talents/${id}.json`);
    }

    showTalentProfil(id: string) {
        const param = {
            auth: localStorage.getItem('access-token'),
        };
        return this.http.get(`https://peaksoft-47458.firebaseio.com/talents/${id}.json`).pipe(
            map(responseData => {
                // console.log(responseData);
                this.ProfilData = responseData;
                return responseData;
            })
        );
    }

    updateProfil(form: talentProfil, id: string) {
        console.log(id);
        return this.http.put(`https://peaksoft-47458.firebaseio.com/talents/${id}.json`, form);
    }

    /* getTalents$(): Observable<{}> {
        return of({});
    } */
}
