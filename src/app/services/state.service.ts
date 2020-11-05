import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class RoutesState {
  private autocompleteItems$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _inputValue: string = '';

  public getAutocompleteItems$(): Observable<any> {
    return this.autocompleteItems$.asObservable();
  }

  public setAutocompleteItems(items: any): void {
    this.autocompleteItems$.next(items);
  }

  public getLoadingStatus$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public setLoadingStatus(status: boolean): void {
    this.isLoading$.next(status);
  }

  get inputValue(): string {
    return this._inputValue;
  }

  set inputValue(value: string) {
    this._inputValue = value;
  }
}
