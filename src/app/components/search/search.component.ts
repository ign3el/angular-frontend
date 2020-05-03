import { Component, OnInit } from '@angular/core';
import { strict } from 'assert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  searchProducts(keyword:string) {
    this.router.navigateByUrl(`/search/${keyword}`);
  }
}
