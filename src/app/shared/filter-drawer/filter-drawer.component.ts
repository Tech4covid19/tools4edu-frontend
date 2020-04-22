import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 't4e-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {

  @Input() isOpened: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  handleClose() {
    this.onClose.emit(true);
  }

}
