import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, ModalController, ToastController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {


  // form Models
  subCategoryName!: string
  subCategoryDes!: string

  categoryName!: string
  categoryDes!: string

  editCategoryName!:string
  editCategoryDes!:string
  editCategoryImage:any

  editCategoryOpen = false

  load = false

  categories:any

  selectedCategoryEdit!:any

  editCategory(catId:number){

    this.selectedCategoryEdit = catId

    this.editCategoryOpen = true

    const category = this.categories.find((cat: { id: number; })=>(cat.id==catId))

    this.editCategoryName = category.name
    this.editCategoryDes = category.description
    this.editCategoryImage = category.image

  }

  closeEditCategoryModal(){
    this.editCategoryOpen = false

    this.oldCategoryImage = ''
  }

  saveCategoryChanges(){

    this.load = true

    this.editCategoryOpen = false
    
    let formData = new FormData()

    formData.append('categoryId', this.selectedCategoryEdit);

    formData.append('name', this.editCategoryName);
    formData.append('description', this.editCategoryDes);
    formData.append('image', this.editCategoryImage.file);
    formData.append('oldimagepublicid', this.oldCategoryImage.public_id);

    this.http.post<{message:string}>(`${environment.server}/admin/editcategory`,formData)
    .pipe(take(1))
    .subscribe(
      res=>{

        this.load = false

        this.toastController.create({
          message: res.message,
          duration: 2000,
          color: 'primary',
          position: 'top'
        }).then((toast) => {
          toast.present()
        })

        this.getCategoriesAndSubCategories()

      },
      err=>{
        console.log(err)

        this.load = false

        this.toastController.create({
          message: err.error.message ? err.error.message : "Unable to connect",
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        }).then((toast) => {
          toast.present()
        })

        this.editCategoryOpen = true

      }
    )

  }

  oldCategoryImage:any

  editCategoryImageChange(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      if(this.editCategoryImage.public_id){
        this.oldCategoryImage = this.editCategoryImage
      }

      this.editCategoryImage = {
        url: reader.result,
        file: file
      }

    };

  }

  editSubCategoryOpen = false

  oldSubCategoryImage:any

  editSubCategoryImageChange(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      if(this.editSubCategoryImage.public_id){
        this.oldSubCategoryImage = this.editSubCategoryImage
      }

      this.editSubCategoryImage = {
        url: reader.result,
        file: file
      }

    };

  }

  editSubCategoryName!:string
  editSubCategoryDes!:string
  selectedSubCategoryEdit:any
  editSubCategoryImage:any

  closeEditSubCategoryModal(){
    this.editSubCategoryOpen = false
    this.oldSubCategoryImage = ''
  }

  editSubCategory(subCatId:number){

    this.selectedSubCategoryEdit = subCatId

    this.editSubCategoryOpen = true

    const subcategory = this.selectedCategory.Subcategories.find((subCat: { id: number; })=>(subCat.id==subCatId))

    this.editSubCategoryName = subcategory.name
    this.editSubCategoryDes = subcategory.description
    this.editSubCategoryImage = subcategory.image

  }

  saveSubCategoryChanges(){

    this.load = true

    this.editSubCategoryOpen = false
    
    let formData = new FormData()

    formData.append('subcategoryId', this.selectedSubCategoryEdit);

    formData.append('name', this.editSubCategoryName);
    formData.append('description', this.editSubCategoryDes);
    formData.append('image', this.editSubCategoryImage.file);
    formData.append('oldimagepublicid', this.oldSubCategoryImage.public_id);

    this.http.post<{message:string}>(`${environment.server}/admin/editsubcategory`,formData)
    .pipe(take(1))
    .subscribe(
      res=>{

        this.load = false

        this.toastController.create({
          message: res.message,
          duration: 2000,
          color: 'primary',
          position: 'top'
        }).then((toast) => {
          toast.present()
        })

        this.getCategoriesAndSubCategories()

        setTimeout(() => {

          this.selectedCategory = this.categories.find((category:any) => {
            return category.id == this.parent_category;
          })

          this.load = false
          
        }, 2000);

      },
      err=>{
        console.log(err)

        this.load = false

        this.toastController.create({
          message: err.error.message ? err.error.message : "Unable to connect",
          duration: 2000,
          color: 'danger',
          position: 'bottom'
        }).then((toast) => {
          toast.present()
        })

        this.editCategoryOpen = true

      }
    )

  }

  addSubCategory() {

    if (!this.subCategoryName && !this.subCategoryDes) {

      this.toastController.create({
        message: "Fill in the required fields...",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    else if (!this.subCategoryImage) {

      this.toastController.create({
        message: "Please select an image for the sub category...",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    this.load = true

    this.modalctrl.dismiss()

    let formData = new FormData()

    formData.append('name', this.subCategoryName);
    formData.append('description', this.subCategoryDes);
    formData.append('image', this.subCategoryImage.file);
    formData.append('parent_category', this.parent_category);

    this.http.post<{message:string}>(`${environment.server}/admin/addsubcategory`, formData)
    .pipe(take(1))
    .subscribe(
      res => {
        
        this.toastController.create({
          message: res.message,
          duration: 2000,
          color: 'primary',
          position: 'top'
        }).then((toast) => {
          toast.present()
        })

        this.getCategoriesAndSubCategories()

        setTimeout(() => {

          this.selectedCategory = this.categories.find((category:any) => {
            return category.id == this.parent_category;
          })

          this.load = false
          
        }, 2000);

      },
      err => {

        this.load = false

        this.toastController.create({
          message: err.error.message ? err.error.message : "Unable to connect",
          duration: 2000,
          color: 'danger',
          position: 'top'
        }).then((toast) => {
          toast.present()
        })

      }
    )



  }

  addCategory() {

    if (!this.categoryName && !this.categoryDes) {

      this.toastController.create({
        message: "Fill in the required fields...",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    else if (!this.categoryImage) {

      this.toastController.create({
        message: "Please select an image for the category...",
        duration: 2000,
        color: 'danger',
        position: 'bottom'
      }).then((toast) => {
        toast.present()
      })

      return

    }

    this.load = true

    this.modalctrl.dismiss()

    let formData = new FormData()

    formData.append('name', this.categoryName);
    formData.append('description', this.categoryDes);
    formData.append('image', this.categoryImage.file);

    this.http.post<{message:string}>(`${environment.server}/admin/addcategory`, formData)
      .pipe(take(1))
      .subscribe(
        res => {

          this.load = false
          
          this.toastController.create({
            message: res.message,
            duration: 2000,
            color: 'primary',
            position: 'top'
          }).then((toast) => {
            toast.present()
          })

          this.getCategoriesAndSubCategories()

        },
        err => {
          // console.log(err) 

          this.load = false

          this.toastController.create({
            message: err.error.message ? err.error.message : "Unable to connect",
            duration: 2000,
            color: 'danger',
            position: 'top'
          }).then((toast) => {
            toast.present()
          })

        }
      )

  }

  categoryImage: any

  onSelectCategoryImage(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      this.categoryImage = {
        img: reader.result,
        file: file
      }

    };

  }

  subCategoryImage: any

  onSelectSubCategoryImage(event: any) {

    const file = event.target.files[0];;
    if (file.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      this.subCategoryImage = {
        img: reader.result,
        file: file
      }

    };

  }

  async removeCategory(catId:number){

    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to remove this Category?',
      subHeader: 'This action cannot be undone.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          // do nothing
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {

          this.load = true

          this.http.get<{message:string}>(`${environment.server}/admin/deletecategory/${catId}`)
          .pipe(take(1))
          .subscribe(
            res=>{

              this.load = false

              this.toastController.create({
                message: res.message,
                duration: 2000,
                color: 'primary',
                position: 'top'
              }).then((toast) => {
                toast.present()
              })

              this.getCategoriesAndSubCategories()

            },
            err=>{

              this.load = false

              console.log(err)

              this.toastController.create({
                message: err.error.message ? err.error.message : "Unable to connect" ,
                duration: 2000,
                color: 'danger',
                position: 'bottom'
              }).then((toast) => {
                toast.present()
              })

            }
          )
 }
      }]
    });
    await actionSheet.present();

  }


  async removeSubCategory(subcatid:number){

    const actionSheet = await this.actionSheetController.create({
      header: 'Are you sure you want to remove this Sub Category?',
      subHeader: 'This action cannot be undone.',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          // do nothing
        }
      }, {
        text: 'Delete',
        icon: 'trash',
        role: 'destructive',
        handler: () => {

          this.load = true

          this.http.get<{message:string}>(`${environment.server}/admin/deletesubcategory/${subcatid}`)
          .pipe(take(1))
          .subscribe(
            res=>{

              this.toastController.create({
                message: res.message,
                duration: 2000,
                color: 'primary',
                position: 'top'
              }).then((toast) => {
                toast.present()
              })

              this.getCategoriesAndSubCategories()

              setTimeout(() => {

                this.selectedCategory = this.categories.find((category:any) => {
                  return category.id == this.parent_category;
                })
      
                this.load = false
                
              }, 2000);

            },
            err=>{

              this.load = false

              console.log(err)

              this.toastController.create({
                message: err.error.message ? err.error.message : "Unable to connect" ,
                duration: 2000,
                color: 'danger',
                position: 'bottom'
              }).then((toast) => {
                toast.present()
              })

            }
          )
 }
      }]
    });
    await actionSheet.present();

  }

  subcategories = false

  parent_category: any

  selectedCategory: any = []

  closeModal() {
    this.modalctrl.dismiss();
  }

  constructor(private modalctrl: ModalController, private route: ActivatedRoute, private toastController: ToastController, private http: HttpClient,private authService:AuthService,private actionSheetController:ActionSheetController) { }

  getCategoriesAndSubCategories(){
    this.http.get(`${environment.server}/admin/categories`)
    .pipe(take(1))
    .subscribe(
      res=>{
this.categories = res
      },
      err=>{
        console.log(err)
      }
    )
  }

  ngOnInit() {

    this.authService.verifyAdmin()

    this.getCategoriesAndSubCategories()


    this.route.params.subscribe(params => {
      const subcatid = params['subcatid'];

      if (subcatid) {

       setTimeout(() => {

        this.selectedCategory = this.categories.find((category:any) => {
          return category.id == subcatid;
        })
        
       }, 2000);

        this.subcategories = true

        this.parent_category = subcatid

      }
      else {
        this.subcategories = false
      }

    });

  }

}
