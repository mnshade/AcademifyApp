import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../../components/aluno/aluno.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  totalAlunos: number = 0;

  constructor(private alunoService: AlunoService) {
    this.getTotalAlunos();
  }

  getTotalAlunos(): void {
    this.alunoService.getTotal().subscribe({
      next: (alunos) => { this.totalAlunos = alunos; },
    });
  }

  ngOnInit(): void {
  }

}
