import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsssComponent } from './produitsss.component';

describe('ProduitsssComponent', () => {
  let component: ProduitsssComponent;
  let fixture: ComponentFixture<ProduitsssComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitsssComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitsssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
