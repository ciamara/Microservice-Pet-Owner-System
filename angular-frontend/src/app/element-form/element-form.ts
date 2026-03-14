import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PetService } from '../services/pet';
import {Pet} from '../models/models'

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './element-form.html',
  styleUrl: './element-form.css'
})
export class ElementForm implements OnInit {

  currentPetId: string | null = null;
  currentOwnerId: string | null = null;

  petForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    animal : new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    weight: new FormControl(0.0, [Validators.required]),
    breed: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required])
  });

  constructor(
    private petService: PetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentOwnerId = params.get('owneruuid');
      this.currentPetId = params.get('petuuid');

      if (this.currentPetId) {
        this.loadPetData(this.currentPetId);
      }
    });
  }

  loadPetData(id: string): void {
    this.petService.getPet(id).subscribe({
      next: (data) => {
        this.petForm.patchValue({
          name: data.name,
          animal: data.animal,
          dateOfBirth: data.dateOfBirth,
          weight: data.weight,
          breed: data.breed,
          color: data.color,
          gender: data.gender
        });
      },
      error: (err) => console.error('Error loading pet:', err)
    });
  }

  onSubmit(): void {
    if (!this.currentOwnerId) {
      alert("Owner ID is missing!");
      return;
    }

    if (this.petForm.valid) {
      const formValue = this.petForm.value;

      const petData = {
        name: formValue.name!,
        animal: formValue.animal!,
        dateOfBirth: formValue.dateOfBirth!,
        weight: formValue.weight!,
        breed: formValue.breed!,
        color: formValue.color!,
        gender: formValue.gender!,

        ownerId: this.currentOwnerId
      };

      console.log('Sending Payload:', petData);

      if (this.currentPetId) {
        this.petService.updatePet(this.currentPetId, petData).subscribe({
          next: () => this.router.navigate(['/categories', this.currentOwnerId]),
          error: (err) => console.error(err)
        });
      } else {
        this.petService.createPet(petData).subscribe({
          next: () => this.router.navigate(['/categories', this.currentOwnerId]),
          error: (err) => console.error(err)
        });
      }
    }
  }
}
