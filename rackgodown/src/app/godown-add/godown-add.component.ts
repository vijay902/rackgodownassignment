import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { GodownService } from '../godown.service';
import { Godown } from '../models/godown';
import { Rack } from '../models/rack';
import { RackService } from '../rack.service';

@Component({
  selector: 'app-godown-add',
  templateUrl: './godown-add.component.html',
  styleUrls: ['./godown-add.component.scss']
})
export class GodownAddComponent implements OnInit {

  godownForm;
  submitted: boolean;
  godownId: number;
  errorOnPage = false;
  addedGodown: Godown = new Godown();
  racks: Rack[];
  private sub: any;

  errorMessage = '';
  defaultExists: boolean;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private goDownservice: GodownService,
    private rackservice: RackService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.godownForm = this.formBuilder.group({
      godownCode: '',
      godownDescription: '',
      godownAddress: '',
      isgodownDefault: '',
      isgodownActive: ''
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      if (this.id) {
        this.getGodown(this.id);
        this.godownId = this.id;
        this.submitted = true;
      }
    });
  }


  getGodown(id: number) {
    this.goDownservice.getGodown(id).subscribe(data => {
      this.godownForm.controls["godownCode"].setValue(data.Code);
      this.godownForm.controls["godownDescription"].setValue(data.Description);
      this.godownForm.controls["godownAddress"].setValue(data.Address);
      this.godownForm.controls["isgodownDefault"].setValue(data.IsDefault);
      this.godownForm.controls["isgodownActive"].setValue(data.IsActive);
    });
  }

  onSubmit() {

    this.addedGodown.Code = this.godownForm.controls["godownCode"].value;
    this.addedGodown.Description = this.godownForm.controls["godownDescription"].value;
    this.addedGodown.Address = this.godownForm.controls["godownAddress"].value;
    this.addedGodown.IsDefault = this.godownForm.controls["isgodownDefault"].value;
    this.addedGodown.IsActive = this.godownForm.controls["isgodownActive"].value;

    if (this.godownId) {
      console.log("EDIT GODOWN");
      this.addedGodown.Id=this.godownId;
      this.goDownservice.editGodown(this.addedGodown);
    } else {
      console.log("ADD GODOWN");
      this.goDownservice.addGodown(this.addedGodown).subscribe(data => {
        this.godownId = data.Id;
        this.submitted = true;
      });
    }

  }

  toggle(event: MatSlideToggleChange) {

    if (event.checked) {
      this.goDownservice.checkIsDefault().subscribe(data => {
        this.defaultExists = data;

        if (this.defaultExists) {
          this.errorOnPage = true;
          this.errorMessage = "Their is a default rack in database. Please update other rack."
          this.godownForm.controls["isDefault"].setValue(false);
        }
      });

    }
  }

}
