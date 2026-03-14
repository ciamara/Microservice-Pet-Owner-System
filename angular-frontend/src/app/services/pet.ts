import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/pets';

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  getPet(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  createPet(pet: Partial<Pet>): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  updatePet(id: string, pet: Partial<Pet>): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  deletePet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
