import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherTestProvider {
  url = 'http://spilt-better-dev-app.azurewebsites.net/api/SampleData/WeatherForecasts';

  constructor(public http: Http) {
  }

  getWeather() {
    return this.http.get(this.url).map(res => res.json());
  }

}
