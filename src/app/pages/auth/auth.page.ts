import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isModalOpen = false

  load = false

  email!: string
  password!: string

  // Change Password
  previousPassword!:string
  newPassword!:string

  adminId!:number

  changePassword(){

    if (!this.previousPassword || !this.newPassword) {

      this.toastController.create({
        message: "Fill in the required fields",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }
    
    this.load = true

    this.isModalOpen = false

   let changePasswordDetails = {
    previousPassword : this.previousPassword,
    newPassword : this.newPassword,
    adminId : this.adminId
   }

   this.http.post<{message:string}>(`${environment.server}/admin/changepassword`, changePasswordDetails)
   .pipe(take(1))
   .subscribe(
     res => {
       // console.log(res)

       this.load = false

       this.isModalOpen = false

       this.adminId = 0

       this.toastController.create({
         message: res.message,
         duration: 2000,
         color: 'primary',
         position: 'bottom'
       }).then((toast) => {
         toast.present()
       })

     },
     err => {
       // console.log(err)

       this.load = false

       this.isModalOpen = true

       this.toastController.create({
         message: err.error.message ? err.error.message : "Unable to connect",
         duration: 2000,
         color: 'danger',
         position: 'bottom'
       }).then((toast) => {
         toast.present()
       })

     }
   )

  }

  login() {

    if (!this.email || !this.password) {

      this.toastController.create({
        message: "Fill in the required fields",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    this.load = true

    let loginDetails = {
      email: this.email,
      password: this.password
    }

    this.http.post<{message:string,status:number,adminId:number,adminToken:string}>(`${environment.server}/admin/login`, loginDetails)
      .pipe(take(1))
      .subscribe(
        res => {
          // console.log(res)

          this.load = false

          this.toastController.create({
            message: res.message,
            duration: 2000,
            color: 'primary',
            position: 'bottom'
          }).then((toast) => {
            toast.present()
          })

          if(res.status == 2){
            this.isModalOpen = true
            this.adminId = res.adminId
          }
          else if(res.status == 1){
            localStorage.setItem("adminToken",res.adminToken)
            this.router.navigate(['/'])
          }

        },
        err => {
          // console.log(err)

          this.load = false

          this.toastController.create({
            message: err.error.message ? err.error.message : "Unable to connect",
            duration: 2000,
            color: 'danger',
            position: 'bottom'
          }).then((toast) => {
            toast.present()
          })

        }
      )


  }

  closeModal(){
    this.isModalOpen = false
    this.adminId = 0
  }

  constructor(private toastController: ToastController, private http: HttpClient,private modalctrl:ModalController,private router:Router) { }

  ngOnInit() {
  }

}
