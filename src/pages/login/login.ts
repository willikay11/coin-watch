import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from "../register/register";
import { TabsPage } from "../tabs/tabs";
import { SelectPage } from "../select/select";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    @ViewChild('username') user;
    @ViewChild('password') password;
    userId: number;

    constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public http: Http) {

    }

    ionViewWillEnter(){
        let vm = this;

        this.fire.auth.onAuthStateChanged(function(user) {
            if (user) {
                vm.navCtrl.setRoot( TabsPage );
            } else {
                console.log("no user");
            }
        });
    }

    ionViewDidLoad() {
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
                this.http.get('http://coin-watch.ga/api/checkLogin/'+this.fire.auth.currentUser.email+'/uid/'+this.fire.auth.currentUser.uid)
                    .map(res => res.json())
                    .subscribe(data => {
                        if (data.success)
                        {
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
