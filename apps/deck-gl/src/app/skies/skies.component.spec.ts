import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkiesComponent } from './skies.component';

describe('SkiesComponent', () => {
  let component: SkiesComponent;
  let fixture: ComponentFixture<SkiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkiesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
