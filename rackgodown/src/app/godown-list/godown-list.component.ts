import { AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { GodownService } from '../godown.service';
import { Godown } from '../models/godown';

@Component({
  selector: 'app-godown-list',
  templateUrl: './godown-list.component.html',
  styleUrls: ['./godown-list.component.scss']
})
export class GodownListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'code', 'description',  'default', 'inactive', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Godown>();
  godowns: Godown[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private router: Router,
    private godownservice: GodownService,
    private dialog: MatDialog
  ) {
    this.getGodownData();
    this.dataSource = new MatTableDataSource(this.godowns);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  editGodown(id: number) {
    this.router.navigate(['/add-godown', { id: id }]);
  }


  getGodownData() {
    this.godownservice.getGodowns().subscribe((godowns: Godown[]) => {

      this.godowns = godowns;
      this.dataSource.data = [...this.godowns];
    });
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
        this.godownservice.deleteGodown(id);

        const itemIndex = this.godowns.findIndex(obj => obj[id] === id);
        this.godowns.splice(itemIndex, 1);

        this.dataSource.data = [...this.godowns];

      }
    });
  }

}
