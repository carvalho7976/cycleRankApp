import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Credenciais} from './credenciais';
import {Location} from '@angular/common';


    @Injectable()
export class AuthorizationService{
    token: any;
    code: any;
    baseUrl: String;
    user_id: any;
    user_secret: any;
    cred: Credenciais;
    authUrl: any;
    usuario: any;
    
constructor(credenciais: Credenciais, public http: Http, loc?: Location){
    
if(localStorage.getItem("usuario") == null){
    this.cred = credenciais;
    this.baseUrl = "https://www.strava.com/oauth/authorize?";
    this.user_id = this.cred.getClient_id();
    this.user_secret = this.cred.getClient_secret();
     
    var code = this.getURLParameter('code');
    if (code != null && code != undefined && code != '' && this.token == undefined || this.token == null) {
            this.code = code;
            this.getToken(code);
            console.log('saving token.......');
            loc.go('/');
        
    } else if (this.token) {
            console.log('found token: ', this.token);
    }
   
 }
   
}

public getToken(code){
    let headers = new Headers();    
    let body = {
    client_id: this.user_id,
    client_secret: this.user_secret,
    code: code,
    }    
    headers.append('Content-type', 'application/json');
    
    this.http.post("https://www.strava.com/oauth/token", JSON.stringify(body), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
            this.token = data.access_token;
            console.log(this.token);
            localStorage.setItem("usuario", data);
           
        });
    
}
    
public login(){     
  this.authUrl =   this.baseUrl + "client_id=" + this.user_id + "&response_type=code" + "&redirect_uri=http://localhost:8100";    
   window.open(this.authUrl, '_self');
}
   
    
parseToken() {
        this.token = {
            created: new Date().getTime()
        }
        var parmStr = location.hash.substring(1); // strip leading hash
        var parms = parmStr.split('&');
        for (var i in parms) {
            var kv = parms[i].split('=');
            this.token[kv[0]] = kv[1];
        }
}
    
public getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
    
}