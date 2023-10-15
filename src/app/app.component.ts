import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {RandomNumberService} from "./shared/services/random-number.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  subjectData1!: number;
  subjectData2!: number;
  subjectData3!: number;
  private subscription: Subscription | null = null;

  constructor(private randomService: RandomNumberService) {
  }

  ngOnInit() {
    this.randomNumberAction();
  }

  randomNumberAction(): void {
    this.subscription = this.randomService.getNumber()
      .subscribe({
        next: (data: number) => {
          this.subjectData1 = data
          this.subjectData2 = data
          this.subjectData3 = data
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }


}
