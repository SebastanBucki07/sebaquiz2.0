import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Team, TeamSelectionComponent } from '../app/team-selection/team-selection.component';
import { CategorySelectorComponent } from './category-selection/category-selection.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { availableCategories, CategoryWithPoints, Category, getCategoryClass } from './shared/categories';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamSelectionComponent, CategorySelectorComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sebaQuiz2.0';
  step: 'teams' | 'categories' | 'game' = 'teams';
  selectedTeams: Team[] = [];
  availableCategories: CategoryWithPoints[] = availableCategories;
  selectedCategories: CategoryWithPoints[] = [];
  currentTeamIndex: number = 0;

  goToCategories(teams: Team[]) {
    console.log('Teams selected:', teams);
    this.selectedTeams = teams;
    this.step = 'categories';
    console.log('Step changed to categories');
  }

  startGame(categories: CategoryWithPoints[]) {
    console.log('Categories selected:', categories);
    this.selectedCategories = categories;
    this.step = 'game';
    console.log('Step changed to game');
  }

  updateScore(teamName: string, points: number) {
    const team = this.selectedTeams.find(t => t.name === teamName);
    if (team) {
      team.score += points;
    }
    this.nextTurn();
  }

  nextTurn() {
    this.currentTeamIndex = (this.currentTeamIndex + 1) % this.selectedTeams.length;
  }

  get currentTeam() {
    return this.selectedTeams[this.currentTeamIndex];
  }

  // Method to handle question result
  handleQuestionResult(category: Category) {
    const categoryWithPoints = this.availableCategories.find(cat => cat.name === category);
    const points = categoryWithPoints ? categoryWithPoints.points : 0;
    console.log(`Category selected: ${category}, Points: ${points}`);
    this.updateScore(this.currentTeam.name, points);
  }

  getCategoryClass(category: CategoryWithPoints) {
    return getCategoryClass(category);
  }
}