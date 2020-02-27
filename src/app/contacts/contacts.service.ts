import { Injectable, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { Subject } from "rxjs";

import { AllChats } from './models/allChats.model';
import { Contact } from './models/contact.model';
import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";

const BACKEND_URL = environment.apiUrl;

@Injectable({providedIn: 'root'})
export class ContactsService implements OnInit {
  private dataSub = new Subject<any>();
  private msgSub = new Subject<any>();
  private currentContact: Contact;
  private data = [];


  constructor(private authService: AuthService, private http: HttpClient,
    private route: ActivatedRoute) {
    // console.log(this.data[0]);
  }

  setCurrentContact(contact: Contact) {
    this.currentContact = contact;
  }

  getCurrentContact() {
    return this.currentContact;
  }

  ngOnInit() {

    this.dataSub.next(this.data);
    // this.route.paramMap.subscribe(paramMap => {
    //   if (paramMap.has('userId') && paramMap.has('contactName')) {
    //     const userId = paramMap.get('userId');
    //     const contactName = paramMap.get('contactName');
    //     this.fetchMessagesOfDialog(userId, contactName).subscribe(msgs => {
    //       console.log('Fetched msgs: ' + msgs);
    //       this.msgSub.next(msgs);
    //     });
    //   }
    // });
    // :userId/:contactId
  }
  getDataSub() {
    return this.dataSub.asObservable();
  }

  // getData() {
  //   return this.data;
  // }

  getMsgsSub() {
    return this.msgSub.asObservable();
  }

  public postNewMsg(message: Message) {
    console.log('try to post new msg: ' + message.sender + message.receiver + message.content);
    return this.http.post<{answer: string}>(BACKEND_URL + '/new-message', message);
  }

  public fetchAllContacts() {
    return this.http.get<Contact[]>(BACKEND_URL + '/contacts');
  }

  public fetchMessagesOfDialog(userId: string, contactName: string) {
    return this.http.get<Message[]>(BACKEND_URL + '/messages/' + userId + '/' + contactName);
  }

  public deleteMsg(message: Message) {
    return this.http.post<any>(BACKEND_URL + '/delete-message', {message: message, token: this.authService.getToken()});
  }
}
