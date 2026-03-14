import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pet } from '../models/models';
import { PetService } from '../services/pet';

@Component({
  selector: 'app-element-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './element-details.html',
  styleUrl: './element-details.css'
})
export class ElementDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private petService = inject(PetService);
  private cdr = inject(ChangeDetectorRef);

  pet: Pet | null = null;
  currentOwnerId: string | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.currentOwnerId = this.route.snapshot.paramMap.get('owneruuid');
    const petId = this.route.snapshot.paramMap.get('petuuid');

    if (petId) {
      this.loadPet(petId);
    } else {
      this.errorMessage = 'No Pet ID found in URL.';
    }
  }

  loadPet(id: string): void {
    this.petService.getPet(id).subscribe({
      next: (data) => {
        this.pet = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading pet details:', err);
        this.errorMessage = 'Error loading pet details.';
      }
    });
  }
}
