import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Rack } from '../models/rack';
import { RackService } from '../rack.service';



@Component({
  selector: 'app-rack-add',
  templateUrl: './rack-add.component.html',
  styleUrls: ['./rack-add.component.scss']
})
export class RackAddComponent implements OnInit {
  @Input() godownId: number;
  rackForm;
  submitted: boolean;
  addedRack: Rack = new Rack();
  errorOnPage = false;
  errorMessage = '';
  defaultExists: boolean;
  racks: Rack[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private rackservice: RackService,
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

    if (this.godownId) {
      this.getRackData();
    }
  }

  onSubmit() {


    this.addedRack.Code = this.rackForm.controls["rackCode"].value;
    this.addedRack.Description = this.rackForm.controls["rackDescription"].value;
    this.addedRack.Capacity = this.rackForm.controls["rackCapacity"].value;
    this.addedRack.IsDefault = this.rackForm.controls["isDefault"].value;
    this.addedRack.IsActive = this.rackForm.controls["isActive"].value;
    this.addedRack.GoDownId = this.godownId;

    this.rackservice.addRack(this.addedRack).subscribe((rack: Rack) => {
      this.racks.push(rack);
      // this is to refresh the mat table 
      this.racks = [...this.racks];
      this.rackForm.reset();
    });
  }

  getRackData() {
    this.rackservice.getRacks(this.godownId).subscribe((racks: Rack[]) => {
      this.racks = racks;
    });
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
