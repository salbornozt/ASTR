import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'empleado',
    templateUrl    : './empleados.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpleadoComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
