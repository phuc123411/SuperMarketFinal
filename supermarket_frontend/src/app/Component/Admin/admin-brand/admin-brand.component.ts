import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/Services/brand.service';


@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.css']
})
export class AdminBrandComponent implements OnInit {
  brands: any[] = [];
  brand: any = { id: 0, name: '', description: '' };
  isEdit: boolean = false;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  loadBrands(): void {
    this.brandService.getBrands().subscribe((data: any[]) => {
      this.brands = data;
    });
  }

  deleteBrand(id: number): void {
    if (confirm('Are you sure you want to delete this brand?')) {
      this.brandService.deleteBrand(id).subscribe(() => {
        console.log('Brand deleted successfully!');
        // Refresh brands list after deletion
        this.loadBrands();
      }, error => {
        console.error('Error deleting brand:', error);
        // Handle error if needed
      });
    }
  }
}
