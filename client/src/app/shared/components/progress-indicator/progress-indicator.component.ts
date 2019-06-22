import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-indicator',
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {

  @Input()
  public symbol = 'star';
  @Input()
  public color: string;
  @Input()
  public progress: number | string;

  constructor() { }

  ngOnInit() {
  }

  get percentProgress() {
    return typeof this.progress === 'number'
      ? `${this.progress}%`
      : this.progress;
  }
}
