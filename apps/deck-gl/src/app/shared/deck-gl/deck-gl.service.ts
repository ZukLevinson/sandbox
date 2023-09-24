import { Injectable } from '@angular/core';

import { Deck, Layer } from '@deck.gl/core/typed';
import { BehaviorSubject, Subject, combineLatest, take } from 'rxjs';

const INITIAL_VIEW_STATE = {
  latitude: 37.8,
  longitude: -122.45,
  zoom: 15,
};

@Injectable({
  providedIn: 'root',
})
export class DeckGlService {
  private readonly deckgl$ = new Subject<Deck>();
  private readonly layersToAdd$ = new BehaviorSubject<Layer[]>([]);

  loadDeck(deck: Deck) {
    this.deckgl$.next(deck);
  }

  addLayer<T extends Layer>(layer: T) {
    this.layersToAdd$.pipe(take(1)).subscribe((pendingLayers) => {
      this.layersToAdd$.next([...pendingLayers, layer]);
    });
  }

  removeLayer<T extends Layer>(layerToRemove: T) {
    this.layersToAdd$.pipe(take(1)).subscribe((layers) => {
      this.layersToAdd$.next(
        layers.filter((layer) => layer.id !== layerToRemove.id)
      );
    });
  }

  constructor() {
    combineLatest([this.deckgl$, this.layersToAdd$]).subscribe(
      ([deck, layers]) => {
        const currentLayers = deck.props.layers as Layer[];

        const layersToAdd = layers.filter(
          ({ id }) => !currentLayers.find((layer) => layer.id === id)
        );

        currentLayers.push(...layersToAdd);
      }
    );
  }
}
