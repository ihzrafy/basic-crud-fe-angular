import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from '../../services/category-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private formBuilder: UntypedFormBuilder,
    private router:Router,
    private restApiService: CategoryServiceService,
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

  editCategory(categoryId: number) {
    this.router.navigate(['/pages/category/edit-category', categoryId]); // Navigasi ke halaman edit
  }

  deleteCategory(categoryId: number) {
      Swal.fire({
          title: "Apakah Anda yakin?",
          text: "Data category ini akan dihapus!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Batal"
      }).then((result) => {
          if (result.isConfirmed) {
              this.restApiService.deleteCategory(categoryId).subscribe({
                  next: () => {
                      Swal.fire("Deleted!", "Category berhasil dihapus.", "success");
                      console.log("Category deleted successfully");
                      this.getCategories(); // Refresh Data
                  },
                  error: (error: any) => {
                      console.error("Error deleting category:", error);
                      Swal.fire("Error!", "Terjadi kesalahan saat menghapus category.", "error");
                  }
              });
          }
      });
  }
}
