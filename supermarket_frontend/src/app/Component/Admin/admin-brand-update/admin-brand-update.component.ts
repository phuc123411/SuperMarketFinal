import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-admin-brand-update',
  templateUrl: './admin-brand-update.component.html',
  styleUrls: ['./admin-brand-update.component.css']
})
export class AdminBrandUpdateComponent {
  brandId: number = 0;
  brand: any = { name: '', description: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.brandId = +params['id']; // Lấy id từ URL
      this.brandService.getBrand(this.brandId).subscribe(data => {
        this.brand = data; // Lấy dữ liệu brand từ service dựa trên id
      });
    });
  }

  updateBrand(): void {
    this.brandService.updateBrand(this.brandId, this.brand).subscribe(() => {
      console.log('Brand updated successfully!');
      this.router.navigate(['/admin/brand']);
    }, error => {
      console.error('Error updating brand:', error);
      // Handle error if needed
    });
  }
}
