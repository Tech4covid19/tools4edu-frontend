import {Injectable} from '@angular/core';
import {ContentItemsService} from '../services/content-items.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IContentItem} from '../../interfaces/content-item.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class ContentItemResolver implements Resolve<IContentItem>{
  constructor(private service: ContentItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getContentItem(route.paramMap.get('slug'))
        .pipe(
          map(({data, loading, errors}) => {
            return {
              data,
              loading,
              errors
            }
          })
        );
  }
}
