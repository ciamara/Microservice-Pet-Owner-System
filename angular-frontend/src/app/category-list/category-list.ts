import {Component, OnInit, inject, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OwnerService } from '../services/owner';
import { Owner } from '../models/models';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {

  private ownerService = inject(OwnerService);
  private cdr = inject(ChangeDetectorRef);

  owners: Owner[] = [];

  ngOnInit(): void {
    this.loadOwners();
  }

  loadOwners(): void {
    this.ownerService.getOwners().subscribe({
      next: (data) => {
        this.owners = data;
        this.cdr.detectChanges();
        console.log('Pobrano właścicieli:', data);
      },
      error: (err) => console.error('Błąd pobierania:', err)
    });
  }

  deleteOwner(id: string): void {
    if(confirm('Czy na pewno chcesz usunąć tę kategorię?')) {
      this.ownerService.deleteOwner(id).subscribe(() => {
        this.loadOwners();
      });
    }
  }
}
