import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PutTgIdComponent } from './put-tg-id.component';

describe('PutTgIdComponent', () => {
  let component: PutTgIdComponent;
  let fixture: ComponentFixture<PutTgIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PutTgIdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PutTgIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
