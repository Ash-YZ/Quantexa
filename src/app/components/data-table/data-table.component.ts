import { Component, OnInit, Input } from '@angular/core';
import { SpendData } from 'src/app/app.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  constructor() { }

  @Input() spendData: Array<SpendData>;
  @Input() title: string;

  ngOnInit() {
  }

  preserveOrder() {
    return 1;
  }
}
