import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) { }

  getWeather(location: string) {
    return this.http.get(
      'http://api.weatherstack.com/current?access_key=ff7690fef040d9acf555a02440af89a0& query=' + location
    );
  }
}
