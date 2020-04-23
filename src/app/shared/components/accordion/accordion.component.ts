import {Component, Input} from '@angular/core';
import {IFaqItem} from '../../../interfaces/faq-item.interface';

@Component({
  selector: 't4e-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {

  @Input() faqItem: IFaqItem;

  open: boolean = false;

  constructor() { }

  toggle() {
    this.open = !this.open;
  }

}
