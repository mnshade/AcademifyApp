import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-aluno-read',
  templateUrl: './aluno-read.component.html',
  styleUrls: ['./aluno-read.component.css']
})
export class AlunoReadComponent implements OnInit {

  alunos: Aluno[];
  displayedColumns = ['id', 'dataHoraCadastro', 'matricula', 'nascimento', 'nome', 'actions'];
  dataSource: MatTableDataSource<Aluno>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private alunoService: AlunoService, private router: Router) {
    this.alunoService.read().subscribe(alunos => {
      this.alunos = alunos
      this.dataSource = new MatTableDataSource(alunos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(alunos)
    })
  }

  ngOnInit(): void {
    
  }

  navigateToAlunoCreate(): void {
    this.router.navigate(['/alunos/create'])
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  
}
