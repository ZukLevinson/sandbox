import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { COORDINATE_SYSTEM } from '@deck.gl/core/typed';
import { _WMSLayer as WMSLayer } from '@deck.gl/geo-layers/typed';
import { ScatterplotLayer, IconLayer} from '@deck.gl/layers/typed';
import { RawSattelite, Sattelite } from '@sandbox/types';
import { lastValueFrom } from 'rxjs';
import { DeckGlService } from '../shared/deck-gl/deck-gl.service';
import { FlightsService } from '../shared/flights/flights.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'sandbox-skies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skies.component.html',
  styleUrls: ['./skies.component.less'],
})
export class SkiesComponent implements OnInit {
  layer!: IconLayer;

  constructor(
    private readonly flightsService: FlightsService,
    private readonly deck: DeckGlService
  ) {}

  ngOnInit(): void {
    this.deck.addLayer(
      new WMSLayer({
        data: 'https://ows.terrestris.de/osm/service',
        serviceType: 'wms',
        layers: ['OSM-WMS'],
      })
    );

    this.updateLayer([]);
    this.deck.addLayer(this.layer);

    this.flightsService.flights$.subscribe((sattelites) => {
      this.deck.removeLayer(this.layer);
      this.updateLayer(sattelites);
      this.deck.addLayer(this.layer);
    });
  }
  ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
  };
  updateLayer(sattelites: Sattelite[]) {
    this.layer = new IconLayer({
      id: uuidv4(),
      data: sattelites,
      pickable: true,
      iconAtlas:
        'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
      iconMapping: this.ICON_MAPPING,
      getIcon: () => 'marker',
      sizeScale: 15,
      getSize: () => 5,
      getPosition: ({ lon, lat, alt }: Sattelite) => {
        return [lon, lat, alt];
      },
      transitions: {
        // transition with a duration of 3000ms
        getSize: 3000,
      },
    });
  }
}
