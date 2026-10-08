import { TestBed } from '@angular/core/testing';
import { ROOMS_LOAD_DELAY, RoomsService } from './rooms.service';

describe('RoomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ROOMS_LOAD_DELAY, useValue: 0 }],
    });
  });

  it('loads the seed rooms', async () => {
    const service = TestBed.inject(RoomsService);
    await service.load();

    expect(service.status()).toBe('ready');
    expect(service.rooms().map((room) => room.name)).toContain('Garden Twin');
  });

  it('keeps a created room across a second load', async () => {
    const service = TestBed.inject(RoomsService);
    await service.load();
    service.add({
      name: 'Annex',
      price: 10,
      image: '',
      capacity: 1,
      available: true,
    });

    await service.load();

    expect(service.rooms().some((room) => room.name === 'Annex')).toBe(true);
    expect(service.rooms().length).toBe(4);
  });

  it('removes a room', async () => {
    const service = TestBed.inject(RoomsService);
    await service.load();

    expect(service.remove(1)).toBe(true);
    expect(service.findById(1)).toBeUndefined();
    expect(service.rooms().length).toBe(2);
  });

  it('reports an error, then recovers', async () => {
    const service = TestBed.inject(RoomsService);
    service.failNextLoad();

    await service.load();
    expect(service.status()).toBe('error');
    expect(service.errorMessage()).toBe('Could not load rooms.');

    await service.load();
    expect(service.status()).toBe('ready');
    expect(service.rooms().length).toBe(3);
  });
});
