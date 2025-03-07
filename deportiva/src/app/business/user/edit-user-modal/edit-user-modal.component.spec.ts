import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserModalComponent } from './edit-user-modal.component';
import { UserService } from '../../../core/services/user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';

describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let fixture: ComponentFixture<EditUserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, EditUserModalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: UserService, useValue: {} },
        { provide: NotificationService, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
