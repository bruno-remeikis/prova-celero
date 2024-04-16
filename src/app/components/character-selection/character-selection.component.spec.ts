import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionComponent } from './character-selection.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterSelectionComponent', () =>
{
  let characterSelectionFixture: ComponentFixture<CharacterSelectionComponent>;
  let characterSelection: CharacterSelectionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CharacterSelectionComponent,
        HttpClientTestingModule
      ],
    }).compileComponents();

    characterSelectionFixture = TestBed.createComponent(CharacterSelectionComponent);
    characterSelection = characterSelectionFixture.componentInstance;
  });

  it('should create the component', () => {
    expect(characterSelection).toBeTruthy();
  });



  // it('')
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
