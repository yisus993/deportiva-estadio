import { TestBed } from '@angular/core/testing';
import { UsersComponent } from './user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationService } from '../../core/services/notification.service';
import { UserService } from '../../core/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsersComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Para las llamadas HTTP
        MatDialogModule,         // Para los modales
        RouterTestingModule,     // Para la navegación
        UsersComponent           // Agregado como standalone en imports
      ],
      providers: [
        UserService,             // Servicio para manejar usuarios
        NotificationService      // Servicio para manejar notificaciones
      ]
    }).compileComponents();
  });

  it('should create the UsersComponent', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const fixture = TestBed.createComponent(UsersComponent);
    const component = fixture.componentInstance;
    const userService = TestBed.inject(UserService);

    spyOn(userService, 'getUsers').and.callThrough(); // Espía el método getUsers
    fixture.detectChanges();
    expect(userService.getUsers).toHaveBeenCalled();
  });
});
