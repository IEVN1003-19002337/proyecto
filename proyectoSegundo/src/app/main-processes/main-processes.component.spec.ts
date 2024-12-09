import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProcessesComponent } from './main-processes.component';

describe('MainProcessesComponent', () => {
  let component: MainProcessesComponent;
  let fixture: ComponentFixture<MainProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainProcessesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
