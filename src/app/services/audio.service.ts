/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
import { Injectable } from '@angular/core';
import { Sound } from './timer.interface';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  timerSound: Sound[] = [];
  alertSound: Sound[] = [];
  audioPlayer: HTMLAudioElement = new Audio();

  constructor() { }

  public preloadTimerSound(key: string, asset: string) {
    const audio = new Audio();
    audio.src = asset;
    this.timerSound.push({
      key: key,
      asset: asset,
    });
  }

  playTimerSound(key: string) {
    const soundToPlay = this.timerSound.find((sound) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return sound.key === key;
    });
    this.audioPlayer.src = soundToPlay.asset;
    this.audioPlayer.play();
  }

  stopTimerSound(key: string) {
    if (this.timerSound.length > 0) {
        const soundToPlay = this.timerSound.find((sound) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return sound.key === key;
      });
      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.pause();
    }
  }

  // ALERT SOUND LOOPING
  public preloadAlertSound(key: string, asset: string) {
    const audio = new Audio();
    audio.src = asset;
    this.alertSound.push({
      key: key,
      asset: asset,
    });
  }

  playAlertSound(key: string) {
    const soundToPlay = this.alertSound.find((sound) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return sound.key === key;
    });
    this.audioPlayer.src = soundToPlay.asset;
    this.audioPlayer.loop = true;
    this.audioPlayer.play();
  }

  stopAlertSound(key: string) {
    if (this.alertSound.length > 0) {
        const soundToPlay = this.alertSound.find((sound) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        return sound.key === key;
      });
      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.loop = false;
      this.audioPlayer.pause();
    }
  }
}
