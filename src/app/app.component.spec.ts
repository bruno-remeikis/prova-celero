import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarvelService } from './services/marvel.service';
import { characters } from './utils/mocks/marvel-response';


describe('AppComponent', () =>
{
  let appFixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let marvelService: MarvelService;
  // let mockMarvelUtils: MarvelUtils;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientTestingModule
      ],
    }).compileComponents();

    appFixture = TestBed.createComponent(AppComponent);
    app = appFixture.componentInstance;

    marvelService = TestBed.inject(MarvelService);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });



  // --- loadCharacters ---

  describe('loadCharacters', () =>
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

      app.loadCharacters();
      expect(app.initialCharacters).toEqual(expected);
      expect(app.loadingChars).toBeFalse();
    });
  });



  // --- splitIndex ---

  describe('splitIndex', () =>
  {
    it('should convert 1D to 2D index with success', () =>
      expect(app.splitIndex(0)).toEqual([0, 0]));

    it('should convert 1D to 2D index with success', () =>
      expect(app.splitIndex(1)).toEqual([0, 1]));

    it('should convert 1D to 2D index with success', () =>
      expect(app.splitIndex(2)).toEqual([0, 2]));

    it('should convert 1D to 2D index with success', () =>
      expect(app.splitIndex(3)).toEqual([1, 0]));

    /*it('should convert 1D to 2D index wrong', () => {
      const [i, j] = app.splitIndex(0);
      expect(i).toBeGreaterThanOrEqual(0);
    });*/
  });



  // -- getPlayer ---

  describe('getPlayer', () =>
  {
    it('should return 1 with success', () => {
      app.board = [
        [   1, null, null],
        [null, null, null],
        [null, null, null],
      ];
      expect(app.getPlayer(0)).toEqual(1);
    });

    it('should return 0 with success', () => {
      app.board = [
        [null, null, null],
        [null,    0, null],
        [null, null, null],
      ];
      expect(app.getPlayer(4)).toEqual(0);
    });

    it('should return null with success', () => {
      app.board = [
        [null, null, null],
        [null,    0, null],
        [null, null, null],
      ];
      expect(app.getPlayer(5)).toBeNull();
    });
  });



  // --- verifyPlay ---

  describe('verifyPlay', () =>
  {
    it('should return true for a horizontal win', () => {
      app.board = [
        [1, 1, 1],
        [null, null, null],
        [null, null, null],
      ];
      expect(app.verifyPlay()).toEqual({ i: 0, orientation: 'horizontal' });
    });

    it('should return true for a vertical win', () => {
      app.board = [
        [null, null, 1],
        [null, null, 1],
        [null, null, 1],
      ];
      expect(app.verifyPlay()).toEqual({ i: 2, orientation: 'vertical' });
    });

    it('should return true for a diagonal win (principal)', () => {
      app.board = [
        [1, null, null],
        [null, 1, null],
        [null, null, 1],
      ];
      expect(app.verifyPlay()).toEqual({ orientation: 'primary-diagonal' });
    });

    it('should return true for a diagonal win (secondary)', () => {
      app.board = [
        [null, null, 1],
        [null, 1, null],
        [1, null, null],
      ];
      expect(app.verifyPlay()).toEqual({ orientation: 'secondary-diagonal' });
    });

    it('should return false for no win', () => {
      app.board = [
        [0, 1, null],
        [null, null, 2],
        [2, 1, 0],
      ];
      expect(app.verifyPlay()).toBeNull();
    });

    it('should return false for no win', () => {
      app.board = [
        [1, 1, null],
        [null, null, null],
        [null, null, null],
      ];
      expect(app.verifyPlay()).toBeNull();
    });
  });



  // --- isBoardFull ("velha") ---

  describe('isBoardFull', () =>
  {
    it('should return true if board is full ("velha")', () => {
      app.board = [
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0]
      ];
      expect(app.isBoardFull()).toBeTrue();
    });

    it('should return false if the board is not full', () => {
      app.board = [
        [1, 0, 1],
        [1, 0, null],
        [0, 1, 0]
      ];
      expect(app.isBoardFull()).toBeFalse();
    });
  });
});
