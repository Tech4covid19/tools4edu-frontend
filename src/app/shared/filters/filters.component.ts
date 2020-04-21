import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IFilterField, IFilters} from './interfaces/filters.interface';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 't4e-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @Input() title: string;
  @Input() fields: Observable<IFilters>;
  @Input() selectedIndexes: number[] = [];
  @Output() onSelectFields: EventEmitter<string[]> = new EventEmitter<string[]>();

  selectedFields$: Observable<string[]>

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
        if (this.selectedIndexes.length > 0 && this.selectedIndexes.includes(index)) {
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

}
