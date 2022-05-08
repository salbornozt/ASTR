import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { FuseCardComponent } from '@fuse/components/card';
import { UserResponseModel } from 'app/core/user/user.response.model';
import { SeguroService } from 'app/services/seguro.service';
import { Seguro } from 'app/services/seguro.types';
import { TipoSeguro } from 'app/services/tipo.seguro.type';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector       : 'cards',
    templateUrl    : './cards.component.html',
    styles         : [
        `
            cards fuse-card {
                margin: 16px;
            }
        `
    ],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsComponent implements AfterViewInit, OnInit
{
    @ViewChildren(FuseCardComponent, {read: ElementRef}) private _fuseCards: QueryList<ElementRef>;

    filters: string[] = ['all', 'article', 'listing', 'list', 'info', 'shopping', 'pricing', 'testimonial', 'post', 'interactive'];
    numberOfCards: any = {};
    selectedFilter: string = 'all';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    tiposSeguros$: Observable<TipoSeguro[]>;
    seguros$: Observable<Seguro[]>;

    /**
     * Constructor
     */
    constructor(private _renderer2: Renderer2, private _seguroService: SeguroService)
    {
    }
    ngOnInit(): void {
        /**
         * observador
         */
         this.tiposSeguros$ = this._seguroService.tiposSeguros$;
         /**
          * llama los datos 
          */
         this._seguroService.getTipoSeguros()
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe((response: UserResponseModel) => {
                let seguros = response.body;
                console.log("gere "+this.filters.length);
                
                for(let s of seguros){
                    console.log("gere "+s.nom_tipo_seguro);

                    this.filters.push(s.nom_tipo_seguro);
                }
                console.log("gere "+this.filters.length);
             });

             /**
         * observador
         */
        this.seguros$ = this._seguroService.seguros$;
        /**
         * llama los datos 
         */
        this._seguroService.getSeguros()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((seguros: UserResponseModel) => {

            });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * After view init
     */
    ngAfterViewInit(): void
    {
        // Calculate the number of cards
        this._calcNumberOfCards();

        // Filter the cards for the first time
        this._filterCards();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * On filter change
     *
     * @param change
     */
    onFilterChange(change: MatButtonToggleChange): void
    {
        // Set the filter
        this.selectedFilter = change.value;

        // Filter the cards
        this._filterCards();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _calcNumberOfCards(): void
    {
        // Prepare the numberOfCards object
        this.numberOfCards = {};

        // Prepare the count
        let count = 0;

        // Go through the filters
        this.filters.forEach((filter) => {

            // For each filter, calculate the card count
            if ( filter === 'all' )
            {
                count = this._fuseCards.length;
            }
            else
            {
                count = this.numberOfCards[filter] = this._fuseCards.filter(fuseCard => fuseCard.nativeElement.classList.contains('filter-' + filter)).length;
            }

            // Fill the numberOfCards object with the counts
            this.numberOfCards[filter] = count;
        });
    }

    /**
     * Filter the cards based on the selected filter
     *
     * @private
     */
    private _filterCards(): void
    {
        // Go through all fuse-cards
        this._fuseCards.forEach((fuseCard) => {

            // If the 'all' filter is selected...
            if ( this.selectedFilter === 'all' )
            {
                // Remove hidden class from all cards
                fuseCard.nativeElement.classList.remove('hidden');
            }
            // Otherwise...
            else
            {
                // If the card has the class name that matches the selected filter...
                if ( fuseCard.nativeElement.classList.contains('filter-' + this.selectedFilter) )
                {
                    // Remove the hidden class
                    fuseCard.nativeElement.classList.remove('hidden');
                }
                // Otherwise
                else
                {
                    // Add the hidden class
                    fuseCard.nativeElement.classList.add('hidden');
                }
            }
        });
    }
}
