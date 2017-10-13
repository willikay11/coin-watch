import { Component } from '@angular/core';
import {NavController, LoadingController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coins: any;
  nextData: any;
  nextPage: any;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, private fire:AngularFireAuth) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ' <div class="custom-spinner-container">' +
      ' <div class="custom-spinner-box">' +
      '<span>Loading info ...</span>'+
      '</div>' +
      ' </div>',
    });

    loading.present();

    this.http.get('http://coin-watch.ga/api/getMyCoins/'+this.fire.auth.currentUser.uid)
        .map(res => res.json())
        .subscribe(data => {
          loading.dismiss();
        this.coins = data.data;
        this.nextPage = data.next_page_url;
    });
  }

  doInfinite(): Promise<any> {

    return new Promise((resolve) => {

      this.http.get('http://coin-watch.ga/api/coins/' + this.nextPage)
          .map(res => res.json())
          .subscribe(data => {

            this.nextData = Object.keys(data.data).map(function(key) {
              return data.data[key];
            });

            this.coins = this.coins.concat(this.nextData);

            this.nextPage = data.next_page_url;

            resolve();

          });
    })
  }

    goToCoinPage(coin) {
        this.navCtrl.push('CoinPage', {coinName: coin.name, id: coin.id});
    }
}
