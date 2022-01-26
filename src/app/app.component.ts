import {Component, OnInit} from '@angular/core';
import {CatalogService} from "./catalog.service";
import {Book} from "./book";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontebookstore';
  public catalog: Book[] | undefined;


  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.getCatalog();
  }

  public getCatalog(): void {
    this.catalogService.getCatalog().subscribe(
      (response: Book[]) => {
        console.log("Got book list:");
        console.log(response);
        this.catalog = response;
      });
  }
}
