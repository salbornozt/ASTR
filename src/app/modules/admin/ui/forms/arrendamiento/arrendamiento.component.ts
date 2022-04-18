import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
    selector     : 'forms-arrendamiento',
    templateUrl  : './arrendamiento.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormsArrendamientosComponent
{
    formFieldHelpers: string[] = [''];

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
}
