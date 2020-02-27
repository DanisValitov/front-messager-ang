import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { LeftMenuComponent } from "./left-menu/left-menu.component";
import {  HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { ErrorInterceptor } from "./error-interceptor";
import { ErrorComponent } from './error/error.component';
import { AngularmaterialModule } from "./angular-material.module";
import { PostsModule } from "./posts/posts.module";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { BottomMenuComponent } from "./bottom-menu/bottom-menu.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatComponent } from "./contacts/chat/chat.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AllUsersComponent } from "./admin/all-users/all-users.component";
import { UserEditComponent } from "./admin/user-edit/user-edit.component";




@NgModule({
  declarations: [
    AppComponent,
    AllUsersComponent,
    HeaderComponent,
    LeftMenuComponent,
    BottomMenuComponent,
    ErrorComponent,
    ContactsComponent,
    ChatComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PostsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    AngularmaterialModule,
    InfiniteScrollModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, UserEditComponent]
})
export class AppModule {}
