import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../services/Auth/auth.service';
import {NewPlatform} from './NewPlatform';

// tslint:disable-next-line:class-name
interface platformDetails {
  platformName: string;
  platformID: string;
}

@Component({
  selector: 'app-new-platform',
  templateUrl: './new-platform.component.html',
  styleUrls: ['./new-platform.component.scss']
})
export class NewPlatformComponent implements OnInit {

  newPlatformModel: NewPlatform;
  loading = false;

  constructor( public dialogRef: MatDialogRef<NewPlatformComponent>,
               @Inject(MAT_DIALOG_DATA) public data: platformDetails,
               private auth: AuthService) {
    this.newPlatformModel = new NewPlatform(data.platformID, '', '', '');
    this.auth.user$.subscribe(
      (user) => {
        if (user) {
          this.newPlatformModel.autoBookUID = user.uid;
        }
      }
    );
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onNoClick() {
    this.dialogRef.close();
  }

  // tslint:disable-next-line:typedef
  connectNewPlatform() {
    console.log(JSON.stringify(this.newPlatformModel));
    this.loading = true;
  }
}
