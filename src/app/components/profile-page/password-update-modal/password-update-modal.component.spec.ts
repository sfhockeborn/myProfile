import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PasswordUpdateModalComponent} from './password-update-modal.component';
import {Account} from "../../../models/account";
import {DialogService} from "ng2-bootstrap-modal";
import {ProfilePageService} from "../profile-page.service";
import {FormsModule} from "@angular/forms";

describe('PasswordUpdateModalComponent', () => {
    let component: PasswordUpdateModalComponent;
    let fixture: ComponentFixture<PasswordUpdateModalComponent>;
    let close = false;
    let mockAccount = new Account();
    mockAccount._id = 'blah';

    class MockProfilePageService {
        updatePassword() {
            return Promise.resolve(mockAccount);
        }
    }

    class MockDialogService {
        removeDialog() {
            close = true;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [PasswordUpdateModalComponent],
            providers: [
                {provide: DialogService, useClass: MockDialogService}
            ]
        }).overrideComponent(PasswordUpdateModalComponent, {
            set: {
                providers: [{provide: ProfilePageService, useClass: MockProfilePageService}]
            }
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PasswordUpdateModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', fakeAsync(() => {
        component.account = mockAccount;
        component.passwords = null;
        component.confirm();
        tick();
        expect(close).toBe(true);
    }));
});
