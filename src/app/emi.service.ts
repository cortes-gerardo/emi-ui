import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
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
      .pipe(catchError(this.handleError));
  }

  getHistory() {
    return this.http
      .get<number[]>(`${this.url}/v1/calculator/history`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something bad happened; please try again later.';
    if (error.status === 0) {
      console.error('An client-side error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = error.error.message;
    }
    return throwError(() => new Error(errorMessage));
  }
}
