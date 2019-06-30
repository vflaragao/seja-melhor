import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-contribution',
  templateUrl: './user-contribution.component.html',
  styleUrls: ['./user-contribution.component.scss']
})
export class UserContributionComponent implements OnInit {

  @Input()
  private label: string = 'teste';
  @Input()
  private value: string = '1';
  @Input()
  private icon: string = 'star';

  constructor() { }

  ngOnInit() {
  }

}
