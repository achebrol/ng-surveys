import * as utils from '../store/utils';

export interface IQuestion {
  id?: string;
  text?: string;
  answer?: string | number;
  type?: string;
  required?: boolean;
  pageFlowModifier?: boolean;
  elementId?: string;
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
}

export class Question implements IQuestion {
  constructor(
    public id?: string,
    public text?: string,
    public answer?: string | number,
    public type?: string,
    public required?: boolean,
    public pageFlowModifier?: boolean,
    public elementId?: string,
    public min?: number,
    public max?: number,
    public leftLabel?: string,
    public rightLabel?: string
  ) {
    this.id = id ? id : utils.UUID();
    this.text = text || '';
    this.answer = answer || '';
    this.type = type || '';
    this.required = required || false;
    this.pageFlowModifier = pageFlowModifier || false;
    this.elementId = elementId || '';
    this.min = min || null;
    this.max = max || null;
    this.leftLabel = leftLabel || null;
    this.rightLabel = rightLabel || null;
  }
}
