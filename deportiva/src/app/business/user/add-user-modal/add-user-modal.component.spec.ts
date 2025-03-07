import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUserModalComponent } from './add-user-modal.component';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AddUserModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: NotificationService, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
