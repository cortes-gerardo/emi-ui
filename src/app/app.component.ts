import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {EmiService} from "./emi.service";
import {EmiArguments} from "../shared/model/EmiArguments";
import {Result} from "../shared/model/Result";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'emi-ui';
  items : number[] = [];
  loanValueText = '';
  yearlyInterestRateText = '';
  loanTermText = '';

  constructor(private emiService: EmiService) {
  }

  ngOnInit(): void {
    this.emiService.getHistory().subscribe((data) => {
      this.items = data;
    });
  }

  calculate() {
    let loanValue = Number(this.loanValueText);
    let yearlyInterestRate = Number(this.yearlyInterestRateText);
    let loanTerm = Number(this.loanTermText);
    console.log(loanValue);

    let emiArguments = new EmiArguments(loanValue, yearlyInterestRate, loanTerm);
    console.log(emiArguments);

    this.emiService.calculate(emiArguments).subscribe((data) => {
      console.log(data);
    });
  }

}
