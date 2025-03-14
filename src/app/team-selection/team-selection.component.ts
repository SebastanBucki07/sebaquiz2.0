import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { noSpecialCharactersOrSpacesValidator} from '../../../public/customValidatorMethods';


export interface Team {
  name: string;
  score: number;
}


@Component({
  selector: 'app-team-selection',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.css']
})
export class TeamSelectionComponent {
  @Output() teamsSelected = new EventEmitter<Team[]>();
  teamForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      teams: this.fb.array([this.createTeam()])  // Początkowo dodajemy jedną drużynę
    });
  }

  

  // Tworzymy formularz dla drużyny
  createTeam(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(20),noSpecialCharactersOrSpacesValidator()]]
    });
  }

   // Dostęp do FormArray (drużyn)
  get teams() {
    return (this.teamForm.get('teams') as FormArray).controls;
  }

  // Dodawanie drużyny
  addTeam() {
    const teams = this.teamForm.get('teams') as FormArray;
    teams.push(this.createTeam());
  }

  // Usuwanie drużyny
  removeTeam(index: number) {
    const teams = this.teamForm.get('teams') as FormArray;
    teams.removeAt(index);
  }

  // Sprawdzanie, czy formularz jest gotowy do wysłania (min. 2 drużyny, wszystkie drużyny muszą mieć poprawną nazwę)
  isFormValid(): boolean {
    return this.teams.length >= 2 && this.teamForm.valid;
  }

  // Wywołanie zdarzenia, kiedy gra jest gotowa do rozpoczęcia
  startGame() {
    if (this.isFormValid()) {
      const selectedTeams = this.teams.map(control => ({ name: control.value.name, score: 0 }));
      this.teamsSelected.emit(selectedTeams);  // Przekazanie danych o drużynach
    }
  }
}




