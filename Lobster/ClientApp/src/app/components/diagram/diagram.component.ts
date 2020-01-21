import { Component, Output, EventEmitter } from '@angular/core';
import { DiagramComponentBase, ElementVM } from '../../shared/diagram-component-base';
import { DiagramModel } from '../../models/diagram.model';
import { DiagramService } from '../../services/diagram.service';
import { DecisionService } from '../../services/decision.service';
import { DecisionModel } from '../../models/decision.model';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})

export class DiagramComponent extends DiagramComponentBase<DiagramModel> {
  constructor(private _diagramService: DiagramService,
    private _decisionService: DecisionService) {
    super();
  }

  public decisions: DecisionModel[] = [];
  public resultIds: number[] = [];
  public diagramModels: DiagramModel[] = [];

  async ngOnInit() {
    this.populate();
  }

  populate() {

    // get decision results
    this._decisionService.getDecisions()
      .subscribe((data: DecisionModel[]) => {
        this.decisions = data;

        // result Ids
        this.decisions.forEach(d => {
          if (d.result == true)
            this.resultIds.push(d.resultTrueId);
          if (d.result == false)
            this.resultIds.push(d.resultFalseId);
        });
      });

    // get diagram
    this._diagramService.getDiagram()
      .subscribe((data: DiagramModel[]) => {
        let results: DiagramModel[] = data;
         
        // filter out models without a result
        results.forEach(r => {
          if (this.resultIds.includes(parseInt(r.key))) {
            this.diagramModels.push(r);
          }
        });

        // map elements
        this.elements = this.diagramModels.map(m => {
          return new ElementVM(m);
        });

        this.setZoom(1);
      });
  }
}
