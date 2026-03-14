import { Routes } from '@angular/router';

import { CategoryList } from './category-list/category-list';
import { CategoryForm } from './category-form/category-form';
import { CategoryDetails } from './category-details/category-details';

import { ElementForm } from './element-form/element-form';
import { ElementDetails } from './element-details/element-details';

export const routes: Routes = [

  // lista kategorii
  { path: 'categories', component: CategoryList },

  // dodawanie kategorii
  { path: 'categories/add', component: CategoryForm },

  // edycja kategorii
  { path: 'categories/edit/:uuid', component: CategoryForm },

  // szczegoly kategorii + lista elementow
  { path: 'categories/:uuid', component: CategoryDetails },

  // dodawanie elementu
  { path: 'categories/:owneruuid/elements/add', component: ElementForm },

  // edycja elementu
  { path: 'categories/:owneruuid/elements/:petuuid/edit', component: ElementForm },

  // szczegoly elementu
  { path: 'categories/:owneruuid/elements/:petuuid', component: ElementDetails },

  { path: '', redirectTo: '/categories', pathMatch: 'full' }

];
