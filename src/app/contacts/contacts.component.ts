import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactsService } from './contacts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {

  data;
  contSub: Subscription;
  constructor(private contactsService: ContactsService, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // this.data = this.contactsService.getData();
    this.contSub = this.contactsService.fetchAllContacts().subscribe(contacts => {
      console.log(contacts);
      this.data = contacts;
    });
    // this.contSub = this.contactsService.getContactsSub().subscribe( conts => {
    //   console.log('conts: ' + conts);
    //   this.contacts = conts;
    // });
  }

  openChat(contact: Contact) {
    // localStorage.setItem('contactUuid_' + contact.uuid, contact.uuid);
    // localStorage.setItem('contactName_' + contact.name, contact.name);

    this.contactsService.setCurrentContact(contact);
    const userId = this.authService.getUserId();
    this.router.navigate(['chat', userId, contact.uuid]);
  }

  ngOnDestroy() {
    this.contSub.unsubscribe();
  }

  getCurUser() {
    return this.authService.getUserId();
  }

}
