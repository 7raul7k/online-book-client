import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Book} from "../models/api/Book";

@Injectable({
  providedIn: 'root'
})
export class BookService {


  private url ="http://localhost:8080/api/books"
  constructor(private http : HttpClient) { }

  getBooks():Observable<Book[]>{

    return this.http.get<Book[]>(this.url + "/allBooks").pipe(catchError(this.handleError));
  }

  addBook(book : Book):Observable<String>{
    return this.http.post<String>(this.url + "/addBook",book).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(()=>'Something bad happened; please try again later.');
  };
}
