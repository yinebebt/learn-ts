import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RoomDetail } from './room-detail';
import { routes } from '../app.routes';

describe('RoomDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetail],
      providers: [provideRouter(routes, withComponentInputBinding())],
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
});
