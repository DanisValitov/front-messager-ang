import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  form: FormGroup;
  isChecked = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, i: number, uuid: string},
    private adminService: AdminService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'message' : new FormControl(null, {
        validators: [Validators.email, Validators.required]
      })
    });
  }

  onCheck(){
    this.adminService.doCheck(this.form.value.message).subscribe(message => {
      message.message === 'true' ? this.isChecked = true : this.isChecked = false;
    });
  }

  onUpdate() {
    this.adminService.doUpdate(this.data.uuid, this.form.value.message).subscribe(message => {
      console.log(message.message);
    });
  }

}
