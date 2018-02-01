import { Error1 } from './Error';

export class Error {
  errCode: number;
  ss: string;
  constructor(data: Error) {
    this.errCode = data['errCode'];
    this.ss = data['ss'];
  }
}