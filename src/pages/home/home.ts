import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {AuthorizationService} from '../../app/services/authorization.service';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
autho: AuthorizationService;
usuario: any;
   
constructor(public navCtrl: NavController, private platform: Platform, public auth: AuthorizationService) { 

}
public login() {
    this.autho.login();
    console.log("usuario: ");
    console.log(localStorage.getItem("usuario"));
}
public isLogado(){
    if(localStorage.getItem("usuario") != null){
        return true;
    }else{
        return false;
    }
    
}
    
 
public stravaLogin() {
 
}

}
