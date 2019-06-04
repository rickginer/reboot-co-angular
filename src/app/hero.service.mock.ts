import {  of } from 'rxjs';

export class MockHeroService {

  getHero() {
    return of({});
  }
  
}
