import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth/auth.guard";
import { ContactsComponent } from "./contacts/contacts.component";
import { ChatComponent } from "./contacts/chat/chat.component";

import { AllUsersComponent } from "./admin/all-users/all-users.component";
import { AdminGuard } from "./admin/admin.guard";

// const routes: Routes = [
//   {path : '', component: PostListComponent, canActivate: [AuthGuard]},
//   {path : 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
//   {path : 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
//   {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
//   {path: 'profile', loadChildren: './profile/profile.module#ProfileModule',  canActivate: [AuthGuard]}
// ];

const routes: Routes = [
  {path : '', component: ContactsComponent, canActivate: [AuthGuard]},
  {path : 'chat/:userId/:contactId', component: ChatComponent, canActivate: [AuthGuard]},
  {path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  {path : 'admin/all-users', component: AllUsersComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule {

}
