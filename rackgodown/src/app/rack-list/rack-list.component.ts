import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { Rack } from '../models/rack';
import { RackService } from '../rack.service';

@Component({
  selector: 'app-rack-list',
  templateUrl: './rack-list.component.html',
  styleUrls: ['./rack-list.component.scss']
})
export class RackListComponent implements OnChanges {

  displayedColumns: string[] = ['id', 'code', 'description', 'capacity', 'default', 'inactive', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Rack>();
  @Input() racks: Rack[];
  @Input() godownId: number;

  constructor(
    private router: Router,
    private rackservice: RackService,
    private dialog: MatDialog
  ) {

  }

  ngOnChanges(changes) {
    this.dataSource.data = this.racks;
  }

  editRack(id: number) {
    this.router.navigate(['/edit-rack', { id: id }]);
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Delete',
          cancel: 'No'
        }
      }
    });


    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("user wants to delete");
        this.rackservice.deleteRack(id);

        const itemIndex = this.racks.findIndex(obj => obj[id] === id);
        this.racks.splice(itemIndex, 1);

        this.dataSource.data = this.racks;

      }
    });
  }

}


