import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable, NextObserver} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService  {
  public _isLoginOK = false;
  private _client: string;
  private _token: string;
  private _uid: string;
  public _url: string;
  constructor(private _http: Http) { }

  public dologin(username: String, password: String)  {
    const body: string = '{"email":"' + username + '","password": "' + password + '"}';
    this._isLoginOK = false;
    const h: Headers = new Headers();
    h.append('content-type', 'application/json');

    const reqopt: RequestOptions = new RequestOptions({headers: h});

    return this._http.post(this._url + '/auth/sign_in', body, reqopt)
    .subscribe(res => this.processResponse(res.headers, res.ok));
  }

  processResponse(headers: Headers, ret: boolean): void {
    if (ret) {
      this._uid = headers.get('uid');
      this._client = headers.get('client');
      this._token = headers.get('access-token');
      this._isLoginOK = true;
    }
  }

  public prepareOptions(): RequestOptions {
    const h: Headers = new Headers();
    h.append('uid', this._uid);
    h.append('client', this._client);
    h.append('access-token', this._token);

    return new RequestOptions({headers: h});
  }

}
