import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

export interface SpendData {
  'Department Family': string;
  'Entity': string;
  'Date': string;
  'Expense Type': string;
  'Expense Area': string;
  'Supplier': string;
  'Transaction Number': number;
  'Amount': number;
  'Invoice Currency Unit': string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  spendData: Array<SpendData>;
  displayedChart: string;

  // Expense Type Bar Chart
  expTypeBarLabels: Array<string>;
  expTypeBarValues: Array<any>;
  expTypeBarLabel: string;

  // Total Expenditure Line Chart
  totalExpLineLabels: Array<string>;
  totalExpLineValues: Array<any>;
  totalExpLineLabel: string;

  ngOnInit(): void {
    this.dataService.getAll()
      .subscribe(data => {
        this.spendData = data;
      });
  }

  loadExpTypeBarChart() {
    this.displayedChart = 'expType';

    if (!this.expTypeBarValues) {

      const groupedData = this.groupData('Expense Type');
      this.expTypeBarLabels = Object.keys(groupedData);
      this.expTypeBarValues = [];

      // Sum all items in group
      this.expTypeBarLabels.forEach(label => {
        const sum = groupedData[label]
          .map((val: SpendData) => Math.round(val.Amount))
          .reduce((a: number, c: number) => a + c);
        // Hack - Numbers too high effecting graph scale. Fudging for this example.
        this.expTypeBarValues.push(sum > 100000 ? sum / 1000 : sum);
      });

      this.expTypeBarLabel = 'Total expenditure per Expense Type';

    }
  }

  loadTotalExpLineChart() {
    this.displayedChart = 'totalExp';

    if (!this.totalExpLineValues) {
      const groupedData = this.groupData('Date');
      this.totalExpLineLabels = Object.keys(groupedData);
      this.totalExpLineValues = [];

      // Sum all amounts in group
      let sum = 0;
      this.totalExpLineLabels.forEach((key) => {
        const total = groupedData[key].reduce((a, c) => a + c.Amount, 0);
        // Hack - Numbers too high effecting graph scale. Fudging for this example.
        sum += total > 100000 ? total / 100 : total;
        this.totalExpLineValues.push(sum);
      });

      this.totalExpLineLabel = 'Cumulative total expenditure';
    }
  }

  private groupData(groupBy: string) {
    return this.spendData.reduce((a, c) => {
      a[c[groupBy]] = a[c[groupBy]] || [];
      a[c[groupBy]].push(c);
      return a;
    }, Object.create(null));
  }
}
