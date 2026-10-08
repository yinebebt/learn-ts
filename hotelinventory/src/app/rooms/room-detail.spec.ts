import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../app.routes';
import { RoomDetail } from './room-detail';
import { ROOMS_LOAD_DELAY, RoomsService } from './rooms.service';

describe('RoomDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetail],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        { provide: ROOMS_LOAD_DELAY, useValue: 0 },
      ],
    }).compileComponents();
  });

  it('shows room for a valid id', async () => {
    const fixture = TestBed.createComponent(RoomDetail);
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(title.textContent).toContain('Garden Twin');
  });

  it('shows not found for unknown id', async () => {
    const fixture = TestBed.createComponent(RoomDetail);
    fixture.componentRef.setInput('id', '999');
    await fixture.whenStable();

    const title = fixture.nativeElement.querySelector('h1') as HTMLElement;
    expect(title.textContent).toContain('Room not found');
  });

  it('deletes the room after confirm', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const service = TestBed.inject(RoomsService);
    const fixture = TestBed.createComponent(RoomDetail);
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();

    fixture.componentInstance.onDelete();

    expect(service.findById(1)).toBeUndefined();
    expect(window.confirm).toHaveBeenCalledWith('Delete Garden Twin?');
  });

  it('keeps the room when confirm is cancelled', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const service = TestBed.inject(RoomsService);
    const fixture = TestBed.createComponent(RoomDetail);
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();

    fixture.componentInstance.onDelete();

    expect(service.findById(1)?.name).toBe('Garden Twin');
  });
});
