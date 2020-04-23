import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {IFilterField, IFilters} from './interfaces/filters.interface';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {filter} from 'rxjs/operators';

@Component({
  selector: 't4e-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges, OnDestroy {

  @Input() title: string;
  @Input() fields: Observable<IFilters>;
  @Input() initialFilters: string[];
  @Input() selectedFilters: BehaviorSubject<string[]>;
  @Output() onSelectFields: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedFiltersSubscription: Subscription;

  filterForm: FormGroup
  filterFields: IFilterField[];

  formReady: boolean = false;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      filters: new FormArray([])
    })
  }

  ngOnInit(): void {
    this.fields.subscribe((result) => {
      if (!result.filterFields) return;

      this.filterFields = result.filterFields;

      result.filterFields.forEach((field, index) => {
        let state = '';
        if (this.selectedFilters && this.selectedFilters.getValue().length > 0 && this.selectedFilters.getValue().includes(field.value)) {
          state = field.value;
        }
        (this.filterForm.controls.filters as FormArray).push(
          new FormControl(state)
        )
      })

      this.formReady = true;
    })

    this.filterForm.get('filters').valueChanges.subscribe((result) => {
      if (!this.formReady) return;

      this.onSelectFields.emit(result)
    })
  }

  toggleFieldValue(index: number, newValue: string) {
    const currentValue = this.filterControls[index].value;
    const currentSelectedFiltersObs = this.selectedFilters.getValue();
    const selectedFilters = this.filterForm.value.filters
      .map((value, idx) => ( value ? this.filterFields[idx].value : null))
      .filter(value => value !== null);

    (this.filterForm.get('filters') as FormArray).controls[index]
      .setValue(currentValue ? "" : newValue)
  }

  isSelected(itemValue: string) {
    const selectedFilters = this.filterForm.value.filters
      .map((value, idx) => ( value ? this.filterFields[idx].value : null))
      .filter(value => value !== null);

    return selectedFilters.includes(itemValue)
  }

  get filterControls() {
    return (this.filterForm.get('filters') as FormArray).controls
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedFilters && !this.selectedFiltersSubscription) {
      this.selectedFiltersSubscription = this.selectedFilters.subscribe((result) => {
        for (let filterControl of (this.filterForm.get('filters') as FormArray).controls) {
          if (!result.includes(filterControl.value)) {
            filterControl.setValue("");
          }
        }
      })
    }

  }

  ngOnDestroy(): void {
    if (this.selectedFiltersSubscription) {
      this.selectedFiltersSubscription.unsubscribe();
    }
  }

}
