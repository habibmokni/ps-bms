import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'ps-talents',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './talents.component.html',
    styleUrls: ['talents.component.scss'],
})
export class TalentsComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
