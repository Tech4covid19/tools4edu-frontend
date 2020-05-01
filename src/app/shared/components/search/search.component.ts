import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 't4e-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() minimumChars: number = 4;
  @Input() placeholder: string = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>()

  @ViewChild('inputEl') inputEl: ElementRef;

  currentValue: string = '';

  showValidationMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onInputKeyUp(ev) {
    if (ev.key === 'Enter') {
      this.submitSearch();
      return;
    }

    if (this.currentValue !== ev.target.value) {
      this.currentValue = ev.target.value;
      if (this.currentValue.length >= this.minimumChars) {
        this.showValidationMessage = false;
      }
    }
  }

  submitSearch() {
    if (this.currentValue && this.currentValue.length >= this.minimumChars) {
      this.showValidationMessage = false;
      this.onSearch.emit(this.currentValue);
    } else if (this.currentValue.length === 0) {
      this.onSearch.emit('');
    } else {
      this.showValidationMessage = true;
    }
  }

  clearSearch() {
    this.currentValue = '';
    this.onSearch.emit('');
    this.inputEl.nativeElement.value = '';
  }
}
