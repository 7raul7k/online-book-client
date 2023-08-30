import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../models/api/Book";
import {BookService} from "../../service/book.service";
import {Message} from "primeng/api";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnDestroy, OnInit {

  book: Book = {
    name: "",
    genre: "",
    year: 0,
    author : ""

  }

  id = 2;

  messages: Message[] = [];

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.messages = [{ severity: 'success', summary: 'Success', detail:  'Message Content' },
      { severity: 'error', summary: 'Error', detail: 'Message Content' }
    ];

    this.bookService.getBookById(this.id).subscribe({
      next: (data) => {
        this.book = data;
      }
    });
  }

  updateBook() {

    this.bookService.updateBook(this.book).subscribe({
      next: (data) => {
        this.messages.push({ severity: 'success', summary: 'Success', detail: 'Book was updated' })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteBook() {
    this.bookService.deleteBook(this.id).subscribe({
      next: (data) => {
        this.messages.push({ severity: 'success', summary: 'Success', detail: 'Book was deleted' })
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  constructor(private bookService: BookService) {

  }
}


