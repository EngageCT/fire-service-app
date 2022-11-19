import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-clients-signature',
  templateUrl: './clients-signature.page.html',
  styleUrls: ['./clients-signature.page.scss'],
})
export class ClientsSignaturePage implements  OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;
  ref;
  constructor(
    private elementRef: ElementRef,
    private modalController: ModalController,
    private toastController: ToastController
  ) {

  }

  ngOnInit(): void {
    console.log(this.ref);
  }

  public ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(56,128,255)';
  }

  init() {
    const canvas: any = this.elementRef.nativeElement.querySelector('canvas');
    canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight - 140;
    canvas.height = window.innerHeight - 60;
    if (this.signaturePad) {
      this.signaturePad.clear(); // Clear the pad on init
    }
  }

  save(): void {
    const signature = this.signaturePad.toDataURL();
    this.modalController.dismiss({clientSignature: signature});
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
