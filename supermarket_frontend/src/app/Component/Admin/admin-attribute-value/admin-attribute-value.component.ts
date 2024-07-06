import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { AttributeService } from 'src/app/Services/attribute.service';

@Component({
  selector: 'app-admin-attribute-value',
  templateUrl: './admin-attribute-value.component.html',
  styleUrls: ['./admin-attribute-value.component.css']
})
export class AdminAttributeValueComponent {
  attributeValues: any[] = [];

  constructor(
    private attributeValueService: AttributeValueService,
    private route: ActivatedRoute,
    private attributeService: AttributeService
  ) { }

  productId: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('productId')!;
    });
    this.loadAttributeValues();
  }

  loadAttributeValues(): void {
    this.attributeValueService.getAttributeValues(this.productId).subscribe(
      (attributeValues: any[]) => {
        this.attributeValues = attributeValues;

        if (this.attributeValues && this.attributeValues.length > 0) {
          const attributeId = this.attributeValues[0].attributeId; // Lấy attributeId từ phần tử đầu tiên
          this.attributeService.getAttribute(attributeId).subscribe(
            (attribute: any) => {
              // Gán tên thuộc tính vào từng phần tử của attributeValues
              this.attributeValues.forEach(attrValue => {
                attrValue.attributeName = attribute.name;
              });
            },
            error => {
              console.error('Error fetching attribute:', error);
            }
          );
        }
      },
      error => {
        console.error('Error fetching attribute values:', error);
      }
    );
  }


  deleteAttributeValue(id: number): void {
    if (confirm('Are you sure you want to delete this attribute value?')) {
      this.attributeValueService.deleteAttributeValue(this.productId,id).subscribe(
        response => {
          console.log('Attribute value deleted successfully');
          // Reload attribute values after deletion
          this.loadAttributeValues();
        },
        error => {
          console.error('Error deleting attribute value:', error);
        }
      );
    }
  }
}
