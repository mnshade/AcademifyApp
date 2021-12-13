import { Aluno } from '../aluno.model';
import { Router } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { dateTimeFormat } from '../dateTimeFormat';

@Component({
  selector: 'app-aluno-create',
  templateUrl: './aluno-create.component.html',
  styleUrls: ['./aluno-create.component.css']
})
export class AlunoCreateComponent implements OnInit {
  

  aluno : Aluno = {
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

  setDateForm(newDate: Date): void {
    this.date = newDate;
    this.serializedDate = new FormControl(newDate.toISOString());
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

  changeDate(event: MatDatepickerInputEvent<Date>): void {
    if (this.aluno && event.value) {
      this.aluno = {
        ...this.aluno,
        nascimento: event.value.toLocaleDateString("en-US")
      }
    }
  }
}
