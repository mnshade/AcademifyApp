import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Component, OnInit } from '@angular/core';
import { Aluno } from '../aluno.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-aluno-update',
  templateUrl: './aluno-update.component.html',
  styleUrls: ['./aluno-update.component.css']
})
export class AlunoUpdateComponent implements OnInit {

  aluno: Aluno;

  date = new Date();
  serializedDate = new FormControl(null);
  
  constructor(
    private alunoService: AlunoService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.alunoService.readById(id).subscribe(aluno => {
      this.aluno = aluno
      this.aluno.nascimento = new Date(this.aluno.nascimento).toLocaleString('pt-BR');
      console.log(this.aluno);
    })
  }

  updateAluno():void {
    this.alunoService.update(this.aluno).subscribe(()=>{
      this.alunoService.showMensage('Aluno atualizado com sucesso')
      this.router.navigate(['/alunos']);
    });
  }

  cancel():void {
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
