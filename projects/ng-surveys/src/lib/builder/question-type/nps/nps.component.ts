import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/internal/operators';
import {IElements} from '../../../models';
import {ElementsReducer} from '../../../store/elements/elements.reducer';
import {ElementsActionTypes} from '../../../store/elements/elements.actions';

@Component({
  selector: 'ngs-nps',
  templateUrl: './nps.component.html',
  styleUrls: ['./nps.component.scss']
})
export class NpsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  isView: boolean;
  currentRange: number;

  element: IElements;
  pageId: string;

  leftSub: Subscription;
  rightSub: Subscription;

  npsInputSub: Subscription;

  constructor(
    private _elementsReducer: ElementsReducer,
  ) { }

  ngOnInit() {
    this.element = this.data.element;
    this.pageId = this.data.element.pageId;
    this.isView = this.data.isView;

    if (!this.isView) {
      setTimeout(() => {
        this.onLeftLabelChange();
        this.onRightLabelChange();
      }, 300);
    } else {
      setTimeout(() => {
        this.onNPSChange();
      }, 300);
    }
  }

  ngOnDestroy() {
    if (this.isView) {
      this.npsInputSub.unsubscribe();
    }
  }

  onLeftLabelChange() {
    const $leftLabel = document.getElementById(`left-label-${this.element.id}`);

    this.leftSub = fromEvent($leftLabel, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000),
    ).subscribe(leftLabel => this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_UPDATE_LEFT_LABEL_ACTION,
      payload: {
        pageId: this.pageId,
        elementId: this.element.id,
        leftLabel
      }}));
  }

  onRightLabelChange() {
    const $rightLabel = document.getElementById(`right-label-${this.element.id}`);

    this.rightSub = fromEvent($rightLabel, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(rightLabel => this._elementsReducer.elementsReducer({
      type: ElementsActionTypes.QUESTION_UPDATE_RIGHT_LABEL_ACTION,
      payload: {
        pageId: this.pageId,
        elementId: this.element.id,
        rightLabel
      }}));
  }

  onNPSChange() {
    const $npsInput = document.getElementById(`nps-input-${this.element.id}`);

    this.npsInputSub = fromEvent($npsInput, 'input').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      debounceTime(1000)
    ).subscribe(answer => {
      this._elementsReducer.elementsReducer({
        type: ElementsActionTypes.QUESTION_UPDATE_ANSWER_ACTION,
        payload: {
          pageId: this.element.pageId,
          elementId: this.element.id,
          answer,
          pageFlowModifier: this.data.element.question.pageFlowModifier,
          pageFlow: this.data.element.pageFlow,
        }});
    });
  }

}
