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

  let mockHeroes, mockHero, mockId;

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
    mockHero = mockHeroes[0];
    mockId = mockHero.id;
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
      // Respond with the mock heroes
      req.flush(mockHeroes);
      expect(req.request.method).toEqual('GET');
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
  
  describe('getHero', () => {

    it('should get hero', () => {
      service.getHero(mockId).subscribe(
        response => expect(response).toEqual(mockHero)
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${service.heroesUrl}/${mockId}`);
      // Respond with the updated hero
      req.flush(mockHero);
      expect(req.request.method).toEqual('GET');
    });

  });

  describe('updateHero', () => {

    it('should update hero', () => {
      service.updateHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero)
      );
      // Receive PUT request
      const req = httpTestingController.expectOne(service.heroesUrl);
      // Respond with the updated hero
      req.flush(mockHero);
      expect(req.request.method).toEqual('PUT');
    });

  });

  describe('deleteHero', () => {

    it('should delete hero using id', () => {
      service.deleteHero(mockId).subscribe(
        response => expect(response).toEqual(mockId)
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(`${service.heroesUrl}/${mockId}`);
      // Respond with the updated hero
      req.flush(mockId);
      expect(req.request.method).toEqual('DELETE');
    });

    it('should delete hero using hero object', () => {
      service.deleteHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero.id)
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(`${service.heroesUrl}/${mockHero.id}`);
      // Respond with the updated hero
      req.flush(mockHero.id);
      expect(req.request.method).toEqual('DELETE');
    });

  });

});

