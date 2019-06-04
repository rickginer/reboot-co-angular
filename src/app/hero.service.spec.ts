import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

const mockData = [
  { id: 1, name: 'Hulk' },
  { id: 2, name: 'Thor'},
  { id: 3, name: 'Iron Man'}
] as Hero[];

fdescribe('HeroService', () => {

  let service;
  let httpTestingController: HttpTestingController;

  let mockHeroes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService]
    });
    httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(inject([HeroService], s => {
    service = s;
  }));

  beforeEach(() => {
    mockHeroes = [...mockData];
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });

  describe('getHeroes', () => {

    it('should return mock heroes', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(mockHeroes.length)
      );
      // Receive GET request
      const req = httpTestingController.expectOne(service.heroesUrl);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes);
    });

    it('should NOT return mock heroes if server returns a 404', () => {
      service.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(0)
      );
      // Receive GET request
      const req = httpTestingController.expectOne(service.heroesUrl);
      req.error(new ErrorEvent('ERROR_LOADING_HEROES'));
      expect(req.request.method).toEqual('GET');
      // Verify there are no outstanding requests
      httpTestingController.verify();
    });

  });

});

