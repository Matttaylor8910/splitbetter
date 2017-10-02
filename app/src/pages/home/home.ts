import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherTestProvider } from '../../providers/weather-test/weather-test';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;

  constructor(public navCtrl: NavController, private weatherTestProvider: WeatherTestProvider) {

  }

  ionViewWillEnter() {
    this.weatherTestProvider.getWeather().subscribe(weather => {
       this.weather = weather;
    });
  }

}
