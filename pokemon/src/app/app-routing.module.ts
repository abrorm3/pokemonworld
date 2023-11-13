import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { CardDetailsComponent } from './cards/card-details/card-details.component';

const routes: Routes = [
  {path: '', component:CardsComponent},
  {path: ':id', component:CardDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
