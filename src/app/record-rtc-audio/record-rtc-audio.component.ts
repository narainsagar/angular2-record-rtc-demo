import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
let RecordRTC = require('recordrtc/RecordRTC.min');

@Component({
  selector: 'record-rtc-audio',
  templateUrl: './record-rtc-audio.component.html',
  styleUrls: ['./record-rtc-audio.component.scss']
})
export class RecordRTCAudioComponent implements AfterViewInit{

  private stream: MediaStream;
  private recordRTC: any;

  @ViewChild('audio') audio;

  constructor() {
    // Do stuff
  }

  ngAfterViewInit() {
    // set the initial state of the video
    let audio: HTMLAudioElement = this.audio.nativeElement;
    audio.muted = false;
    audio.controls = true;
    audio.autoplay = false;
  }

  toggleControls() {
    let audio: HTMLAudioElement = this.audio.nativeElement;
    audio.muted = !audio.muted;
    audio.controls = !audio.controls;
    audio.autoplay = !audio.autoplay;
  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'audio/wav', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      // audioBitsPerSecond: 128000,
      // videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let audio: HTMLAudioElement = this.audio.nativeElement;
    audio.src = window.URL.createObjectURL(stream);
    this.toggleControls();
  }

  errorCallback(err) {
    console.log('ERR:', err);
    // handle error here
  }

  // processVideo(audioVideoWebMURL) {
  //   let video: HTMLVideoElement = this.video.nativeElement;
  //   let recordRTC = this.recordRTC;
  //   video.src = audioVideoWebMURL;
  //   this.toggleControls();
  //   var recordedBlob = recordRTC.getBlob();
  //   recordRTC.getDataURL(function (dataURL) { });
  // }

  startRecording() {
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(/*this.processVideo.bind(this)*/);
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    // stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('audio.wav');
  }
}
