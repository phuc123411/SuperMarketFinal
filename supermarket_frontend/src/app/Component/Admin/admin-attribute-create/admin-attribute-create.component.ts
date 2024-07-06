import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AttributeService } from 'src/app/Services/attribute.service';

@Component({
  selector: 'app-admin-attribute-create',
  templateUrl: './admin-attribute-create.component.html',
  styleUrls: ['./admin-attribute-create.component.css']
})
export class AdminAttributeCreateComponent {
  attribute: any = { name: ''};

  constructor(private router: Router, private atrributeService: AttributeService) {}

  onSubmit(): void {
    this.atrributeService.createAttribute(this.attribute).subscribe(() => {
      console.log('Attribute added successfully!');
      this.resetForm();
      this.router.navigate(['/admin/attribute']);
    }, error => {
      console.error('Error adding attribute:', error);
    });
  }

  resetForm(): void {
    this.attribute = { name: ''};
  }
}
