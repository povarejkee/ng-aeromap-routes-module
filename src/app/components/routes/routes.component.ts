import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoutesDialogContentComponent } from './routes-dialog-content/routes-dialog-content.component';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      flying: new FormControl(null),
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RoutesDialogContentComponent, {
      minWidth: 1000,
      minHeight: 600,
      // maxWidth: 1000,
      // maxHeight: 600,
      // panelClass: 'modal-dialog-l',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  submit(): void {}
}
