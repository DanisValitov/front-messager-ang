import { NgModule } from "@angular/core";
import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularmaterialModule } from "../angular-material.module";
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material";
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations:[
    PostCreateComponent,
    PostListComponent,

  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    AngularmaterialModule,
    RouterModule

  ],
  exports: [

  ]
})
export class PostsModule {

}
