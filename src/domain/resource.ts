import {Sales} from './sales';


export class Resource  {
  id: number;
  idCompany: number;
  name: string;
  price: number;
  sales: Sales[];
}
