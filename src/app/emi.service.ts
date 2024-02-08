import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {EmiArguments} from "../shared/model/EmiArguments";
import {Result} from "../shared/model/Result";

@Injectable({
  providedIn: 'root'
})
export class EmiService {
  url = 'http://127.0.0.1:8080';

  constructor(private http: HttpClient) {
  }

  calculate(emiArguments : EmiArguments) {
    return this.http
      .post<Result>(`${this.url}/v1/calculator/emi`, emiArguments)
      .pipe(catchError(this.handleError<number[]>('calculate', [])));
  }

  getHistory() {
    return this.http
      .get<number[]>(`${this.url}/v1/calculator/history`)
      .pipe(catchError(this.handleError<number[]>('getHistory', [])));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
