import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-category-create',
  templateUrl: './admin-category-create.component.html',
  styleUrls: ['./admin-category-create.component.css']
})
export class AdminCategoryCreateComponent {
  category: any = { name: '', description: '' };

  constructor(private router: Router, private categoryService: CategoryService) {}

  onSubmit(): void {
    this.categoryService.createCategory(this.category).subscribe(() => {
      console.log('Category added successfully!');
      this.resetForm();
      this.router.navigate(['/admin/category']);
    }, error => {
      console.error('Error adding category:', error);
    });
  }

  resetForm(): void {
    this.category = { name: '', description: '' };
  }
}
