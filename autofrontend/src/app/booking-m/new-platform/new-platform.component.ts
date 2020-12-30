import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../services/Auth/auth.service';
import {NewPlatform} from './NewPlatform';
import {HttpClient} from '@angular/common/http';

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
               private auth: AuthService,
               private http: HttpClient) {
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
    console.log((this.newPlatformModel));
    this.loading = true;
    this.http.post(`http://localhost:5000/new_platform`, {
        autoBookUID: this.newPlatformModel.autoBookUID,
        username: this.newPlatformModel.username,
        password: this.newPlatformModel.password,
        platformID: this.newPlatformModel.platformID
      }).subscribe(x => {
        console.log(x);
        // @ts-ignore
        if (x.login_status === 'True') {
          window.alert(`Successfully connected with ${this.data.platformName}`);
          this.dialogRef.close({successful: true});
        }
        else { // @ts-ignore
          if (x.login_status === 'False') {
                    window.alert(`Could not connect with ${this.data.platformName}. You might wanna check your id and password again`);
                  }
        }
        this.loading = false;
        this.dialogRef.close({successful: false});
    },
      y => {
        console.log(y);
        window.alert('Interval server error. Contact us or try again later');
        this.loading = false;
        this.dialogRef.close({successful: false});
      });
  }
}
