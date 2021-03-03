import {Recommendations} from './recommendation';
import {Resource} from './resource';
import {Sales} from './sales';


export class Company {
  id: number;
  idUser: number;
  number: string;
  recommendations: Recommendations[];
  resource: Resource[];
  sales: Sales[];
}
