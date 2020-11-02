import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-route-dialog-info',
  templateUrl: './routes-dialog-info.component.html',
  styleUrls: ['./routes-dialog-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesDialogInfoComponent implements OnInit {
  fake1 = false;
  fake2 = false;
  fake3 = false;
  fake4 = false;

  unitsHeight: string[] = ['м'];
  unitsSpeed: string[] = ['км/ч'];

  constructor() {}

  ngOnInit(): void {}

  toggleFake(key: string): void {
    this[key] = !this[key];
  }
}
