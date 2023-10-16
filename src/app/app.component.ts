import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, switchMap} from "rxjs";
import {RandomNumberService} from "./shared/services/random-number.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  subjectData1!: Observable<number>;
  subjectData2!: Observable<number>;
  subjectData3!: Observable<number>;

  event$ = new BehaviorSubject(0)

  constructor(private randomService: RandomNumberService) {
  }

  ngOnInit() {
    this.randomNumberAction();
  }

  randomNumberAction(): void {
    this.subjectData1 = this.subjectData2 = this.subjectData3 =
      this.event$.pipe(
        switchMap(() => this.randomService.getNumber()),
        shareReplay(),
      )
  }



}
