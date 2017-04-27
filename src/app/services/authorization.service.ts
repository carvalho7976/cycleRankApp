import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import 'credenciais';

@Injectable()
export class AuthorizationService{
    http:any;
    baseUrl: String;
    
constructor(http:Http){
    this.http = http;
    this.baseUrl = 'https://www.strava.com/oauth/authorize?';
}
    
}