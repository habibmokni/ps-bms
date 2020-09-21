import { TestBed } from '@angular/core/testing';

import { TalentsGuard } from './talents.guard';

describe('_Template Module Guards', () => {
    let talentsGuard: TalentsGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [TalentsGuard],
        });
        talentsGuard = TestBed.get(TalentsGuard);
    });

    describe('canActivate', () => {
        it('should return an Observable<boolean>', () => {
            talentsGuard.canActivate().subscribe(response => {
                expect(response).toEqual(true);
            });
        });
    });

});
