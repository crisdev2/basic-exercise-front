import { IQuestion } from './questionModel';

export interface IOption {
  id: number | null
  label: string
  idQuestion: IQuestion | null
}