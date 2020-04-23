import {Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';
import {fromEvent} from 'rxjs';
import {auditTime} from 'rxjs/operators';

declare const MediaElementPlayer: any;

@Component({
  selector: 't4e-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnChanges {

  @Input() videoUrl: string;
  @Input() videoPoster: string;

  @ViewChild('mediaPlayerElement') mediaPlayerElement: ElementRef;

  mediaPlayer: any;

  width: number = 1054;
  height: number = this.width / 1.77;

  constructor(
    public mediaObserver: MediaObserver,
    private renderer: Renderer2
  ) {
    mediaObserver.media$.subscribe(el => {
      this.width = Number(el.mediaQuery.split('max-width:')[1].split('px)')[0]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.videoUrl) {
      setTimeout(() => {
        this.loader();
      }, 0);
    }
  }

  loader() {
    this.loadMediaPlayer();
    fromEvent(window, 'resize')
      .pipe(auditTime(100))
      .subscribe((event: any) => {
        this.width = event['target'].innerWidth;
        this.height = event['target'].innerHeight;
        this.renderer.setAttribute(this.mediaPlayerElement.nativeElement, 'width', this.width.toString());
        this.renderer.setAttribute(this.mediaPlayerElement.nativeElement, 'height', (this.width / 1.77).toString());
      });
  }

  loadMediaPlayer() {
    this.mediaPlayer = new MediaElementPlayer(
      this.mediaPlayerElement.nativeElement, {
        autoSize: true,
        features: ['playpause', 'current', 'progress', 'duration', 'volume', 'fullscreen', 'airplay', 'chromecast']
      }
    );
    this.mediaPlayer.setSrc(this.videoUrl);
    this.mediaPlayer.load();
    // const video = this.mediaPlayerElement.nativeElement;
    // setTimeout(() => {}, 300);
  }

}
