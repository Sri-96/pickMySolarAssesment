import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from '../../../services/authservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { merge } from 'rxjs';
import { last } from 'rxjs/operators';
export interface PeriodicElement {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  acceptTerms: boolean;
  confirmPassword: string;
  password: string;

}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ListofUsers
  tableData: PeriodicElement[];
  displayedColumns: string[] = ["id", "firstName", "lastName", "email", "title", "action", "delete"];
  dataSource
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  user;
  lenghtOfUsers;

  constructor(private router: Router, private authservice: AuthserviceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
    //  this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getUsers() {
    this.ListofUsers = this.authservice.getUsers();
    this.lenghtOfUsers = this.ListofUsers.length;
    this.tableData = this.ListofUsers
    // .map(ele => ({
    //   id: ele.id,
    //   firstName: ele.firstName,
    //   lastName: ele.lastName,
    //   email: ele.email,
    //   title: ele.title
    // }))
    this.dataSource = new MatTableDataSource(this.tableData);

    console.log(this.ListofUsers, this.tableData);
    this.dataSource.sort = this.sort;
  }

  deleteUser(user) {
    this.tableData = this.tableData.filter(x => x.id !== user.id);
    this.dataSource = new MatTableDataSource(this.tableData);
    // this.ListofUsers = this.authservice.deleteUser(user.id);    
  }

  AddUser() {
    let user = {
      acceptTerms: true,
      confirmPassword: "123456",
      email: "",
      firstName: "",
      id: this.lenghtOfUsers+1,
      lastName: "",
      password: "123456",
      title: "",
    }
    console.log(user);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(user);
      this.tableData.push(user);
      this.ListofUsers = this.tableData;
      localStorage.setItem('users', JSON.stringify(this.tableData));
      this.dataSource = new MatTableDataSource(this.tableData);
      this.table.renderRows();
    });
  }

  editUser(user) {
    console.log(user);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(user)
      // debugger;
      const userid = user.id;
      let userIndex = this.ListofUsers.findIndex(e => e.id == userid)

      let newArray = this.ListofUsers;

      newArray[userIndex] = user;

      this.ListofUsers = newArray;

      console.log(this.ListofUsers);
      localStorage.setItem('users', JSON.stringify(this.ListofUsers));


      // this.user = user;
    });
  }


}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}