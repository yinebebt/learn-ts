import { provideRouter } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('creates', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders brand', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const brand = fixture.nativeElement.querySelector('.app-brand') as HTMLElement;
    expect(brand.textContent).toContain('Hotelinventory');
  });
});
