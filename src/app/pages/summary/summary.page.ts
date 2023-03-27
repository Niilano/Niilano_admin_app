import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {

  users!: number
  products!: number
  categories!: number
  orders!: number

  constructor(private authService: AuthService, private http: HttpClient) { }

  ionViewDidEnter() {

    

  }

  ngOnInit() {
    this.authService.verifyAdmin()

    this.http.get<{ userCount: number, productCount: number, categoryCount: number, ordersCount: number }>(`${environment.server}/admin/summary`)
      .pipe(take(1))
      .subscribe(
        res => {
          this.users = res.userCount
          this.products = res.productCount
          this.categories = res.categoryCount
          this.orders = res.ordersCount
        }
      )

  }

}
