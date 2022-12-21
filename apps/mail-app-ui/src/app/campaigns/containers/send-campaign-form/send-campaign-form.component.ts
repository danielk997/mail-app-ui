import {Component, OnInit} from '@angular/core';
import {FormBaseOptions, FormBaseType} from "../../../shared/components/form-base/form-base.component";
import {FormFieldBuilder} from "../../../shared/components/form-base/form-field-builder";
import {MatDialog} from "@angular/material/dialog";
import {
  CampaignControllerService,
  GroupControllerService,
  SentCampaignControllerService,
  TemplateControllerService
} from "../../../shared/open-api";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'mail-app-ui-send-campaign-form',
  templateUrl: './send-campaign-form.component.html',
  styleUrls: ['./send-campaign-form.component.scss'],
})
export class SendCampaignFormComponent implements OnInit {
  options!: FormBaseOptions;
  message!: string;

  constructor(
    private _fb: FormFieldBuilder,
    private _matDialog: MatDialog,
    private _campaignService: CampaignControllerService,
    private _templateService: TemplateControllerService,
    private _groupService: GroupControllerService,
    private _sendCampaignService: SentCampaignControllerService
  ) {
  }


  ngOnInit(): void {
    this.initOptions();
  }

  private initOptions() {
    this.options = {
      type: FormBaseType.CREATE,
      name: 'Send Campaign',
      formFields: this._fb.fields({
        campaignId: this._fb.dropdown({
          params: {
            label: 'Campaign',
            options: {
              data: this._campaignService.getAll2(),
              displayProp: 'name',
              valueProp: 'id'
            }
          }
        }),
        templateId: this._fb.dropdown({
          params: {
            label: 'Template',
            options: {
              data: this._templateService.getTemplates(),
              displayProp: 'name',
              valueProp: 'id'
            }
          }
        }),
        receiversGroupId: this._fb.dropdown({
          params: {
            label: 'Group',
            options: {
              data: this._groupService.getAllGroups(),
              displayProp: 'name',
              valueProp: 'id'
            }
          }
        }),
      }),
      onSubmit: (form: FormGroup) => {
        this._sendCampaignService.addSentCampaign(form.value).subscribe(it => {
          console.log(it);
        });
      }
    }
  }
}
