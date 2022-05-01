import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserResponseModel } from 'app/core/user/user.response.model';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { ContactsService } from 'app/modules/admin/apps/contacts/contacts.service';
import { Contact } from 'app/modules/admin/apps/contacts/contacts.types';
import { CampoSeguro } from 'app/services/campo.seguro.type';
import { ProcesoService } from 'app/services/processs/proceso.service';
import { SeguroService } from 'app/services/seguro.service';
import { Seguro } from 'app/services/seguro.types';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'forms-wizards',
    templateUrl: './wizards.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormsWizardsComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    horizontalStepperForm: FormGroup;
    verticalStepperForm: FormGroup;
    seguros$: Observable<Seguro[]>;
    contacts$: Observable<Contact[]>;
    users$: Observable<User[]>
    campos$: Observable<CampoSeguro[]>


    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
        private segurosService: SeguroService,
        private _contactsService: ContactsService,
        private _userService: UserService,
        private _router: Router,
        private _procesoService :ProcesoService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // get seguros
        // Get the contacts
        /**
         * observador
         */
        this.seguros$ = this.segurosService.seguros$;
        /**
         * llama los datos 
         */
        this.segurosService.getSeguros()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((seguros: UserResponseModel) => {

            });


        // Get the contacts
        this.contacts$ = this._contactsService.contacts$;
        this._contactsService.getContacts()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contacts: UserResponseModel) => {

            });

        // Get users
        this.users$ = this._userService.users$;
        this._userService.list()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contacts: UserResponseModel) => {

            });

        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            campos : this._formBuilder.array([]),
            step1: this._formBuilder.group({
                seguroSeleccionado: ['', [Validators.required]],
                clienteSeleccionado: ['', Validators.required],
                empleadoSeleccionado: ['', Validators.required]
            }),
            step2: this._formBuilder.group({
                
            }),
            step3: this._formBuilder.group({
                byEmail: this._formBuilder.group({
                    companyNews: [true],
                    featuredProducts: [false],
                    messages: [true]
                }),
                pushNotifications: ['everything', Validators.required]
            })
            
        });

        


    }

    finalizarRegistro() {
        // Get the contact object
        const stepForm = this.horizontalStepperForm.getRawValue();
        console.log(stepForm);
        let proceso = {
            "cod_seguro": stepForm.step1.seguroSeleccionado,
            "cod_usuario": stepForm.step1.empleadoSeleccionado,
            "cod_cliente": stepForm.step1.clienteSeleccionado,
            "cod_status": 1,
            "fecha_inicio": "2022-04-24",
            "fecha_final": "2022-04-24"
        }

        let req = {
            "proceso" : proceso,
            "campos" : stepForm.campos
        }
        this._procesoService.add(req).subscribe(()=>{
            this._router.navigateByUrl('/apps/ecommerce/inventory');

        },(response)=>{
        });

    }

    getCampoSeguro() {

        // Get the contact object
        const stepForm = this.horizontalStepperForm.getRawValue();
        let codSeguro = stepForm.step1.seguroSeleccionado
        this.campos$ = this.segurosService.campos$;


        this.segurosService.getCamposSeguros(codSeguro).pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response: UserResponseModel) => {
                let list: CampoSeguro[] = response.body;
                //clear
                (this.horizontalStepperForm.get('campos') as FormArray).clear();
                // Create an empty email form group
                for(let campo of list){
                    const campoFormGroup = this._formBuilder.group({
                        name: [campo.nom_campo],
                        valor: [''],
                        url: ['']
                    });
                    (this.horizontalStepperForm.get('campos') as FormArray).push(campoFormGroup);
                }
                
                console.log((this.horizontalStepperForm.get('campos') as FormArray).controls);
                /*
                this.horizontalStepperForm.removeControl('step2');
                let form = new FormGroup({});
                
                //(this.horizontalStepperForm.get('step2') as FormGroup).removeControl('');
                for(let campo of list){
                    form.addControl(campo.nom_campo,new FormControl('', [Validators.required]));
    
                    form.addControl('url_'+campo.nom_campo,new FormControl('', []));
                }
                this.horizontalStepperForm.addControl('step2',form);
                */



            });


    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();


    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
     trackByFn(index: number, item: any): any
     {
         return item.id || index;
     }
}
