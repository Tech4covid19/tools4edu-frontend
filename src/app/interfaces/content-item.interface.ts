import {IStakeholder} from './stakeholder.interface';
import {IProvider} from './provider.interface';
import {ITag} from './tag.interface';

export interface IContentItem {
  id?: string;
  type?: string;
  order?: number;
  videoUrl?: string;
  videoTime?: string;
  imageUrl?: string;
  title?: string;
  text?: string;
  createdAt?: Date;
  updatedAt?: Date;
  slug?: string;
  published?: boolean;
  stakeholder?: IStakeholder;
  provider?: IProvider;
  stakeholders?: IStakeholder[];
  providers?: IProvider[];
  tags?: ITag[];
}
