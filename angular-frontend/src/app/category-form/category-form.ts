import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { OwnerService } from '../services/owner';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css'
})
export class CategoryForm implements OnInit {

  currentId: string | null = null;

  ownerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    surname: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl(0, [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required])
  });

  constructor(
    private ownerService: OwnerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentId = params.get('uuid');

      if (this.currentId) {
        this.loadOwnerData(this.currentId);
      }
    });
  }

  loadOwnerData(id: string): void {
    this.ownerService.getOwner(id).subscribe({
      next: (data) => {
        this.ownerForm.patchValue({
          name: data.name,
          surname: data.surname,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth,
          address: data.address
        });
      },
      error: (err) => console.error('Błąd pobierania właściciela:', err)
    });
  }

  onSubmit(): void {
    if (this.ownerForm.valid) {
      const formValue = this.ownerForm.value;

      const ownerData = {
        name: formValue.name!,
        surname: formValue.surname!,
        phoneNumber: formValue.phoneNumber!,
        dateOfBirth: formValue.dateOfBirth!,
        address: formValue.address!
      };

      if (this.currentId) {
        this.ownerService.updateOwner(this.currentId, ownerData).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => alert('Błąd edycji.')
        });
      } else {
        this.ownerService.createOwner(ownerData).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err) => alert('Błąd tworzenia.')
        });
      }
    }
  }
}
