import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html'
})
@IonicPage()
export class TabsPage {

  tab1Root: any = 'Talks';
  tab2Root: any = 'Favorites';

  constructor(public navCtrl: NavController) {}

}
