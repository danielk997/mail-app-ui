import {Component, OnInit} from '@angular/core';
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {MatDialog} from "@angular/material/dialog";
import {ActionBarOptions} from "../../../shared/components/action-bar/models/action-bar-options";
import {actionBarCreateButton} from "../../../shared/components/action-bar/helpers";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'mail-app-ui-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  message!: string;
  options!: ActionBarOptions;

  constructor(
    private _fb: FormFieldBuilder,
    private _matDialog: MatDialog,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.initOptions();
  }

  private initOptions() {
    this.options = {
      buttons: [
        actionBarCreateButton(() => {
          this._router.navigate(['add'], {relativeTo: this._route})
        })
      ]
    }
  }
}
