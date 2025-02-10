import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormBuilder, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../../../services/category-service.service';
import { response } from 'express';
import Swal from 'sweetalert2';


export interface Category {
  id: number;
  category: string;
}

@Component({
  selector: 'app-edit-category',
  standalone: false,
  
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})


export class EditCategoryComponent implements OnInit{
  editForm!: UntypedFormGroup;
  categoryId!: number;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ){}
  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    this.editForm = this.formBuilder.group({
      category: ['', [Validators.required]],
    });
    this.getCategoryById(this.categoryId);

    console.log("Category ID:", this.categoryId);
  }

  private getCategoryById(id: number){
    this.categoryService.getCategoryById(id).subscribe({
      next: (response) => {
        console.log("User Data Response:", response);
        if(response && response.data){
          setTimeout(() => {
            this.editForm.patchValue(response.data);
            console.log("Form Updated with:", this.editForm.value);
          });
        }else {
          console.error("Invalid response format:", response);
        }
      },
      error: (error) => {
        console.error("Error fetching user:", error);
      }
    });
  }

  onSubmitCategory() {
      this.editForm.markAllAsTouched();
  
      if (this.editForm.valid) {
          Swal.fire({
              title: "Apakah Anda yakin?",
              text: "Perubahan akan disimpan!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#28a745",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ya, Ubah!",
              cancelButtonText: "Batal"
          }).then((result) => {
              if (result.isConfirmed) {
                  this.categoryService.updateCategory(this.categoryId, this.editForm.value).subscribe({
                      next: () => {
                          Swal.fire("Berhasil!", "Data berhasil diperbarui.", "success");
                          console.log("User updated successfully");
                          this.router.navigate(['/pages/category']); // Kembali ke halaman utama
                      },
                      error: (error) => {
                          console.error("Error updating user:", error);
                          Swal.fire("Error!", "Terjadi kesalahan saat memperbarui data.", "error");
                      }
                  });
              }
          });
      }
  }
}










