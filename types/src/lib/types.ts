export interface RawSattelite {
  satid: number;
  satname: string;
  intDesignator: string;
  launchDate: string;
  satlat: number;
  satlng: number;
  satalt: number;
}
export interface Sattelite {
  id: number;
  name: string;
  lat: number;
  lon: number;
  alt: number;
}

export interface Info {
  category: string;
  transactionscount: number;
  satcount: number;
}
