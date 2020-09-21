import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    TemplateRef,
} from '@angular/core';
import { AuthService } from '@modules/auth/services';
import { talentProfil } from '@modules/talents/interfaces/talentsProfil';
import { TalentsService } from '@modules/talents/services';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
    selector: 'ps-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    loadedProfiles: talentProfil[] = [];
    selectedProfil: any;
    ProfilData: any;
    selectedProfileID = '';
    defaultJob = 'Front End Senior';
    jobs = [
        { value: 'Front End Senior', display: 'Front End Senior' },
        { value: 'Front End Junior', display: 'Front End Junior' },
        { value: 'Back End Senior', display: 'Back End Senior' },
        { value: 'Back End Junior', display: 'Back End Junior' },
        { value: 'Senior Fullstack', display: 'Senior Fullstack' },
        { value: 'Junior Fullstack', display: 'Junior Fullstack' },
        { value: 'Testautomatisierer', display: 'Testautomatisierer' },
        { value: 'Werkstudent', display: 'Werkstudent' },
    ];
    status = 'Contacted';
    // notes = 'this.selectedProfil.notes';
    error: any = null;
    isFetching = false;
    userSub: Subscription;

    constructor(
        private modalService: NgbModal,
        private talentsService: TalentsService,
        private cd: ChangeDetectorRef,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.onFetchTalents();
            this.isAuthenticated = !!user;
            console.log(this.isAuthenticated);
        });
    }

    open(content: TemplateRef<any>, modalOptions: NgbModalOptions = {}) {
        this.modalService.open(content, modalOptions).result.then(
            result => {
                console.log(`closed with ${result}`);
            },
            reason => {
                console.log(`Dismissed ${this._getDismissReason(reason)}`);
            }
        );
    }

    _getDismissReason(reason: unknown): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    onSubmit(form: talentProfil) {
        // Send Http request
        this.talentsService.createandStoreTalents(form).subscribe(
            talents => {
                // this.isFetching = false;
                // this.loadedProfiles = talents;
                // this.cd.detectChanges();
                this.onFetchTalents();
            },
            error => {
                // this.isFetching = false;
                this.error = error.message;
            }
        );
        // this.cd.detectChanges();
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onFetchTalents() {
        this.isFetching = true;
        this.talentsService.fetchTalents().subscribe(
            talents => {
                this.isFetching = false;
                this.loadedProfiles = talents;
                this.cd.detectChanges();
            },
            error => {
                this.isFetching = false;
                this.error = error.message;
            }
        );
    }
    onDeleteTalents(id: string) {
        console.log(id);
        this.talentsService.deleteTalent(id).subscribe(() => {
            this.loadedProfiles = [];
            this.cd.detectChanges();
            this.onFetchTalents();
        });
    }

    onFetchTalentProfil(id: string) {
        this.saveSelectedProfilID(id);
        console.log(id);
        this.talentsService.showTalentProfil(id).subscribe(value => {
            console.log(value);
            return (this.selectedProfil = value);
        });
    }

    onUpdateTalentProfil(form: talentProfil, id: string) {
        console.log(form);
        this.talentsService.updateProfil(form, this.selectedProfileID).subscribe(responseData => {
            console.log(responseData);
            this.ProfilData = responseData;
            this.onFetchTalents();
        });
        // this.cd.detectChanges();
        // this.onFetchTalents();
    }

    saveSelectedProfilID(value: string) {
        this.selectedProfileID = value;
    }
}
