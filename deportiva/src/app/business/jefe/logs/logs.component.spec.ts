import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogsComponent } from './logs.component';
import { LogService } from '../../../core/services/log.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogsComponent', () => {
  let component: LogsComponent;
  let fixture: ComponentFixture<LogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, LogsComponent],
      providers: [LogService]
    }).compileComponents();

    fixture = TestBed.createComponent(LogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
