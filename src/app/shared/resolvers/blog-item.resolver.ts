import {Injectable} from '@angular/core';
import {IBlogArticle} from '../../interfaces/blog-article.interface';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BlogItemsService} from '../services/blog-items.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BlogItemResolver implements Resolve<IBlogArticle> {
  constructor(private service: BlogItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.getBlogArticle(route.paramMap.get('slug'))
      .pipe(
        map(({data, loading, errors}) => {
          return {
            data,
            loading,
            errors
          }
        })
      )
  }
}
