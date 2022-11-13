import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RouteSegment} from "../../../shared/routes/routeSegment";

@Component({
  selector: 'mail-app-ui-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {

  Routes = RouteSegment;

  constructor(
    private _router: Router
  ) {
  }

  ngOnInit(): void {
  }

  navigate(url: string) {
    this._router.navigate([url]);
  }
}
