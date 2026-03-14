import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Owner, Pet } from '../models/models';
import { OwnerService } from '../services/owner';
import { PetService } from '../services/pet';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-details.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private ownerService = inject(OwnerService);
  private petService = inject(PetService);
  private cdr = inject(ChangeDetectorRef);

  owner: Owner | null = null;
  pets: Pet[] = [];
  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('uuid');

    if (id) {
      this.loadData(id);
    } else {
      this.errorMessage = 'Nie znaleziono ID właściciela w URL.';
    }
  }

  loadData(ownerId: string) {
    forkJoin({
      ownerRequest: this.ownerService.getOwner(ownerId),
      petsRequest: this.ownerService.getPetsByOwner(ownerId)
    })
      .subscribe({
        next: (result) => {
          this.owner = result.ownerRequest;
          this.pets = result.petsRequest;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading details:', err);
          this.errorMessage = 'Wystąpił błąd podczas pobierania danych.';
        }
      });
  }

  deletePet(pet: Pet): void {
    if (confirm(`Are you sure you want to delete ${pet.name}?`)) {

      this.petService.deletePet(pet.petId).subscribe({
        next: () => {
          this.pets = this.pets.filter(p => p.petId !== pet.petId);
          console.log('Pet deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting pet', err);
          alert('Could not delete pet.');
        }
      });

    }
  }

  editPet(petId: string): void {

  }
}
