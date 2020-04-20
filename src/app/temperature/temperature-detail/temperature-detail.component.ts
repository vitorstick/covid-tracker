import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import { BaseChartDirective, Color, Label } from 'ng2-charts';
import { NewEntry } from '../models/temperature.interface';

@Component({
  selector: 'app-temperature-detail',
  templateUrl: './temperature-detail.component.html',
  styleUrls: ['./temperature-detail.component.scss']
})
export class TemperatureDetailComponent implements OnInit {
  private _entries: NewEntry[] = [];
  get entries(): NewEntry[] {
    return this._entries;
  }

  @Input('entries')
  set entries(entries: NewEntry[]) {
    this._entries = entries;
    if (!!this._entries && this._entries.length > 0) {
      this._entries = this._entries.sort((a, b) => {
        const aDate = moment(a.date, 'DD/MM/YYYY HH:mm:ss');
        const bDate = moment(b.date, 'DD/MM/YYYY HH:mm:ss');
        const isGreater = moment(aDate).isAfter(bDate) ? 1 : -1;
        // console.log(aDate);
        // console.log(bDate);
        // console.log(isGreater);
        return isGreater;
      });
      // console.log('entries', this._entries);
      this.setGraph();
    }
  }

  public lineChartData: ChartDataSets[] = [{ data: [], label: '' }];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left'
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'box',
          id: 'y-axis-box',
          yScaleID: 'y-axis-0',
          yMax: 37.6,
          yMin: 36.1,
          borderColor: 'rgba(0,0,0,0.1)',
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderWidth: 2
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      // yellow
      backgroundColor: 'rgba(255,215,0,0.3)',
      borderColor: '#e6c200',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointRadius: 6,
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType: ChartType;
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {}

  ngOnInit(): void {
    this.lineChartType = 'line';
  }

  private setGraph() {
    this.resetGraph();
    let tempLabelList: string[] = [];
    this._entries.forEach(entry => {
      const date = moment().format('DD/MM');
      tempLabelList.push(date);
      this.lineChartData[0].data.push(entry.value);
    });
    const labelList = tempLabelList;
    this.lineChartLabels = labelList;
  }

  private resetGraph() {
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];
  }
}
