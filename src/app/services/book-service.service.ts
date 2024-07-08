import { LibraryResponse,LibraryItem } from './../models/book.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private bookUrl='assets/books.json';

  constructor(private http:HttpClient) { }

  getBooks(genre?:string):Observable<LibraryItem[]>{
    return this.http.get<LibraryResponse>(this.bookUrl).pipe(
      map(
        response=>{
          if(genre){
            return response.library.filter(item=>item.book.genre===genre);
          } 
          return response.library
        })
    )
  }
}
