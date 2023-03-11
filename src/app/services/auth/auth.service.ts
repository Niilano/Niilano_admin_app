import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  verifyAdmin(){

    let isUserLoggedIn = localStorage.getItem('adminToken')

    if(!isUserLoggedIn){

      this.toastController.create({
        message: "Please log in",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      this.router.navigate(['auth'])

    }

    else{

      this.http.get(`${environment.server}/admin/verifyadmin`)
      .pipe(take(1))
      .subscribe(
        res=>{},
        err=>{

          this.toastController.create({
            message: err.error.message ? err.error.message : "Unable to connect",
            duration: 2000,
            color: 'danger',
            position: 'bottom'
          }).then((toast) => {
            toast.present()
          })

          this.router.navigate(['auth'])

        }
      )

    }

  }

  constructor(private toastController:ToastController,private http:HttpClient,private router : Router) { }
}
