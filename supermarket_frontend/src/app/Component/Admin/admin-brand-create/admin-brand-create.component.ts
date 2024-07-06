import { BrandService } from 'src/app/Services/brand.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-brand-create',
  templateUrl: './admin-brand-create.component.html',
  styleUrls: ['./admin-brand-create.component.css']
})
export class AdminBrandCreateComponent {
  brand: any = { name: '', description: '' };

  constructor(private router: Router, private brandService: BrandService) {}

  onSubmit(): void {
    this.brandService.createBrand(this.brand).subscribe(() => {
      console.log('Brand added successfully!');
      this.resetForm();
      this.router.navigate(['/admin/brand']);
    }, error => {
      console.error('Error adding brand:', error);
    });
  }

  resetForm(): void {
    this.brand = { name: '', description: '' };
  }

}
