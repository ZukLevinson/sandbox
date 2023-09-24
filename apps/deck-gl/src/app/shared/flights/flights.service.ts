import { RawSattelite, Sattelite } from '@sandbox/types';
import { Injectable } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  flights$ = new BehaviorSubject<Sattelite[]>([]);

  constructor(private readonly httpService: HttpClient) {
    setInterval(() => {
      this.updateFlights();
    }, 5000);
  }

  private updateFlights() {
    this.httpService
      .get<Sattelite[]>('http://localhost:3333/api')
      .pipe(take(1))
      .subscribe((response) => {
        this.flights$.next(response);
      });
  }
}
