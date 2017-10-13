import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
// import {LoginPage} from "../login/login";
import { Http } from '@angular/http';
import {SelectPage} from "../select/select";
import 'rxjs/add/operator/map';
import { TabsPage } from "../tabs/tabs";

@IonicPage()

@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})

export class RegisterPage {


    @ViewChild('username') user;
    @ViewChild('password') password;

    constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public http: Http) {

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
                this.http.get('http://coin-watch.ga/api/checkLogin/'+this.fire.auth.currentUser.email+'/uid/'+this.fire.auth.currentUser.uid)
                    .map(res => res.json())
                    .subscribe(data => {
                        if (data.success)
                        {
                            this.alert('Registered!');
                            if(data.selectedCoins == 0)
                            {
                                this.navCtrl.setRoot( SelectPage );
                            }else
                            {
                                this.alert('Success! You\'re logged in');
                                this.navCtrl.setRoot( TabsPage );
                            }
                        }
                    });
                // this.navCtrl.setRoot( LoginPage );
            })
            .catch(error => {
                this.alert(error.message);
            });
    }

}