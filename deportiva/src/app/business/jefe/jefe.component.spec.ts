import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JefeComponent } from './jefe.component';

describe('JefeComponent', () => {
  let component: JefeComponent;
  let fixture: ComponentFixture<JefeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, JefeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
