import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { AuthService } from 'src/app/auth/auth.service';
import {  Subscription } from 'rxjs';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {
  data = [];
  dataSubscr: Subscription;
  constructor(private contactsService: ContactsService, private authService: AuthService,
    private adminService: AdminService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSubscr = this.contactsService.fetchAllContacts().subscribe(data => {
      this.data = data;
    });
  }

  ngOnDestroy() {
    this.dataSubscr.unsubscribe();
  }

  onDeleteUser(uuid: string, i: number) {
    this.adminService.deleteUser(uuid).subscribe(answer => {
      console.log('deleting user: ' + answer.message);
      this.data.splice(i, 1);
    });
  }

  onEditUser(name: string, i: number, uuid: string) {

    this.dialog.open(UserEditComponent, {data: {name: name, i: i, uuid: uuid}});
  }

}
