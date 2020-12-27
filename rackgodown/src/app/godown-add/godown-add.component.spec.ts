import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownAddComponent } from './godown-add.component';

describe('GodownAddComponent', () => {
  let component: GodownAddComponent;
  let fixture: ComponentFixture<GodownAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodownAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GodownAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
