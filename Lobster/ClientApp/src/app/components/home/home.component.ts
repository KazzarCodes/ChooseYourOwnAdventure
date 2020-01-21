import { Component, OnInit } from '@angular/core';
import { DecisionService } from '../../services/decision.service';
import { DecisionModel } from '../../models/decision.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public decisions: DecisionModel[] = [];
  public decision: DecisionModel = new DecisionModel;

  constructor(private _decisionService: DecisionService,
              private _router: Router) {
  }

  ngOnInit() {
    this.getDecisions();
  }

  isEnd(): boolean {

    if (this.decision == null)
      return false;

    else if (this.decision.resultTrueId > 0)
      return false;

    else if (this.decision.resultFalseId > 0)
      return false;

    else
      return true;

    //let result = (this.decision.resultTrueId > 0 || this.decision.resultFalseId > 0) ? false : true;
    //return result;
  }

  getDecisions() {
    this._decisionService.getDecisions()
      .subscribe((data: DecisionModel[]) => {
        this.decisions = data;
        this.decision = data[0];
      });
  }

  async persistResult(result) {

    // If its the first question and there are already results, clear the existing results
    if (this.decision.id == this.decisions[0].id && this.hasExistingResults())
      this.clearResults();

    this.decision.result = result;
    this._decisionService.saveResult(this.decision).subscribe();

    let nextQuestionId = result ? this.decision.resultTrueId : this.decision.resultFalseId;

    this._decisionService.getDecision(nextQuestionId)
      .subscribe(data => (
        this.decision = data
      ));
  }

  hasExistingResults(): boolean {
    return this.decisions.some(d => d.result != null);
  }

  showDiagram() {
    this._router.navigateByUrl('/diagram');
  }

  clearResults() {

    this._decisionService.clearResults().subscribe();

    // Reload first question
    if (this.isEnd())
      this.decision = this.decisions[0];
  }
}
