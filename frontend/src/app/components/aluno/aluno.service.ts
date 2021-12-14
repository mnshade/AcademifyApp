import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Aluno } from './aluno.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class AlunoService {

  baseUrl = "http://localhost:8080/api/aluno"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMensage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(aluno: Aluno): Observable<Aluno> {
    return this.http.post(`${this.baseUrl}/incluir`, aluno).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  erroHandler(e: any): Observable<any> {
    this.showMensage('Ocorreu um erro! Tente novamente', true)
    return EMPTY
  }

  read(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.baseUrl}/listar`).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  readById(id: number): Observable<Aluno> {
    return this.http.get(`${this.baseUrl}/get/${id}`).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  update(aluno: Aluno): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar`, aluno).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  delete(aluno: Aluno): Observable<any> {
    return this.http.post(`${this.baseUrl}/remover`, aluno).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }

  getTotal(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getTotal`).pipe(
      map(obj => obj),
      catchError(e => this.erroHandler(e))
    )
  }
}
