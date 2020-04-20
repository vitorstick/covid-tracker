import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NewEntry } from '../models/temperature.interface';

@Component({
  selector: 'app-pain-detail',
  templateUrl: './pain-detail.component.html',
  styleUrls: ['./pain-detail.component.scss']
})
export class PainDetailComponent implements OnInit {
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
        return isGreater;
      });
      // console.log('entries', this._entries);
      this._entries.map(ent => {
        (ent.throatpainValue = ent.throatpain ? 'Sim' : 'Não'),
          (ent.headpainValue = ent.headpain ? 'Sim' : 'Não');
      });
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
