import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../core/services/auth.service';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SidebarComponent], // RouterTestingModule agregado
      providers: [AuthService],
    }).compileComponents();
  });

  it('should create the SidebarComponent', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
