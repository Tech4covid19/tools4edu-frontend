import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {EgoiService} from '../../services/egoi.service';
import {fadeAnimation} from './egoi-subscribe.animations';

@Component({
  selector: 't4e-egoi-subscribe',
  templateUrl: './egoi-subscribe.component.html',
  styleUrls: ['./egoi-subscribe.component.scss'],
  animations: [ fadeAnimation ]
})
export class EgoiSubscribeComponent implements OnInit {

  subscribeResult: { type: string, message: string } = null;
  isSubmitting: boolean = false;

  subscribeForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', Validators.required]
  });

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(private fb: FormBuilder, private egoi: EgoiService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit', this.subscribeForm.value);

    if (this.subscribeForm.valid) {
      this.isSubmitting = true;
      this.egoi.addContactToList(this.subscribeForm.value)
        .subscribe(
          (res) => {
            this.showResult(
              'success',
              'Obrigado por subscrever a newsletter Tools4Edu, ' + this.subscribeForm.value.name + '.'
            )
          },
          (err) => {
            console.log('err', err)
            this.handleErrors(err)
          }
        )
    }
  }

  showResult(type, message) {
    this.subscribeResult = {
      type,
      message
    }

    if (type !== 'error') {
      this.formGroupDirective.resetForm();
    }

    setTimeout(() => {
      this.subscribeResult = null;
      this.isSubmitting = false;
    }, 5000);

  }

  handleErrors(err) {
    switch (err.status) {
      case 409:
        return this.showResult(
          'error',
          'O e-mail que introduziu já está subscrito na newsletter.'
        )

      case 422:
        return this.showResult(
          'error',
          'O e-mail que introduziu não é válido.'
        )

      default:
        this.showResult(
          'error',
          'A subscrição está temporariamente indisponível. Por favor, tente mais tarde.'
        )
    }
  }

}
