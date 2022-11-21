import {Component, Input, OnInit} from '@angular/core';
import {ActionBarOptions} from "./models/action-bar-options";

@Component({
  selector: 'mail-app-ui-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
})
export class ActionBarComponent implements OnInit {

  @Input() selectedItems: unknown[] = [];
  @Input() options!: ActionBarOptions;

  constructor() {}

  ngOnInit(): void {}
}
