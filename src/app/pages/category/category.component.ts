import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../../services/category-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

export interface Category {
  id: number;
  category: string;
}

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categoryData: Category[] = [];
  categoryForm!: UntypedFormGroup;

  get af() {
    return this.categoryForm.controls;
  }

  constructor(
    private categoryService: CategoryServiceService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.getCategories();

   
    this.categoryForm = this.formBuilder.group({
      
      'category': ['', [Validators.required]]
    });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categoryData = data.data; // ⚠️ Periksa apakah API membungkus data di dalam "data"
        console.log("Data Category:", this.categoryData);
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      }
    });
  }

  addCategory(content: any) {
    this.modalService.open(content, { size: 'md', centered: true });
  }

  onSubmitCategory() {
    this.categoryForm.markAllAsTouched();

    if (this.categoryForm.valid) {
      let requestData = { ...this.categoryForm.value };

      console.log("Data yang dikirim ke backend:", requestData); // 🔍 Debugging

      this.categoryService.createCategory(requestData).subscribe({
        next: (data: any) => {
          console.log("Response dari backend:", data);
          this.categoryForm.reset();
          this.modalService.dismissAll();
          this.getCategories();
        },
        error: (error: any) => {
          console.error("Terjadi error:", error);
        }
      });
    }
  }
}
