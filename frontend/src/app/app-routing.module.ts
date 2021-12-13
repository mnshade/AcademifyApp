import { AlunoDeleteComponent } from './components/aluno/aluno-delete/aluno-delete.component';
import { AlunoUpdateComponent } from './components/aluno/aluno-update/aluno-update.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { AlunoCreateComponent } from './components/aluno/aluno-create/aluno-create.component';
import { AlunoReadComponent } from './components/aluno/aluno-read/aluno-read.component';
import { AlunoDetailsComponent } from './components/aluno/aluno-details/aluno-details.component';



const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
  path:"alunos",
  component: AlunoReadComponent
  },
  {
    path:"alunos/create",
    component: AlunoCreateComponent
  },
  {
    path:"alunos/update/:id",
    component: AlunoUpdateComponent
  },
  {
    path:"alunos/delete/:id",
    component: AlunoDeleteComponent
  },
  {
    path:"alunos/details/:id",
    component: AlunoDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
