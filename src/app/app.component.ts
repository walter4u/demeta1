import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { timeout } from 'q';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  _isLoggedIn: boolean;
  _loggedInString: string;
  _title = 'demeta one';
  constructor(private _users: UsersService) { }

  public loggedIn() {


    if (this._users._isLoginOK) {
      this. _loggedInString = 'log in OK';
    } else {
      this. _loggedInString = 'log running....';
    }
  }
  ngOnInit() {
    this._users._url = 'https://axgro-demo-server-staging.herokuapp.com/api';
    this._users.dologin('roman@gutscher.com', '12345678')
    .subscribe(ret => {
      if (ret === 2) {
        this.loggedIn();
     } } );
   }


}
