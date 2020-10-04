import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  error: any;

  constructor(private router: Router) {
    // current navigation state
    const navigation = this.router.getCurrentNavigation();

    // optional chaining if it doesn't exist
    this.error = navigation?.extras?.state?.error;
   }

  ngOnInit(): void {
  }

}
