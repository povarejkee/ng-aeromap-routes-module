import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { RoutesDialogInfoComponent } from '../routes-dialog-info/routes-dialog-info.component';

@Component({
  selector: 'app-routes-dialog-content',
  templateUrl: './routes-dialog-content.component.html',
  styleUrls: ['./routes-dialog-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutesDialogContentComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RoutesDialogInfoComponent, {
      minWidth: 340,
      minHeight: 522,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
