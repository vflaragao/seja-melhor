import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-mark',
  templateUrl: './empty-mark.component.html',
  styleUrls: ['./empty-mark.component.scss']
})
export class EmptyMarkComponent implements OnInit {

  @Input()
  private title: string;
  @Input()
  private description: string;
  @Input()
  private actionLabel: string;

  @Output()
  private action: EventEmitter<void>;

  constructor() { }

  ngOnInit() {
  }

  onAction() {
    this.action.emit();
  }
}
