import {Component, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, Subscription, switchMap} from "rxjs";
import {RandomNumberService} from "./shared/services/random-number.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  subjectData!: number;
  private subscription: Subscription | null = null;

  constructor(private randomService: RandomNumberService) {
  }

  ngOnInit() {
    this.randomNumberAction();
  }

  randomNumberAction(): void {
    this.subscription = this.randomService.numberSubject
      .pipe(
        switchMap(() => {
          return this.randomService.getNumber();
        })
      )
      .subscribe({
        next: (data: number) => {
          debounceTime(500)
          this.subjectData = data
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
