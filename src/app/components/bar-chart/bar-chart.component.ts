import chartConfig from './../chart-config';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  constructor() { }

  @Input() barChartLabels: Array<string>;
  @Input() barChartValues: Array<number>;
  @Input() label: string;
  @Input() barColor: string;

  barChartConfig = Object.assign({}, chartConfig);

  ngOnInit() {
    this.barChartConfig.chartType = 'bar';
    this.barChartConfig.chartColors = [{ backgroundColor: this.barColor || '#000' }];
    this.barChartConfig.chartLabels = this.barChartLabels;
    this.barChartConfig.chartData = [{ data: this.barChartValues, label: this.label }];
  }
}
