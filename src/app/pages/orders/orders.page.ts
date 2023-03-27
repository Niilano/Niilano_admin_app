import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orders:any

  showDetails:number | undefined

  toggleOrderDetails(orderID:number) {
    this.showDetails = this.showDetails!=orderID ? orderID : 0
    // this.chatSellerMessageContent = ""
  }

  async rejectOrder(orderId:number){
 

    const alertSheet = await this.alertController.create({
      header: 'Close Order',
      message: 'Reason for closing this order?',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Reason'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Submit',
          handler: (data) => { 

          }
        }
      ]
    
    });

    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to close this order?',
      subHeader: 'This action cannot be undone.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          // do nothing
        }
      }, {
        text: 'Continue',
        icon: 'trash',
        role: 'destructive',
        handler: async() => {
          await alertSheet.present();
        }
    }]
      })
    await actionSheet.present();

  }

  constructor(private http:HttpClient,private alertController:AlertController,private actionSheetController:ActionSheetController) { }

  ngOnInit() {
    
    this.http.get<{orders:any[]}>(`${environment.server}/admin/orders`)
    .pipe(take(1))
    .subscribe(
      res=>{
this.orders = res.orders
console.log(this.orders)
      }
    )

  }

}
