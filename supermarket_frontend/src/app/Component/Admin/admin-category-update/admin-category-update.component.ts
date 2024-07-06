import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css']
})
export class AdminCategoryUpdateComponent {
  categoryId: number = 0;
  category: any = { name: '', description: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = +params['id']; // Lấy id từ URL
      this.categoryService.getCategory(this.categoryId).subscribe(data => {
        this.category = data; // Lấy dữ liệu brand từ service dựa trên id
      });
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.categoryId, this.category).subscribe(() => {
      console.log('Category updated successfully!');
      this.router.navigate(['/admin/category']);
    }, error => {
      console.error('Error updating category:', error);
      // Handle error if needed
    });
  }
}
