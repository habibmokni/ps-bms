import { TestBed } from '@angular/core/testing';

import { TalentsService } from './talents.service';

describe('TalentsService', () => {
    let talentsService: TalentsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TalentsService],
        });
        talentsService = TestBed.get(TalentsService);
    });

    describe('getTalents$', () => {
        it('should return Observable<Talents>', () => {
            talentsService.getTalents$().subscribe(response => {
                expect(response).toEqual({});
            });
        });
    });
});
