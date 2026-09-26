import { TestBed } from '@angular/core/testing';
import { Rooms } from './rooms';

describe('Rooms', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rooms],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(Rooms);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('lists hard-coded rooms', async () => {
    const fixture = TestBed.createComponent(Rooms);
    await fixture.whenStable();

    const titles = Array.from(
      fixture.nativeElement.querySelectorAll('.room-card__title') as NodeListOf<HTMLElement>,
    ).map((el) => el.textContent?.trim());

    expect(titles).toEqual(['Garden Twin', 'City Queen', 'Patio Suite']);
    expect(fixture.componentInstance.rooms.length).toBe(3);
  });
});
