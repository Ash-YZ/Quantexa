import chartConfig from './../chart-config';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  @Input() lineChartLabels: Array<string>;
  @Input() lineChartValues: Array<number>;
  @Input() label: string;
  @Input() barColor: string;

  lineChartConfig = Object.assign({}, chartConfig);

  ngOnInit() {
    this.lineChartConfig.chartColors = [{ borderColor: this.barColor || '#000' }];
    this.lineChartConfig.chartType = 'line';
    this.lineChartConfig.chartLabels = this.lineChartLabels;
    this.lineChartConfig.chartData = [{ data: this.lineChartValues, label: this.label }];
  }
}

