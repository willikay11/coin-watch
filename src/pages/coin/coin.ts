import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';

/**
 * Generated class for the CoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coin',
  templateUrl: 'coin.html',
})
export class CoinPage {
  @ViewChild('lineCanvas') lineCanvas;

  lineChart: any;

  config: any;

  coinName = null;
  id = null

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.coinName = this.navParams.get('coinName');
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ' <div class="custom-spinner-container">' +
      ' <div class="custom-spinner-box">' +
      '<span>Loading info ...</span>'+
      '</div>' +
      ' </div>',
    });

    // loading.present();

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
          type: 'line',
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "Bitcoin",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40],
                spanGaps: false,
              }
            ]
          }
        }



    );
  }

}
