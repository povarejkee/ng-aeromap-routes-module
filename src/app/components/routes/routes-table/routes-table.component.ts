import { ChangeDetectionStrategy, Component, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AlsGridData, GridData, TableCol, TableConfig } from '@monitorsoft/als-ui';

import { TableDataCell } from '../../../models/table-data-cell.interface';

@Injectable()
export class GridDataService extends AlsGridData<TableDataCell> {
  constructor() {
    super();
  }

  private fakeData: any = [
    {
      route: { name: 'UUCS', type: 'Сапсан', iconName: 'heliport' },
      distanceFromStart: '0',
      distanceFromPoint: '0',
      speed: '200',
      height: '400',
      course: '53',
      fuel: '96',
      eet: '-',
      eta: '14:30',
      vp: 'G',
      orvd: 'ULLL',
    },
    {
      route: { name: 'UUEE', type: 'Шереметьево', iconName: 'civil' },
      distanceFromStart: '15',
      distanceFromPoint: '15',
      speed: '200',
      height: '400',
      course: '32',
      fuel: '92',
      eet: '00:34',
      eta: '14:36',
      vp: 'G',
      orvd: 'ULLL',
    },
    {
      route: { name: 'ZHORIK', type: null, iconName: 'error_triangle' },
      distanceFromStart: null,
      distanceFromPoint: null,
      speed: null,
      height: null,
      course: null,
      fuel: null,
      eet: null,
      eta: null,
      vp: null,
      orvd: 'incorrect',
    },
    {
      route: { name: 'BESTA', type: 'Шереметьево', iconName: 'point_pdpz' },
      distanceFromStart: '20',
      distanceFromPoint: '5',
      speed: '400',
      height: '400',
      course: '28',
      fuel: '91',
      eet: '00:45',
      eta: '14:38',
      vp: 'C',
      orvd: 'ULLL',
    },
    {
      route: { name: '5597N37410E', type: 'Геоточка', iconName: 'lifr_circle' },
      distanceFromStart: '30',
      distanceFromPoint: '10',
      speed: '400',
      height: '400',
      course: '49',
      fuel: '86',
      eet: '00:52',
      eta: '14:38',
      vp: 'C',
      orvd: 'ULLL',
    },
  ];

  getData(): Observable<GridData<TableDataCell>> {
    return of<GridData<TableDataCell>>({ totalCount: this.fakeData.length, data: this.fakeData });
  }
}

@Component({
  selector: 'app-routes-table',
  templateUrl: './routes-table.component.html',
  styleUrls: ['./routes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: AlsGridData,
      useClass: GridDataService,
    },
  ],
})
export class RoutesTableComponent {
  colDefs: Array<TableCol> = [
    { title: 'Маршрут', name: 'route', width: '200' },
    { title: 'Дист. от начала', name: 'distanceFromStart', width: '100' },
    { title: 'Дист. от точки', name: 'distanceFromPoint', width: '100' },
    { title: 'Скор.', name: 'speed', width: '75' },
    { title: 'Выс.', name: 'height', width: '75' },
    { title: 'Курс', name: 'course', width: '75' },
    { title: 'Топл.', name: 'fuel', width: '75' },
    { title: 'ЕЕТ', name: 'eet', width: '75' },
    { title: 'ЕТА', name: 'eta', width: '75' },
    { title: 'ВП', name: 'vp', width: '75' },
    { title: 'ОРВД', name: 'orvd', width: '75' },
  ];

  tableConfig: TableConfig = {
    selectionRows: false,
    settingsRows: false,
    favoritesRows: false,
  };
}
