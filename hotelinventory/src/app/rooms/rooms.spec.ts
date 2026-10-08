import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { routes } from '../app.routes';
import { Rooms } from './rooms';
import { ROOMS_LOAD_DELAY, RoomsService } from './rooms.service';

describe('Rooms', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rooms],
      providers: [provideRouter(routes), { provide: ROOMS_LOAD_DELAY, useValue: 0 }],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(Rooms);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('lists rooms from the service', async () => {
    const fixture = TestBed.createComponent(Rooms);
    await fixture.whenStable();

    const titles = titlesIn(fixture.nativeElement);
    expect(titles.length).toBeGreaterThanOrEqual(3);
    expect(titles).toContain('Garden Twin');
  });

  it('filters rooms by name', async () => {
    const fixture = TestBed.createComponent(Rooms);
    const component = fixture.componentInstance;
    await fixture.whenStable();

    component.searchTerm.set('patio');
    await fixture.whenStable();

    const titles = titlesIn(fixture.nativeElement);
    expect(titles).toEqual(['Patio Suite']);
    expect(component.filteredRooms().length).toBe(1);
  });

  it('shows an error and loads on retry', async () => {
    const service = TestBed.inject(RoomsService);
    service.failNextLoad();

    const fixture = TestBed.createComponent(Rooms);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Could not load rooms.');

    const retry = fixture.nativeElement.querySelector('.rooms__retry') as HTMLButtonElement;
    retry.click();
    await fixture.whenStable();

    expect(titlesIn(fixture.nativeElement)).toContain('Garden Twin');
  });
});

function titlesIn(root: HTMLElement): string[] {
  return Array.from(root.querySelectorAll('.room-card__title')).map((el) => el.textContent?.trim() ?? '');
}
