import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { Rack } from '../models/rack';
import { RackService } from '../rack.service';

@Component({
  selector: 'app-rack-edit',
  templateUrl: './rack-edit.component.html',
  styleUrls: ['./rack-edit.component.scss']
})
export class RackEditComponent implements OnInit {

  id: number;
  private sub: any;
  rackForm;
  existingRack: Rack = new Rack();
  defaultExists: boolean;
  errorOnPage: boolean;
  errorMessage: string;


  constructor(private route: ActivatedRoute,
    private rackservice: RackService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.rackForm = this.formBuilder.group({
      rackCode: '',
      rackDescription: '',
      rackCapacity: '',
      isDefault: '',
      isActive: ''
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      this.getRack(this.id);
    });
  }

  getRack(id: number) {
    this.rackservice.getRack(id).subscribe(data => {
      this.rackForm.controls["rackCode"].setValue(data.Code);
      this.rackForm.controls["rackDescription"].setValue(data.Description);
      this.rackForm.controls["rackCapacity"].setValue(data.Capacity);
      this.rackForm.controls["isDefault"].setValue(data.IsDefault);
      this.rackForm.controls["isActive"].setValue(data.IsActive);
    });

  }

  onSubmit() {
    this.existingRack.Id = this.id;
    this.existingRack.Code = this.rackForm.controls["rackCode"].value;
    this.existingRack.Description = this.rackForm.controls["rackDescription"].value;
    this.existingRack.Capacity = this.rackForm.controls["rackCapacity"].value;
    this.existingRack.IsDefault = this.rackForm.controls["isDefault"].value;
    this.existingRack.IsActive = this.rackForm.controls["isActive"].value;

    this.rackservice.editRack(this.existingRack);

    this.router.navigate(['/rack-list']);
  }

  toggle(event: MatSlideToggleChange) {

    if (event.checked) {
      this.rackservice.checkIsDefault().subscribe(data => {
        this.defaultExists = data;

        if (this.defaultExists) {
          this.errorOnPage = true;
          this.errorMessage = "Their is a default rack in database. Please update other rack."
          this.rackForm.controls["isDefault"].setValue(false);
        }
      });

    }
  }
}
