import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menuctrl: MenuController, private toastController: ToastController, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.verifyAdmin()
  }

  closeMenu() {

    this.menuctrl.close()

  }

  redirect(route: string) {
    this.router.navigate([`dashboard/${route}`])
    this.closeMenu()
  }

}
