import { Storage } from '@ionic/storage';
import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlertController, ModalController, Platform, RouterCustomEvent, ToastController } from '@ionic/angular';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TagsDataPage } from 'src/app/modals/tags-data/tags-data.page';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-write-master',
  templateUrl: './write-master.page.html',
  styleUrls: ['./write-master.page.scss'],
})
export class WriteMasterPage implements OnInit {
  url = environment.url;
  techID: any;
  deviceData: any;
  config: any;
  flags: any;
  readerMode: any;
  message: any;
  msg: any;

  tagid: any;
  tagdesc: any;
  payload: any;
  listener: any;
  tag: any = {};
  writeDate: any;
  sites: any;

  state: any;
  pageTitle: any;

  public siteID: any;
  public certID: any;
  public deviceNumber: any;
  public deviceType: any;
  public tagMessage: any;
  public tagZone: any;
  public tagDate: any;
  public serviceID: any;
  public serviceTypeID: any;
  public tagNumber: any;
  public audioSound: any;

  showDevice = false;
  readingTag = false;
  writingTag = false;
  isWriting = false;
  audio: any;
  songs: any;
  panels: any;
  showPanel: boolean;
  subscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private http: HttpClient,
    private platform: Platform,
    public  nfc: NFC,
    public  ndef: Ndef,
    private storage: Storage,
    private alertController: AlertController,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController,
    private zone: NgZone,
    private activatedRoute: ActivatedRoute,
    private audioService: AudioService
  ) {
    this.showPanel = false;
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.techID = user?.id;
      this.writeDate = moment().format('YYYY-MM-DD');
      this.tag.writeTime = this.writeDate;
      console.log(this.writeDate);
      this.http.get(this.url + 'get-sites.php').subscribe((res: any) => {
        console.log(res);
        this.sites = res;
      });
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.pageTitle = 'WRITING TO RFID';
    this.writingTag = true;
  }

//WRITE TO TAG
writeTag() {
  console.log(this.tag);
  this.platform.ready().then(() => {
    this.writingTag = true;
    this.listener = this.nfc.addNdefListener((res: any) => {
      console.log('Listener is Active: ' + res);
    }, (error) => {
      console.log(error);
      this.presentToast(error);
    }).subscribe(() => {
      console.log('Ready for Writing');
      const siteID = this.ndef.textRecord(this.tag.siteID);
      const tagNumber = this.ndef.textRecord(this.tag.tagNumber);
      const deviceNumber = this.ndef.textRecord(this.tag.deviceNumber);
      const deviceType = this.ndef.textRecord(this.tag.deviceType);
      const message = this.ndef.textRecord(this.tag.deviceMessage);
      const zone = this.ndef.textRecord(this.tag.zone);
      const date = this.ndef.textRecord(this.tag.writeTime);
      const serviceID = this.ndef.textRecord('');
      const serviceTypeID = this.ndef.textRecord('');

      this.nfc.write([siteID,tagNumber, deviceNumber,deviceType,zone,message,date,serviceID,serviceTypeID]).then(success => {
        console.log('Writing Complete: ' + success);
        if (success === 'OK') {
          this.http.post(this.url + 'post-master.php', this.tag).subscribe((res: any) => {
            console.log(res);
          });
          this.presentToast('Successfully written to RFID Chip!');
          this.listener.unsubscribe();
          this.zone.run(() => {
            this.tag = '';
            this.router.navigate(['/technician-menu/technician-dashboard']);
          });
        }
      }).catch(error => {
          console.log(error);
          this.presentToast(error);
        });
    }, err => {
      this.presentToast(err);
      console.log('Subscribe: ' + err);
    });
  });
}

async presentAlert(msg) {
  const alert = await this.alertController.create({
    header: 'RFID RESPONSE',
    message: msg,
    buttons: [
      {
        text: 'Dismiss',
        handler: () => {
          this.audioService.stopAlertSound('alert');
        }
      }
    ]
  });
  // PLAY THE SOUND
  this.audioService.playAlertSound('alert');
  await alert.present();
}

async presentToast(msg) {
  const toast = await this.toastController.create({
    message: msg,
    duration: 3000
  });
  toast.present();
}

  ionViewWillLeave() {
      if (this.state === 'write') {
        console.log('Leaving Writing State');
        this.listener.unsubscribe();
      }
      if (this.state === 'read') {
        this.readerMode.unsubscribe();
        console.log('Leaving Reading State');
      }
  }

  getPanelsData(ev) {
    console.log(ev.detail);
    const siteID = ev.detail.value;
    if (siteID) {
      this.showPanel = true;
    }
    this.http.get(this.url + 'get-site-panels-list.php?siteID=' + siteID).subscribe((data: any) => {
      console.log(data);
      this.panels = data;
    });
  }

  ionViewDidLeave(){
    this.audioService.stopAlertSound('alert');
  }

}
