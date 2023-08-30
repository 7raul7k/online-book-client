import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../models/api/Book";
import {BookService} from "../../service/book.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

   books: Book[] = [];

    ngOnDestroy(): void {
    }

    ngOnInit(): void {

      this.bookService.getBooks().subscribe({

        next: (data) => {

            this.books=data;


        },
        complete: () => {

        },
        error: () => {

        }
      });

    }

    constructor(private bookService: BookService) {

    }

}
