import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CodeSample } from '@modules/style-reference/models';

@Component({
    selector: 'sbpro-buttons-transparent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './buttons-transparent.component.html',
    styleUrls: ['buttons-transparent.component.scss'],
})
export class ButtonsTransparentComponent implements OnInit {
    codeSamples: CodeSample[] = [
        {
            language: 'pug',
            code: pugCode,
        },
    ];
    constructor() {}
    ngOnInit() {}
}

const pugCode = `
button.my-1.mr-2.btn.sb-btn-transparent-dark.mr-2(type='button') Hover Me!
button.my-1.mr-2.btn.sb-btn-transparent-dark.sb-btn-icon(type='button')
    i-feather(name='feather')
`.trim();
