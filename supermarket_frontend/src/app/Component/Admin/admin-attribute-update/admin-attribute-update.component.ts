import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeService } from 'src/app/Services/attribute.service';

@Component({
  selector: 'app-admin-attribute-update',
  templateUrl: './admin-attribute-update.component.html',
  styleUrls: ['./admin-attribute-update.component.css']
})
export class AdminAttributeUpdateComponent {
  attributeId: number = 0;
  attribute: any = { name: ''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private attributeService: AttributeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.attributeId = +params['id']; // Lấy id từ URL
      this.attributeService.getAttribute(this.attributeId).subscribe(data => {
        this.attribute = data; // Lấy dữ liệu attribute từ service dựa trên id
      });
    });
  }

  updateAttribute(): void {
    this.attributeService.updateAttribute(this.attributeId, this.attribute).subscribe(() => {
      console.log('Attribute updated successfully!');
      this.router.navigate(['/admin/attribute']);
    }, error => {
      console.error('Error updating attribute:', error);
      // Handle error if needed
    });
  }
}
