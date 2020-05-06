import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable()
export class EgoiService {
  constructor(private http: HttpClient) {}

  addContactToList({ name, email }: { name: string, email: string }) {

    const headers = new HttpHeaders({
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Apikey": environment.egoi.key
    });

    const namesArr = name.split(' ');

    const payload = {
      "base": {
        "status": "active",
        "language": "pt",
        "first_name": namesArr[0] || '',
        "last_name": namesArr[namesArr.length - 1] !== namesArr[0] ? namesArr[namesArr.length - 1] : '',
        "email": email
      }
    }

    return this.http.post(
      `${environment.egoi.url}/lists/${environment.egoi.subscribersList}/contacts`,
      JSON.stringify(payload),
      { headers }
    )
  }
}
