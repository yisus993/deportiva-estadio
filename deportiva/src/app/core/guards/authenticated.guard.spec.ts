import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticatedGuard } from './authenticated.guard';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthenticatedGuard', () => {
  let guard: typeof AuthenticatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    });
    guard = AuthenticatedGuard;
  });

  it('should be created', () => {
    expect(guard).toBeDefined();
  });
});
