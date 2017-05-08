import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Talks page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-talks',
  templateUrl: 'talks.html',
})
export class Talks {

  monday = [
        {
            "title": "Portal do Investigador",
            "authors": ["António Rosado", "João Fernandes"],
            "start": "10h 05",
            "duration": "1h",
            "tags": ["web", "wordpress", "database"]
        },
        {
            "title": "Monitorização Automática",
            "authors": ["André Carvalho, José Rodrigues"],
            "start": "11h 25",
            "duration": "1h 30",
            "tags": ["Câmara RGBD", "SIMON", "Artificial Intelligence"]
        },
        {
            "title": "Indexação e Pesquisa de Documentos ",
            "authors": ["Bruno Dias"],
            "start": "13h 10",
            "duration": "1h",
            "tags": ["OCR", "OutSystems"]
        }
    ];

    tuesday = [
        {
            "title": "Seguimento de Eventos",
            "authors": ["João Barreiros"],
            "start": "14h 30",
            "duration": "1h",
            "tags": ["Ionic", "Angular", "Node.js", "Django", "Mobile"]
        },
        {
            "title": "Trela Invisivel",
            "authors": ["Inês Leandro"],
            "start": "15h 45",
            "duration": "2h",
            "tags": ["Artificial Intelligence", "Fisical Computation", "GPS"]
        }
    ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Talks');
  }

  goToTalk() {
    this.navCtrl.push("Talk")
  }

}
