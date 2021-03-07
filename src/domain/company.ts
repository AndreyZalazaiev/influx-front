import {Recommendation} from './recommendation';
import {Resource} from './resource';
import {Sales} from './sales';


export class Company {
  id: number;
  idUser: number;
  name: string;
  recommendations: Recommendation[];
  resource: Resource[];
  sales: Sales[];
}
