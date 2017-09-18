import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  coins: any;

  constructor(public navCtrl: NavController, public http: Http) {

    this.http.get('/coin-watch-server/api/coins')
        .map(res => res.json())
        .subscribe(data => {
      this.coins = data
    });
  }

}
