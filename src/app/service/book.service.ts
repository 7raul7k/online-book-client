import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {Book} from "../models/api/Book";
import {LoadingState} from "../models/LoadingState.enum";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  loadingStateSubject$ = new BehaviorSubject<LoadingState>(LoadingState.Idle);


  private url ="http://localhost:8080/api/books"
  constructor(private http : HttpClient) { }

  getBooks():Observable<Book[]>{
    this.loadingStateSubject$.next(  LoadingState.Loading);

    return this.http.get<Book[]>(this.url + "/allBooks").pipe(catchError(this.handleError));
  }

  addBook(book : Book):Observable<String>{
    return this.http.post<String>(this.url + "/addBook",book).pipe(catchError(this.handleError));
  }

  getBookById(id : number):Observable<Book>{
    return this.http.get<Book>(this.url + `/getBookById/${id}`).pipe(catchError(this.handleError));
  }

  updateBook(book : Book):Observable<String>{
    return this.http.put<String>(this.url + "/updateBook",book).pipe(catchError(this.handleError));
  }

  deleteBook(id : number):Observable<String>{
    return this.http.delete<String>(this.url + `/deleteBook/${id}`).pipe(catchError(this.handleError));
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
