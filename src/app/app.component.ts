import { Component } from '@angular/core';
import { BookServiceService } from './services/book-service.service';
import { FormBuilder } from '@angular/forms';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    public books:any=[];
    public added:boolean[]=[];
    public bookList:any=[];
    
    public bookFilter=this.fb.group({
      genre:['']
  });

  constructor(private book:BookServiceService, private fb:FormBuilder){
    this.getBooks();
    this.loadBookList();

    
    
  }


  getBooks(){
    this.book.getBooks().subscribe(
      (response)=>{
        if(response){
          this.books=response;
          console.log(this.books);
        }
      },
      err =>{
        console.log(err);
      }
    )
  }
  
  filter(){
    if(this.bookFilter.get('genre').value==='todos'){
      this.getBooks();
    }else{
      this.book.getBooks(this.bookFilter.get('genre').value).subscribe(
        response=>{
          if(response){
            this.books=response;
          }
        },
        err=>{
          console.log(err);
        }
      )
    }
  }

  

  addToList(src, index){
    // console.log('url',src);
    
    if(!this.bookList.includes(src)){
      this.bookList.push(src);
      // console.log(this.bookList);
      localStorage.setItem('booklist', JSON.stringify(this.bookList));

    console.log('click en imagen: ',src);
    const img=document.getElementById(index);
    img.classList.add("img-trans");
    
    }else{
      this.added[index]=true;
      console.log('el libro ya esta en la lista');

      setTimeout(() => {
        this.added[index] = false;
      }, 1500);
    }
    }
    
    loadBookList(){
    const savedList=localStorage.getItem('booklist');
    if(savedList){
      this.bookList=JSON.parse(savedList);
      console.log('hay guardados');
    }
  }


  removeClass(evt){
    console.log(evt);
    console.log(this.books);
    console.log(this.books);
    let i;
    for (let index = 0; index < this.books.length; index++) {
      console.log(this.books[index]);
      if(this.books[index].book.cover===evt){
        i=index;
      }
    }
    
    const img = document.getElementById(i);
    if (img) {
      console.log('llego a quitar la transparencia');
      img.classList.remove("img-trans");
    }
  }


  
}
