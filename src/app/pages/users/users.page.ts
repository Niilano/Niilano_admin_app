import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users:any

  constructor(private authService:AuthService,private http:HttpClient) { }

  ngOnInit() {

    this.http.get(`${environment.server}/admin/users`)
    .pipe(take(1))
    .subscribe(
      res=>{
this.users = res
      }
    )

  }

}
