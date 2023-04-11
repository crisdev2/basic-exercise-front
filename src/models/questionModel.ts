import { IForm } from './formModel';
import { IQuestionType } from './questionTypeModel';

export interface IQuestion {
  id: number | null
  label: string
  required: boolean
  idQuestionType: IQuestionType | null
  idForm: IForm | null
}