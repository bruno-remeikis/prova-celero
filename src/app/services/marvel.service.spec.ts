import { TestBed } from '@angular/core/testing';

import { MarvelService } from './marvel.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarvelService', () =>
{
  let marvelService: MarvelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    }).compileComponents();

    marvelService = TestBed.inject(MarvelService);
  });

  it('should create the service', () => {
    expect(marvelService).toBeTruthy();
  });



});
