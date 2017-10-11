import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    @ViewChild('username') user;
    @ViewChild('password') password;

    constructor(private alertCtrl: AlertController, private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    alert(message: string) {
        this.alertCtrl.create({
            title: 'Info!',
            subTitle: message,
            buttons: ['OK']
        }).present();
    }

    signInUser() {
        this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
            .then( data => {
                console.log('got some data', this.fire.auth.currentUser);
                this.alert('Success! You\'re logged in');
                this.navCtrl.setRoot( TabsPage );
                // user is logged in
            })
            .catch( error => {
                console.log('got an error', error);
                this.alert(error.message);
            });
    };

    showSignUpPage()
    {
        this.navCtrl.setRoot( RegisterPage );
    }

}
