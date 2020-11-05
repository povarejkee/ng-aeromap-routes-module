import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { RoutesApi } from './services/api.service';
import { RoutesState } from './services/state.service';

@Injectable()
export class RoutesFacade {
  private autocompleteItemsAPISub: Subscription;

  constructor(private routesApi: RoutesApi, private routesState: RoutesState) {}

  loadAutocompleteItems(str: string): void {
    this.autocompleteItemsAPISub = this.routesApi.getAutocompleteItemsByStr(str).subscribe((response: any) => {
      console.log(response);
      this.routesState.setAutocompleteItems(response);
    });
  }

  getAutocompleteItems(): any {
    return this.routesState.getAutocompleteItems$();
  }
}
