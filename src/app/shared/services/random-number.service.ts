import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {config} from "../../config";

@Injectable({
  providedIn: 'root'
})
export class RandomNumberService {

  numberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
  }

  getNumber(): Observable<number> {
    return this.http.get<number>(config.API + '?num=1&min=100&max=1000&col=1&base=10&format=plain&rnd=new')
  }


}
