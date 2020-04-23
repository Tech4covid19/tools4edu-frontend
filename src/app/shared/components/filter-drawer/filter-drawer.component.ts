import {Component, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges} from '@angular/core';

@Component({
  selector: 't4e-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnChanges {

  @Input() isOpened: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpened'].currentValue === true) {
      this.renderer.addClass(document.body, 'overflow-hidden')
      this.renderer.addClass(document.body, 'overlay')
      document.querySelector('.t4e-filter-drawer__content').scroll(0,0);
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden')
      this.renderer.removeClass(document.body, 'overlay')
    }
  }

  handleClose() {
    this.onClose.emit(true);
  }

}
