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
  changedIndex: number;
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
          const requestStr: string = this.findChangedItem(str) || this.takeValueForAutocompleteRequest(str);

          this.routesFacade.loadAutocompleteItems(requestStr.toUpperCase());
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
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  submit(): void {}

  onBlurAutocomplete(): void {
    console.log('BLURED!');
  }

  ///

  takeValueForAutocompleteRequest(str: string): string {
    const lastSpaceIdx = str.lastIndexOf(' ');

    if (lastSpaceIdx > -1) {
      return str.slice(lastSpaceIdx).trim();
    } else {
      return str;
    }
  }

  findChangedItem(input: string): string {
    const inputArray: string[] = input.trim().split(' ');

    // TODO найдем те места, которые не совпадают
    for (let i = 0; i < this.chosenItems.length; i++) {
      if (this.chosenItems[i] !== inputArray[i]) {
        console.log('Найдено несоответствие по индексу', i);
        this.changedIndex = i;

        return inputArray[this.changedIndex];
      }
    }
  }

  chooseAutocompleteItem(item: string): void {
    if (this.changedIndex === undefined) {
      this.chosenItems.push(item);
    } else {
      this.chosenItems[this.changedIndex] = item;
    }

    this.inputRef.nativeElement.textContent = this.chosenItems.join(' ') + ' ';
    this.changedIndex = undefined;
    this.routesFacade.setAutocompleteItems(null);
  }

  clear(): void {
    this.inputRef.nativeElement.textContent = '';
    this.chosenItems = [];
    this.routesFacade.setAutocompleteItems(null);
  }
}
