import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Http } from '@angular/http';
import {TabsPage} from "../tabs/tabs";

@IonicPage()

@Component({
    selector: 'page-select',
    templateUrl: 'select.html',
})

export class SelectPage {
    coins: any;
    showNextButton: boolean;
    selectedCoins = [];

    constructor(private alertCtrl: AlertController, private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public http: Http) {
        this.showNextButton = false;

        let loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: ' <div class="custom-spinner-container">' +
            ' <div class="custom-spinner-box">' +
            '<span>Loading info ...</span>'+
            '</div>' +
            ' </div>',
        });

        loading.present();

        this.http.get('/coin-watch-server/api/getCoinsForSelect')
            .map(res => res.json())
            .subscribe(data => {
                loading.dismiss();
                this.coins = data.data;
            });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SelectPage');
    }

    selectCoin(coin)
    {
        if(this.selectedCoins.indexOf(coin['id']) !== -1)
        {
            this.selectedCoins.splice(this.selectedCoins.indexOf(coin['id']), 1);
        }
        else
        {
            this.selectedCoins.push(coin['id']);
        }
    }

    addSelectedCoins()
    {
        this.http.post('/coin-watch-server/api/store/selectedCoins', {
            coins: this.selectedCoins,
            userId: 1
        })
            .map(res => res.json())
            .subscribe(data => {
                if(data.success)
                {
                    this.navCtrl.setRoot( TabsPage );
                }
            });
    }
}
