import {NgxSurveyState} from './ngx-survey.state';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromSurvey from './survey/survey.reducer';
import * as fromPages from './pages/pages.reducer';
import * as fromElements from './elements/elements.reducer';
import * as fromOptionAnswers from './option-answers/option-answers.reducer';
import {IPage} from '../models/page.model';
import {IElements, IElementsMap} from '../models/elements.model';
import {IOptionAnswers, IOptionAnswersMap} from '../models/option-answers.model';
import * as fromBuilderOptions from './builder-options/builder-options.reducer';
import {deserializeUtils} from './utils';


export const reducers = {
  pages: fromPages.reducer,
  elements: fromElements.reducer,
  optionAnswers: fromOptionAnswers.reducer,
  builderOptions: fromBuilderOptions.reducer,
};

// State Selectors
export const getNgxSurveyState = (state: NgxSurveyState) => state;

// Survey Selectors
export const getSurvey = (state: NgxSurveyState) => state.survey;
export const getSurveyName = (state: NgxSurveyState) => state.survey.name;
export const getSurveyDescription = (state: NgxSurveyState) => state.survey.description;
export const getSurveyId = (state: NgxSurveyState) => state.survey.id;

// Pages Selectors
export const getPages = (state: NgxSurveyState) => state.pages;
export const getPagesSize = (state: NgxSurveyState) => {
  if (state.pages) {
    return state.pages.size;
  }  else {
    return 0;
  }
};

// Elements Selectors
export const getElements = (state: NgxSurveyState) => state.elements;
export const getElementsByPageId = (state: NgxSurveyState, { pageId }) => state.elements.get(pageId);
export const getElementByPageIdAndElementId = (state: NgxSurveyState, { pageId, elementId }) => state.elements.get(pageId).get(elementId);
export const getElementsSize = (state: NgxSurveyState, { pageId }) => state.elements.get(pageId).size;

// Option Answers Selectors
export const getOptionAnswers = (state: NgxSurveyState) => state.optionAnswers;
export const getOptionAnswersByElementId = (state: NgxSurveyState, { elementId }) =>
  state.optionAnswers.get(elementId);

// Builder Options Selectors
export const getBuilderOptions = (state: NgxSurveyState) => state.builderOptions;

