import { Injectable } from '@angular/core';
import { CityResidence } from './cityResidence';
import { HttpClient } from '@angular/common/http'; // For pulling & authenticating from API
import * as geocodedCityData from '../assets/gr_parcels_geocoded.json';

@Injectable({
  providedIn: 'root'
})
export class CityDataService {

  private cityData: CityResidence[] = [];
  private tempData = (geocodedCityData as any).default;
  // ==============================================
  // Vars used for pulling & authenticating from API
  // ==============================================  
  // private apiKey: string = 'dcqrbg7rl05yovr0t2www8v6t';
  // private apiPassword: string = '56j23yrxr77ozcmkpruk21qukq6rsk9voiffl6ppk4i4rhojhw';
  // private cityDataEndpt: string = 'https://data.grandrapidsmi.gov/resource/xbdc-f64e.json?$where=year_built%20%3C%20%271978%27%20AND%20year_built%20!=%20%270%27';

  // HttpClient used for pulling & authenticating from API
  constructor(private http: HttpClient) {
    for (const residence of this.tempData) {
      this.cityData.push(new CityResidence(residence));
    }
    // ==============================================
    // Placeholder for pulling & authenticating from API
    // ==============================================
    // this.http.get(this.cityDataEndpt).subscribe((data: any) => {
    //   for (const residence of data) {
    //     this.cityData.push(new CityResidence(residence));
    //   }
    // });
  }

  /**
   * Returns an array of the google.maps.LatLng's
   * for each address in the geocoded city data
   * 
   * Used for creating a heatmap
   * (heatmap requires google.maps.LatLng's for data points)
   * 
   * @returns {google.maps.LatLng}
   */
  getGeolocations(): google.maps.LatLng[] {
    let geolocs: google.maps.LatLng[] = [];
    for (const residence of this.cityData) {
      geolocs.push(residence.geolocation);
    }
    return geolocs;
  }

  /**
   * Returns the CityResidence object at the specified lat/lng
   * 
   * Used for populating info windows on markers
   * 
   * @param targetGeoloc Lat/lng of targeted city parcel
   * @returns { CityResidence } The CityResidence object at the designated lat/lng
   */
  getParcelByLatLng(targetGeoloc: google.maps.LatLng) {
    return this.cityData.find(a => a.geolocation.equals(targetGeoloc));
  }
}
