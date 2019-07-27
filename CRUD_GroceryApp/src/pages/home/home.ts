import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Grocery";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {

  }

  loadItems() {
    return this.dataService.getItems();
  }

  //Helper function to remove Items from the list
  removeItem(item, index) {
    console.log("Removing Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Removing Item ' + index,
      duration: 3000
    });
    toast.present();

    this.dataService.removeItem(index);  
  }

  //Helper function to edit items on the list
  editItem(item, index) {
    console.log("Edit Item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - ' + index + " ...",
      duration: 3000
    });
    toast.present();
    this.showEditItemPrompt(item, index);
  }  

  //Helper function to add items to the list
  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  //Helper function
  showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Add Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item'
        },
        {
          name: 'quantity',
          placeholder: 'Quantity'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: item => {
            console.log('Add clicked', item);
            this.dataService.addItem(item);
          }
        }
      ]
    });
    prompt.present();
  }

  showEditItemPrompt(item, index) {
    const prompt = this.alertCtrl.create({
      title: 'Edit Item',
      inputs: [
        {
          name: 'name',
          placeholder: 'Item',
          value: item.name
        },
        {
          name: 'quantity',
          placeholder: 'Quantity',
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: item => {
            console.log('Saved clicked', item);
            this.dataService.editItem(item, index);   
          }
        }
      ]
    });
    prompt.present();
  }  

}
