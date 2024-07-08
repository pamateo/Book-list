import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnChanges {
  @Input() bookList:any[];
  @Output() removeBook=new EventEmitter<any>();

  constructor(){
  }
  
  ngOnChanges(changes: SimpleChanges){
    if(changes['bookList']){
      console.log(this.bookList);
    }
  }



  removeFromList(index, book){
    this.bookList.splice(index, 1);
    localStorage.setItem('booklist', JSON.stringify(this.bookList));
    this.removeBook.emit(book);    

    console.log('click en la imagen de la lista');
  }
}
