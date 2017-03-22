import { Injectable } from "@angular/core";
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { LineupModel } from './lineup.model';

@Injectable()
export class LineupService {
  constructor(public http: Http) {}

  getData(): Promise<LineupModel> {
    return this.http.get('http://52.90.86.84:8080/lineups')
     .toPromise()
     .then(response => response.json() as LineupModel)
     .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
