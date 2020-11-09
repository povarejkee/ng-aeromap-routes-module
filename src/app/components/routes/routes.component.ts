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
  value: string;
  flyingList: string[] = ['Полёт воздушного судна'];
  unitsHeight: string[] = ['м'];
  unitsSpeed: string[] = ['км/ч'];
  unitsAirship: string[] = ['VFR'];
  autocompleteItems$: Observable<any>;

  /* <ПОКА БЕЗ СТЕЙТ-СЕРВИСА> */
  chosenItems: string[] = [];
  /* </ПОКА БЕЗ СТЕЙТ-СЕРВИСА> */

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(public dialog: MatDialog, private routesFacade: RoutesFacade) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      flying: new FormControl(null),
      contentEditable: new FormControl(null),
    });

    this.autocompleteItems$ = this.routesFacade.getAutocompleteItems();
    this.value = this.routesFacade.getInputValue();
  }

  ngAfterViewInit(): void {
    fromEvent(this.inputRef.nativeElement, 'input')
      .pipe(
        takeUntil(this.unsubscribe$),
        pluck('target', 'textContent'),
        debounceTime(600),
        tap((str: string) => {
          console.warn('Строка:', str);
          console.warn('Массив из строки:', str.split(' '));

          const requestStr = this.takeValueForAutocompleteRequest(str);
          this.routesFacade.loadAutocompleteItems(requestStr);

          console.warn('Строка для запроса:', requestStr);
          console.warn(
            'Сравнение итемов и строки при onchange:',
            this.compareCurrentItemsWithString(this.chosenItems, str)
          );
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

  ///

  takeValueForAutocompleteRequest(str: string): string {
    const lastSpaceIdx = str.lastIndexOf(' ');
    console.log(lastSpaceIdx);

    if (lastSpaceIdx !== -1) {
      return str.slice(lastSpaceIdx).trim();
    } else {
      return str;
    }
  }

  chooseAutocompleteItem(item: string): void {
    this.chosenItems.push(item);
    // this.value = this.chosenItems.join(' ') + ' ';
    this.inputRef.nativeElement.textContent = this.chosenItems.join(' ') + ' ';
    this.routesFacade.setAutocompleteItems(null);

    console.log('Выбранные:', this.chosenItems);
    console.log(
      'Сравнение итемов и строки после выбора :',
      this.compareCurrentItemsWithString(this.chosenItems, this.inputRef.nativeElement.textContent)
    );
  }

  clear(): void {
    this.inputRef.nativeElement.textContent = '';
    this.chosenItems = [];
    this.routesFacade.setAutocompleteItems(null);
  }

  compareCurrentItemsWithString(items, string) {
    const stringsCollection: string[] = string.trim().split(' ');

    // TODO для начала найдем индексы тех мест, которые не совпадают

    return [items, stringsCollection];
  }
}
