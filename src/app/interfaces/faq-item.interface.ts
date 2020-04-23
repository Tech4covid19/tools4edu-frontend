import {IStakeholder} from './stakeholder.interface';
import {IProvider} from './provider.interface';

export interface IFaqItem {
  id?: string;
  order?: number;
  question?: string;
  answer?: string;
  published?: boolean;
  stakeholder?: IStakeholder;
  provider?: IProvider;
}
