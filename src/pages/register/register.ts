import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {LoginPage} from "../login/login";


@IonicPage()

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})

export class RegisterPage {


    @ViewChild('username') user;
    @ViewChild('password') password;

    constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

    alert(message: string) {
        this.alertCtrl.create({
            title: 'Info!',
            subTitle: message,
            buttons: ['OK']
        }).present();
    }

    registerUser() {
        this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
            .then(data => {
                this.alert('Registered!');
                this.navCtrl.setRoot( LoginPage );
            })
            .catch(error => {
                this.alert(error.message);
            });
    }

}