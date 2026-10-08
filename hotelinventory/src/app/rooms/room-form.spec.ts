import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from '../app.routes';
import { RoomForm } from './room-form';
import { ROOMS_LOAD_DELAY, RoomsService } from './rooms.service';

describe('RoomForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomForm],
      providers: [
        provideRouter(routes, withComponentInputBinding()),
        { provide: ROOMS_LOAD_DELAY, useValue: 0 },
      ],
    }).compileComponents();
  });

  it('hides available on add and defaults it to true', async () => {
    const fixture = TestBed.createComponent(RoomForm);
    await fixture.whenStable();

    expect(fixture.componentInstance.isEdit()).toBe(false);
    expect(fixture.componentInstance.form.controls.available.value).toBe(true);
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).toBeNull();
  });

  it('shows available on edit', async () => {
    const fixture = TestBed.createComponent(RoomForm);
    fixture.componentRef.setInput('id', '2');
    await fixture.whenStable();

    expect(fixture.componentInstance.isEdit()).toBe(true);
    expect(fixture.componentInstance.form.controls.available.value).toBe(false);
    expect(fixture.nativeElement.querySelector('input[type="checkbox"]')).not.toBeNull();
  });

  it('creates a room as available', async () => {
    const service = TestBed.inject(RoomsService);
    const fixture = TestBed.createComponent(RoomForm);
    await fixture.whenStable();
    const before = service.rooms().length;

    fixture.componentInstance.form.setValue({
      name: 'Test Suite',
      price: 150,
      capacity: 2,
      image: '/room-1.jpg',
      available: false,
    });
    fixture.componentInstance.onSubmit();

    expect(service.rooms().length).toBe(before + 1);
    const created = service.rooms().at(-1);
    expect(created?.name).toBe('Test Suite');
    expect(created?.available).toBe(true);
  });

  it('updates an existing room', async () => {
    const service = TestBed.inject(RoomsService);
    await service.load();
    const seeded = service.add({
      name: 'Temp Room',
      price: 50,
      capacity: 1,
      image: '',
      available: true,
    });

    const fixture = TestBed.createComponent(RoomForm);
    fixture.componentRef.setInput('id', String(seeded.id));
    await fixture.whenStable();

    fixture.componentInstance.form.patchValue({
      name: 'Temp Room Edited',
      available: false,
    });
    fixture.componentInstance.onSubmit();

    expect(service.findById(seeded.id)?.name).toBe('Temp Room Edited');
    expect(service.findById(seeded.id)?.available).toBe(false);
  });
});
