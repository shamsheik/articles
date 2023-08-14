import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

class MockRouter {
  public navigationSubject = new Subject<RouterEvent>();
  public events: Observable<RouterEvent> = this.navigationSubject.asObservable();
}
const mockRouter = new MockRouter();
const navigationSubject = mockRouter.navigationSubject;
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authServiceMock: AuthService;
  let router: Router;

  beforeEach(async () => {
    authServiceMock = {
      getToken: () => 'fake-token',
      token: null,
      role: '',
      setToken: jest.fn(),
      setRole: jest.fn(),
      getRole: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the app', fakeAsync(() => {
    expect(component).toBeTruthy();
  }));

  it('should update isAuthenticated based on navigation events', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    expect(component.isAuthenticated).toBe(true);
  }));
  it('should set isAuthenticated to true when token exists', fakeAsync(() => {
    jest.spyOn(authServiceMock,'getToken').mockReturnValue(null);
    fixture.detectChanges();
    
    const navigationEndEvent = new NavigationEnd(0, '', '');
    navigationSubject.next(navigationEndEvent);
    tick();
    
    expect(component.isAuthenticated).toBe(false);

  }));
});
