import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { RoutesDialogContentComponent } from './routes-dialog-content/routes-dialog-content.component';
import { fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, pluck, takeUntil, tap } from 'rxjs/operators';
import { RoutesFacade } from '../../routes-facade.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inputRoute') private inputRef: ElementRef;

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
  autocompleteItems$: Observable<any>;

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(public dialog: MatDialog, private routesFacade: RoutesFacade) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      flying: new FormControl(null),
    });

    this.autocompleteItems$ = this.routesFacade.getAutocompleteItems();
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputRef.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        pluck('target', 'value'),
        debounceTime(600),
        tap((str: string) => {
          this.routesFacade.loadAutocompleteItems(str);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
