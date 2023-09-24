import { FlightsService } from './shared/flights/flights.service';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DeckGlService } from './shared/deck-gl/deck-gl.service';

import { Deck } from '@deck.gl/core/typed';
import { RawSattelite, Sattelite } from '@sandbox/types';
import { tap } from 'rxjs';

// const INITIAL_VIEW_STATE = {
//   latitude: 37.8,
//   longitude: -122.45,
//   zoom: 15,
// };

const INITIAL_VIEW_STATE = {
  longitude: -137.3294,
  latitude: 52.4195,
  zoom: 5,
};

@Component({
  selector: 'sandbox-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  host: {
    class: 'w-full h-full',
  },
})
export class AppComponent implements AfterViewInit {
  deckgl?: Deck;
  title = 'sandbox';

  flights$ = this.flightsService.flights$.pipe(tap((a) => console.log(a)));

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly deckService: DeckGlService,
    private readonly flightsService: FlightsService
  ) {}

  ngAfterViewInit(): void {
    this.deckgl = new Deck({
      canvas: this.canvas.nativeElement,
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
    });

    this.deckService.loadDeck(this.deckgl);
  }

  onMove(flight: Sattelite) {
    this.deckgl?.setProps({
      viewState: {
        longitude: flight.lon,
        latitude: flight.lat,
        zoom: 5,
      },
    });
  }
}
