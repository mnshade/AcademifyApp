import { Router, ActivatedRoute } from "@angular/router";
import { AlunoService } from "../aluno.service";
import { Component, OnInit } from "@angular/core";
import { Aluno } from "../aluno.model";

@Component({
  selector: "app-aluno-details",
  templateUrl: "./aluno-details.component.html",
  styleUrls: ["./aluno-details.component.css"],
})
export class AlunoDetailsComponent implements OnInit {
  aluno: Aluno;

  constructor(
    private alunoService: AlunoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.alunoService.readById(id).subscribe((aluno) => {
      this.aluno = aluno;
      this.aluno.dataHoraCadastro = new Date(this.aluno.dataHoraCadastro).toLocaleString('pt-BR');
      this.aluno.nascimento = new Date(this.aluno.nascimento).toLocaleString('pt-BR');
    });
  }
  navigateToAlunoRead(): void {
    this.router.navigate(['/alunos/'])
  }
}
