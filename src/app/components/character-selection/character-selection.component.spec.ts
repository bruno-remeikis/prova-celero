import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionComponent } from './character-selection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarvelService } from '../../services/marvel.service';
import { characters } from '../../utils/mocks/marvel-response';
import { of } from 'rxjs';

describe('CharacterSelectionComponent', () =>
{
  let characterSelectionFixture: ComponentFixture<CharacterSelectionComponent>;
  let characterSelection: CharacterSelectionComponent;

  let marvelService: MarvelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterSelectionComponent,
        HttpClientTestingModule
      ],
    }).compileComponents();

    characterSelectionFixture = TestBed.createComponent(CharacterSelectionComponent);
    characterSelection = characterSelectionFixture.componentInstance;

    marvelService = TestBed.inject(MarvelService);
  });

  it('should create the component', () => {
    expect(characterSelection).toBeTruthy();
  });



  // --- filterCharacters ---

  describe('filterCharacters', () =>
  {
    it('should load characters with success', () => {
      const mock = characters.buildResponse([
        characters.hero1,
        characters.hero2,
        characters.noImgHero,
        characters.gifHero,
      ]);

      const expected = [
        characters.hero1,
        characters.hero2,
      ];

      spyOn(marvelService, 'getCharacters').and.returnValue(of(mock));

      characterSelection.filterCharacters();
      expect(characterSelection.characters).toEqual(expected);
      expect(characterSelection.loadingChars).toBeFalse();
    });

    it('should load more characters with success', () => {
      const mock = characters.buildResponse([
        characters.hero2,
        characters.noImgHero,
        characters.gifHero,
      ]);

      const expected = [
        characters.hero1,
        characters.hero2,
      ];

      characterSelection.characters = [
        characters.hero1
      ];

      spyOn(marvelService, 'getCharacters').and.returnValue(of(mock));

      characterSelection.filterCharacters();
      expect(characterSelection.characters).toEqual(expected);
      expect(characterSelection.loadingChars).toBeFalse();
    });
  });
});

/*describe('CharacterSelectionComponent', () => {
  let component: CharacterSelectionComponent;
  let fixture: ComponentFixture<CharacterSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/
