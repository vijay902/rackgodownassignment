import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownEditComponent } from './godown-edit.component';

describe('GodownEditComponent', () => {
  let component: GodownEditComponent;
  let fixture: ComponentFixture<GodownEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GodownEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GodownEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
