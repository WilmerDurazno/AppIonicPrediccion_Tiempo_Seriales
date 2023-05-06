import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private apiUrl = 'http://127.0.0.1:8080';  // Asegúrate de que la URL coincida con la dirección del servidor Flask

  constructor(private http: HttpClient) { }

  getPrediction(nacionalidad: string, mes: number, anio: number): Observable<any> {
    const body = { nacionalidad: nacionalidad, mes: mes, anio: anio };
    return this.http.post<any>(`${this.apiUrl}/predict`, body);
  }
}
