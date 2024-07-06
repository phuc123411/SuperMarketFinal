import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeProductService } from 'src/app/Services/attribute-product.service';
import { AttributeValueService } from 'src/app/Services/attribute-value.service';
import { AttributeService } from 'src/app/Services/attribute.service';

@Component({
  selector: 'app-admin-attribute-value-create',
  templateUrl: './admin-attribute-value-create.component.html',
  styleUrls: ['./admin-attribute-value-create.component.css']
})
export class AdminAttributeValueCreateComponent {
  attribute_value = {
    name: '',
    quantity: 0,
    priceIn: 0,
    priceOut: 0,
    attributeId: 0,
    productId: 0,
  };

  attributeProduct = {productId: 0, attributeId: 0};

  attributes: any[] = [];
  productId: number = 0;

  constructor(
    private attributeService: AttributeService,
    private attributeValueService: AttributeValueService,
    private attributeProductService: AttributeProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAttributes();
    this.route.paramMap.subscribe(params => {
      this.productId = +params.get('productId')!;
    });
  }

  loadAttributes(): void {
    this.attributeService.getAttributes().subscribe(
      (data: any[]) => {
        this.attributes = data;
      },
      error => {
        console.error('Error fetching attributes:', error);
      }
    );
  }

  onSubmit(): void {
    this.attributeProduct.productId = this.productId;
    this.attributeProduct.attributeId = this.attribute_value.attributeId;

    this.attributeProductService.createAttributeProduct(this.attributeProduct).subscribe(
      response => {
        console.log('Attribute Product added successfully', response);

        // Sau khi tạo Attribute Product thành công, tiếp tục tạo Attribute Value
        this.attributeValueService.createAttributeValue(this.productId, this.attribute_value).subscribe(
          response => {
            console.log('Attribute Value added successfully', response);
            this.router.navigate(['/admin/product/attribute_value/', this.productId]);
          },
          error => {
            console.error('Error adding Attribute value', error);
          }
        );
      },
      error => {
        console.error('Error adding Attribute Product', error);
      }
    );
  }
}

