import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../contacts.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from '../models/message.model';
import { Contact } from '../models/contact.model';
import { AuthService } from 'src/app/auth/auth.service';





@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[];
  form: FormGroup;
  msgsSubscription: Subscription;

  sender;
  receiver;
  currentContact: Contact;
  currentUserName;
  currentUserId;
  constructor(public route: ActivatedRoute, private contactsService: ContactsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.messages = [];
    this.currentContact = this.contactsService.getCurrentContact();
    this.currentUserName = this.authService.getUserName();
    this.currentUserId = this.authService.getUserId();
    console.log("cur us  " + this.currentUserId );
    console.log("cur name: " +  this.currentUserName);
    // this.msgsSubscription = this.contactsService.getMsgsSub().subscribe(msgs => {
    //   console.log('MSGS: ' + msgs);
    //   this.messages = msgs;
    // });
  //   this.route.paramMap.subscribe((paramMap) => {
  //     if (paramMap.has('postId')) {
  //       this.mode = 'edit';
  //       this.postId = paramMap.get('postId');
  this.form = new FormGroup({
    'message' : new FormControl(null, {
      validators: [Validators.required, Validators.required]
    })
  });

    this.route.paramMap.subscribe( paramMap => {
      if (paramMap.has('userId') && paramMap.has('contactId')) {
        const userId = paramMap.get('userId');
        const contactId = paramMap.get('contactId');
        this.sender = userId;
        this.receiver = contactId;
        console.log('sender: ' + this.sender);
        console.log('receiver: ' + this.receiver);
        // this.msgsSubscription = this.contactsService.getMsgsSub().subscribe( data => {
        //   console.log('DATA: ' + data);
        //   this.messages = data;
        // });
        this.contactsService.fetchMessagesOfDialog(this.sender, this.receiver).subscribe( (data: Message[]) => {
          console.log('DATA: ' + data);
          this.messages = data;
        });
        // const i =  +paramMap.get('id');
        // console.log(this.contactsService.getData()[i]);
        // this.messages = this.contactsService.getData()[i].msgs;
      }
    });

console.log('current data arr: ' + this.messages);
console.log('current data arr len: ' + this.messages.length);

  }
  onSendMsg() {
    if (this.form.invalid) {
      return;
    }
    console.log('1');
    const content = this.form.value.message;
    console.log('2');
    const date = new Date();
    const messageObj = {
      id: null,
      content: content,
      sender: this.sender,
      receiver: this.receiver,
      date: date
    };

    this.contactsService.postNewMsg(messageObj).subscribe(answer => {
      console.log("On post new msg: " + answer);

        this.messages.push(messageObj);


      this.form.reset();

    });
  }

  onDeleteMsg(message: Message, index: number) {
    this.contactsService.deleteMsg(message).subscribe(answer => {
      console.log(answer);
      this.messages.splice(index, 1);
    });
  }

  ngOnDestroy() {
    // this.msgsSubscription.unsubscribe();
  }

}
