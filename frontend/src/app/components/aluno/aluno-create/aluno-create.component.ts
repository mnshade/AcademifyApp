import { Aluno } from '../aluno.model';
import { Router } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Component, OnInit } from '@angular/core';
import { dateTimeFormat } from '../dateTimeFormat';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.css'],
})
export class AlunoCreateComponent implements OnInit {

  aluno: Aluno = {
    nome: '',
    matricula: '',
    nascimento: '',
    dataHoraCadastro: ''
  }

  date = new Date();
  serializedDate = new FormControl(null);

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit(): void {

  }

  createAluno(): void {
    this.aluno.dataHoraCadastro = dateTimeFormat(new Date());
    this.alunoService.create(this.aluno).subscribe(() => {
      this.alunoService.showMensage('Aluno registrado com sucesso')
      this.router.navigate(['/alunos'])
    })
  }

  cancel(): void {
    this.router.navigate(['/alunos'])
  }

  changeFormDate(event: MatDatepickerInputEvent<Date>): void {
    if (this.aluno && event.value) {
      this.aluno = {
        ...this.aluno,
        nascimento: event.value.toLocaleDateString("en-US")
      }
    }
  }

}