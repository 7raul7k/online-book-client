import {Component, OnDestroy, OnInit} from '@angular/core';
import {BookService} from "../../service/book.service";
import {Message} from "primeng/api";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit,OnDestroy {

  nameValue: string = "";
  authorValue: string = "";
  genreValue: string = "";
  yearValue: number = Number("");

  messages : Message[] = [];
  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    this.messages = [{ severity: 'success', summary: 'Success', detail:  'Message Content' },
      { severity: 'error', summary: 'Error', detail: 'Message Content' }
    ];

  }

  save() {

    this.checkValidation();
    if (this.messages.length == 0) {

      let book = {
        name: this.nameValue,
        genre: this.genreValue,
        year: this.yearValue,
        author: this.authorValue
      }

      this.bookService.addBook(book).subscribe({
        next: (data) => {
          this.messages.push({ severity: 'success', summary: 'Success', detail: 'Book was added' });

          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  checkValidation() {
    this.messages = [];

    if (this.nameValue == "") {
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Name is required' });
    }
if (this.authorValue == "") {
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Author is required' });
    }
if (this.genreValue == "") {
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Genre is required' });
    }
if (this.yearValue == Number("")) {
      this.messages.push({ severity: 'error', summary: 'Error', detail: 'Year is required' });
}

  }
  constructor(private bookService: BookService,private router: Router) {

  }
}
