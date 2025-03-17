import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Team, TeamSelectionComponent } from '../app/team-selection/team-selection.component';
import { CategorySelectorComponent } from './category-selection/category-selection.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { availableCategories, CategoryWithPoints, Category, getCategoryClass } from './shared/categories';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TeamSelectionComponent, CategorySelectorComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [QuestionService]
})
export class AppComponent {
  title = 'sebaQuiz2.0';
  step: 'teams' | 'categories' | 'game' = 'teams';
  selectedTeams: Team[] = [];
  availableCategories: CategoryWithPoints[] = availableCategories;
  selectedCategories: CategoryWithPoints[] = [];
  currentTeamIndex: number = 0;
  currentQuestion: any = null;
  selectedAnswer: string | null = null;
  isAnswerCorrect: boolean | null = null;
  answerMessage: string | null = null;
  currentCrest: string | null = null;
  crestFragment: string | null = null;
  difficulty: 'hard' | 'medium' | 'easy' = 'hard';
  currentCategory: Category | null = null;
  showCorrectAnswer: boolean = false;
  rotation: number = 0;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center';
  buttonsDisabled: boolean = false;

  constructor(private questionService: QuestionService) {}

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
  }

  nextTurn() {
    this.currentTeamIndex = (this.currentTeamIndex + 1) % this.selectedTeams.length;
    this.buttonsDisabled = false; // Enable buttons for the next turn
  }

  get currentTeam() {
    return this.selectedTeams[this.currentTeamIndex];
  }

  // Method to handle question result
  handleQuestionResult(category: Category) {
    console.log(`Category selected: ${category}`);
    this.currentCategory = category;
    if (category === 'Klubowe herby') {
      this.questionService.getQuestions('assets/clubs/clubCrests.json').subscribe(
        crests => {
          this.currentCrest = crests[Math.floor(Math.random() * crests.length)];
          this.showCrestFragment('hard');
        },
        error => {
          console.error('Error loading club crests:', error);
        }
      );
    } else if (category === 'Pytanie wielokrotnego wyboru') {
      this.questionService.getQuestions('assets/multipleChoice/multipleChoice.json').subscribe(
        questions => {
          this.currentQuestion = questions[Math.floor(Math.random() * questions.length)];
          console.log(`Category selected: ${category}, Question: ${this.currentQuestion}`);
        },
        error => {
          console.error('Error loading questions:', error);
        }
      );
    } else {
      // Handle other categories
    }
  }

  // Method to show crest fragment based on difficulty
  showCrestFragment(difficulty: 'hard' | 'medium' | 'easy') {
    this.difficulty = difficulty;
    this.rotation = difficulty === 'hard' ? [0, 90, 180][Math.floor(Math.random() * 3)] : difficulty === 'medium' ? [0, 180][Math.floor(Math.random() * 2)] : 0;
    const fragmentPercentage = difficulty === 'hard' ? 500 : difficulty === 'medium' ? 300 : 200;
    this.crestFragment = `url('assets/clubs/${this.currentCrest}')`;
    this.backgroundSize = `${fragmentPercentage}%`;
    this.backgroundPosition = 'center';
  }

  // Method to show the correct answer
showAnswer() {
  this.showCorrectAnswer = true;
  this.crestFragment = `url('assets/clubs/${this.currentCrest}')`;
  this.backgroundSize = 'contain';
  this.backgroundPosition = 'center';
  this.rotation = 0;
  // Do not disable buttons here
}

// Method to handle answer selection
selectAnswer(answer: string | boolean) {
  console.log(`Selected answer: ${answer}`);
  if (this.buttonsDisabled) return; // Prevent multiple clicks
  this.buttonsDisabled = true; // Disable buttons after selecting an answer

  if (typeof answer === 'string') {
    this.selectedAnswer = answer;
    if (this.currentQuestion.answer === answer) {
      this.isAnswerCorrect = true;
      this.answerMessage = 'Poprawna odpowiedź!';
      const points = this.difficulty === 'hard' ? 6 : this.difficulty === 'medium' ? 4 : 2;
      this.updateScore(this.currentTeam.name, points);
    } else {
      this.isAnswerCorrect = false;
      this.answerMessage = 'Błędna odpowiedź.';
    }
  } else {
    this.isAnswerCorrect = answer;
    this.answerMessage = answer ? 'Poprawna odpowiedź!' : 'Błędna odpowiedź.';
    if (answer) {
      const points = this.difficulty === 'hard' ? 6 : this.difficulty === 'medium' ? 4 : 2;
      this.updateScore(this.currentTeam.name, points);
    }
  }

  setTimeout(() => {
    this.currentQuestion = null; // Close the question overlay
    this.currentCrest = null;
    this.selectedAnswer = null;
    this.isAnswerCorrect = null;
    this.answerMessage = null;
    this.showCorrectAnswer = false;
    this.buttonsDisabled = false; // Re-enable buttons for the next question
    this.nextTurn(); // Move to the next team's turn
  }, 1000); // Wait for 1 second before proceeding to the next team's turn
}

// Method to handle "Dobrze" and "Źle" buttons for "Klubowe herby"
handleCrestAnswer(isCorrect: boolean) {
  console.log(`Crest answer: ${isCorrect}`);
  if (this.buttonsDisabled) return; // Prevent multiple clicks
  this.buttonsDisabled = true; // Disable buttons after selecting an answer

  if (isCorrect) {
    const points = this.difficulty === 'hard' ? 6 : this.difficulty === 'medium' ? 4 : 2;
    this.updateScore(this.currentTeam.name, points);
  }

  setTimeout(() => {
    this.currentCrest = null;
    this.showCorrectAnswer = false;
    this.buttonsDisabled = false; // Re-enable buttons for the next question
    this.nextTurn(); // Move to the next team's turn
  }, 1000); // Wait for 1 second before proceeding to the next team's turn
}

  // Method to get the ngClass object for a category
  getCategoryClass(category: CategoryWithPoints) {
    return getCategoryClass(category);
  }
}