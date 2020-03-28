import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../category/category.model';
import { CategoryService } from '../category.service'

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverGuard implements Resolve<Category> {


  constructor(private service: CategoryService) { }
  // essa interface recebe um snapshot da rota ou seja, uma fotografia da rota para que podemos extrair quais são os parametros da 
  // rota no momento e retorna um objeto de categoria
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Category | Observable<Category> | Promise<Category> {

    // verifica por meio da foto na rota se existe algum parametro de id
    if (route.params && route.params['id']) {
      return this.service.loadByID(route.params['id']);
    } else {
      //em caso de alteração. O comando of retorna um observable
      return of({
        id: null,
        nome: null,
        descricao: null,
        tipo: null,
        cor: null
      });
    }

  }


}
