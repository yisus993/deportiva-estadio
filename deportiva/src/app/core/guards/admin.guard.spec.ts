import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authServiceStub: Partial<AuthService>;
  let routerStub: Partial<Router>;

  beforeEach(() => {
    authServiceStub = {
      getCurrentUser: () => ({ id: '1', username: 'admin', role: 'Admin' })
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for an admin user', () => {
    expect(guard.canActivate({} as any, {} as any)).toBe(true);
  });

  it('should navigate to root for a non-admin user', () => {
    authServiceStub.getCurrentUser = () => ({ id: '2', username: 'user', role: 'User' });
    expect(guard.canActivate({} as any, {} as any)).toBe(false);
    expect(routerStub.navigate).toHaveBeenCalledWith(['/']);
  });
});
