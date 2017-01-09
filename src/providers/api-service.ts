import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

const API_HOST: string = "http://xyt.deyiwifi.com/api/v1";
const API_KEY:  string = "efd12eada3aa4976994546572c235cd8";

@Injectable()
export class ApiService {

  constructor(public http: Http) {
    // console.log(Base64);
    console.log(this.generateAccessKey('efd12eada3aa4976994546572c235cd81483930567'));

  }

  // 处理POST请求
  get(uri, params) {
    let url = API_HOST + '/' + uri;

    let i = new Date().getTime();
    // console.log(this.generateAccessKey(i));

    let searchParams = new URLSearchParams();
    searchParams.set('i', i.toString());
    searchParams.set('ak', this.generateAccessKey(i));

    for (let param in params) {
      searchParams.set(param, params[param]);
    }

    return this.http.get(url, new RequestOptions({ search: searchParams }))
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
      // .map(this.handleSuccess)
      // .catch(this.handleError);
  }

  // 处理POST请求
  post(uri, params) {
    let url = API_HOST + '/' + uri;

    let i = new Date().getTime();
    let ak = this.generateAccessKey(i);

    params.i = i;
    params.ak = ak;

    console.log(params);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify(params), reqOptions)
        .toPromise()
        .then(this.handleSuccess)
        .catch(this.handleError);
      // .map(this.handleSuccess)
      // .catch(this.handleError);
  }

  private generateAccessKey(i): string {
    let base64 = new Base64();
    return base64.encode(API_KEY + i.toString());//Md5.hashStr(API_KEY + i.toString(), false).toString();
  }

  private handleSuccess(res: Response) {
    let body = res.json();
    if (body.code == 0) {
      return body.data || {};
    } else {
      return Promise.reject(body.message);
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  } 

}

class Base64 {
  private PADCHAR: string = '=';
  private ALPHA: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  private getByte(s: string, i: number): number {
    const x = s.charCodeAt(i);
    return x;
  }

  private getByte64(s: string, i: number): number {
    const idx = this.ALPHA.indexOf(s.charAt(i));
    return idx;
  }

  public decode (s: string): string {
    let pads = 0,
      i, b10, imax = s.length,
      x = [];

    s = String(s);

    if (imax === 0) {
      return s;
    }

    if (s.charAt(imax - 1) === this.PADCHAR) {
      pads = 1;
      if (s.charAt(imax - 2) === this.PADCHAR) {
        pads = 2;
      }
      imax -= 4;
    }

    for (i = 0; i < imax; i += 4) {
      b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12) | (this.getByte64(s, i + 2) << 6) | this.getByte64(s, i + 3);
      x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255));
    }

    switch (pads) {
      case 1:
        b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12) | (this.getByte64(s, i + 2) << 6);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
        break;
      case 2:
        b10 = (this.getByte64(s, i) << 18) | (this.getByte64(s, i + 1) << 12);
        x.push(String.fromCharCode(b10 >> 16));
        break;
    }

    return x.join('');
  }

  public encode(s: string): string {
    s = String(s);

    let i, b10, x = [],
      imax = s.length - s.length % 3;

    if (s.length === 0) {
      return s;
    }

    for (i = 0; i < imax; i += 3) {
      b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8) | this.getByte(s, i + 2);
      x.push(this.ALPHA.charAt(b10 >> 18));
      x.push(this.ALPHA.charAt((b10 >> 12) & 63));
      x.push(this.ALPHA.charAt((b10 >> 6) & 63));
      x.push(this.ALPHA.charAt(b10 & 63));
    }

    switch (s.length - imax) {
      case 1:
        b10 = this.getByte(s, i) << 16;
        x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 63) + this.PADCHAR + this.PADCHAR);
        break;
      case 2:
        b10 = (this.getByte(s, i) << 16) | (this.getByte(s, i + 1) << 8);
        x.push(this.ALPHA.charAt(b10 >> 18) + this.ALPHA.charAt((b10 >> 12) & 63) + this.ALPHA.charAt((b10 >> 6) & 63) + this.PADCHAR);
        break;
    }

    return x.join('');
  }
}
