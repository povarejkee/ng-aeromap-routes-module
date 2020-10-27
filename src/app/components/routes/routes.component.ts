import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  form: FormGroup;
  flyingList: string[] = ['Полёт воздушного судна'];
  routesList: any[] = [
    {
      ArrivialArpt: 'UUEE', // todo отлёт или прибытие?
      DepartureTime: '14:30', // todo уточнить
      hz: 'Шереметьево', // todo такого ключа нет
      height: 400, // todo  такого ключа нет
    },
    {
      ArrivialArpt: 'UUEE',
      DepartureTime: '21:45',
      hz: 'Домодедово',
      height: 600,
    },
  ];
  unitsHeight: string[] = ['м'];
  unitsSpeed: string[] = ['км/ч'];
  unitsAirship: string[] = ['VFR'];

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      flying: new FormControl(null),
    });
  }

  submit(): void {}
}
