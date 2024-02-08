import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import {EmiService} from "./emi.service";
import {EmiArguments} from "../shared/model/EmiArguments";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'emi-ui';
  items: number[] = [];
  loanValueText: string = '';
  yearlyInterestRateText: string = '';
  loanTermText: string = '';
  alertMessage: string = '';
  total: string = '';

  constructor(private emiService: EmiService) {
  }

  ngOnInit(): void {
    this.updateHistory();
  }

  onSubmit(): void {
    let emiArguments = new EmiArguments(
      Number(this.loanValueText),
      Number(this.yearlyInterestRateText),
      Number(this.loanTermText)
    );

    this.emiService.calculate(emiArguments).subscribe({
      next: (data) => {
        this.total = data.amount.toString();
        this.updateHistory()
      },
      error: (e) => this.alertMessage = e.message
    });
  }

  private updateHistory() {
    this.emiService.getHistory().subscribe({
      next: (data) => {
        this.items = data
      },
      error: (e) => this.alertMessage = e.message
    });
  }

  onClick(): void {
    this.alertMessage = '';
  }
}
