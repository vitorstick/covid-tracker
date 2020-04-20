import { Type } from './type.enum';

export interface NewEntry {
  date: string;
  value?: number;
  userid: string;
  type: Type;
  // RESPIRATORY
  nailsLipsBlue?: boolean;
  cough?: boolean;
  nailsLipsBlueValue?: string;
  coughValue?: string;
  // PAIN
  throatpain?: boolean;
  headpain?: boolean;
  throatpainValue?: string;
  headpainValue?: string;
}
