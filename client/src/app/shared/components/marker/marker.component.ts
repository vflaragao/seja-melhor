import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})
export class MarkerComponent implements OnInit {

  @Input()
  public name: string;
  @Input()
  public color: string;
  @Input()
  public backgroundColor: string;

  constructor() { }

  ngOnInit() {
  }

}
