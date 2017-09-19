import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coins: any;
  nextPage: any;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ' <div class="custom-spinner-container">' +
      ' <div class="custom-spinner-box">' +
      '<span>Loading info ...</span>'+
      '</div>' +
      ' </div>',
    });

    loading.present();

    this.http.get('/coin-watch-server/api/coins')
        .map(res => res.json())
        .subscribe(data => {
          loading.dismiss();
        this.coins = data.data;
        this.nextPage = data.next_page_url;
    });
  }

  doInfinite(infiniteScroll) {
    this.http.get('/coin-watch-server/api/coins' + this.nextPage)
        .map(res => res.json())
        .subscribe(data => {
          this.nextPage = data.next_page_url;
            console.log(data.data);
            console.log(this.nextPage);
        });

    infiniteScroll.complete();
  }

}
