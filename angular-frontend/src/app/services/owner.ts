import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Owner, Pet } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/owners';

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.apiUrl);
  }

  getOwner(id: string): Observable<Owner> {
    return this.http.get<Owner>(`${this.apiUrl}/${id}`);
  }

  createOwner(owner: Partial<Owner>): Observable<Owner> {
    return this.http.post<Owner>(this.apiUrl, owner);
  }

  updateOwner(id: string, owner: Partial<Owner>): Observable<Owner> {
    return this.http.put<Owner>(`${this.apiUrl}/${id}`, owner);
  }

  deleteOwner(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPetsByOwner(ownerId: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/${ownerId}/pets`);
  }
}
