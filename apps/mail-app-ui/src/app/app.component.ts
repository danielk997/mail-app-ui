import {Component, OnInit} from '@angular/core';
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'mail-app-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private _notifierService: NotifierService,
  ) {
  }

  ngOnInit() {
    this.configureNotifier();
  }

  private configureNotifier() {
    this._notifierService.getConfig().position = {
      horizontal: {
        position: 'right',
        distance: 10
      },
      vertical: {
        position: 'top',
        distance: 10,
        gap: 10
      }
    }
  }
}
