import { Component } from '@angular/core';
import { AttributeService } from 'src/app/Services/attribute.service';

@Component({
  selector: 'app-admin-attribute',
  templateUrl: './admin-attribute.component.html',
  styleUrls: ['./admin-attribute.component.css']
})
export class AdminAttributeComponent {
  attributes: any [] = [];
  attribute: any = { id: 0, name: '', RowDelete: 0 };

  constructor(private attributeService: AttributeService) {}

  ngOnInit(): void {
    this.loadAttributes();
  }

  loadAttributes(): void{
    this.attributeService.getAttributes().subscribe((data: any[]) => {
      this.attributes = data;
    })
  }

  deleteAttribute(id: number): void {
    if (confirm('Are you sure you want to delete this attribute?')) {
      this.attributeService.deleteAttribute(id).subscribe(() => {
        console.log('Attribute deleted successfully!');
        this.loadAttributes();
      }, error => {
        console.error('Error deleting brand:', error);
      });
    }
  }
}
