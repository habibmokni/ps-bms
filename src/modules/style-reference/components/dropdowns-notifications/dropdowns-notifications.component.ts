import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CodeSample } from '@modules/style-reference/models';

@Component({
    selector: 'sbpro-dropdowns-notifications',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dropdowns-notifications.component.html',
    styleUrls: ['dropdowns-notifications.component.scss'],
})
export class DropdownsNotificationsComponent implements OnInit {
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
a.dropdown-item.sb-dropdown-notifications-item
    .sb-dropdown-notifications-item-icon.bg-warning
        i-feather(name='activity')
    .sb-dropdown-notifications-item-content
        .sb-dropdown-notifications-item-content-details
            | Dropdown Item Details
        .sb-dropdown-notifications-item-content-text
            | This is the dropdown item text. It will truncate after a fixed width.
`.trim();
