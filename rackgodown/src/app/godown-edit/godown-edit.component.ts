import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-godown-edit',
  templateUrl: './godown-edit.component.html',
  styleUrls: ['./godown-edit.component.scss']
})
export class GodownEditComponent implements OnInit {

  @Input() marks:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
