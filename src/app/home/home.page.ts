// @ts-nocheck
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
// import { SNSMobileSDK } from '@sumsub/cordova-idensic-mobile-sdk-plugin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage {
  constructor() {
    this.neverCalledEver()
  }

  /**
   * This is a method that is never called in this project */
  neverCalledEver() {

    let accessToken = 'your-access-token';

    console.log('************************');
    console.log(accessToken);
    console.log('************************');

    let snsMobileSDK = SNSMobileSDK.init(accessToken, () => {
        // this is a token expiration handler. It will be called if the provided token is invalid or got expired
        // call your backend to fetch a new access token (this is just an example)
        return new Promise((resolve, reject) => {
            resolve('new_access_token')
        })
      })
      .withHandlers({ // Optional callbacks you can use to get notified of the corresponding events
        onStatusChanged: (event) => {
          console.log("onStatusChanged: [" + event.prevStatus + "] => [" + event.newStatus + "]");
        }
      })
      .withDebug(true)
      .withLocale('es') // Optional, for cases when you need to override the system locale
      .build();

    snsMobileSDK.launch().then(result => {
      console.log('************************');
      console.log("Sumsub SDK State: " + JSON.stringify(result))
      console.log('************************');
    }).catch(err => {
      console.log('************************');
      console.log("Sumsub SDK Error: " + JSON.stringify(err))
      console.log('************************');

    });
    // 👇🏾 but this code still manages to crash the home page somehow.
    // let snsMobileSDK = window.SNSMobileSDK.init();
    // SNSMobileSDK.init();
    // I have removed all the other arguments that go into the init() function to simplify the problem.
    // Adding all the arguments and configs makes no difference. It still crashes.
  }
}
