import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../models/api/Book";
import {BookService} from "../../service/book.service";
import {Router} from "@angular/router";
import {LoadingState} from "../../models/LoadingState.enum";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

   books: Book[] = [];

   loadingState$: Subject<LoadingState> = this.bookService.loadingStateSubject$;

    ngOnDestroy(): void {
    }

    ngOnInit(): void {

      this.bookService.getBooks().subscribe({

        next: (data) => {

            this.books=data;

            this.bookService.loadingStateSubject$.next(LoadingState.Success);


        },
        complete: () => {

        },
        error: () => {
          this.bookService.loadingStateSubject$.next(LoadingState.Error);

        }
      });

    }

    constructor(private bookService: BookService,private router: Router) {

    }

    navigateToUpdate(book:any) {
    this.router.navigate(['/update', book.id]);
    }

  protected readonly LoadingState = LoadingState;
}
