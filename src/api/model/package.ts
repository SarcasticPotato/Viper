import {File} from './file';

export interface Package {
  pid: number;
  name?: string;
  folder?: string;
  links: File[];
}


