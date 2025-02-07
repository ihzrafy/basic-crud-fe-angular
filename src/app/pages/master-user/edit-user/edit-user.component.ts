import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';
import { CategoryServiceService } from '../../../services/category-service.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


export interface User {
  id: number;
  title: string;
  description: string;
  category_id: number;
  progress: number;
}

export interface Category {
  id: number;
  category: string;
}

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm!: UntypedFormGroup;
  userId!: number;
  categoriesList: Category[] = []; //  List kategori untuk dropdown

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private categoryService: CategoryServiceService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    

    this.editForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      category_id: [null, [Validators.required]],
      description: ['', [Validators.required]],
      progress: [null, [Validators.required]]
    });
    this.getUserById(this.userId);
    this.getCategories(); // 🔥 Ambil kategori untuk dropdown

    console.log("User ID:", this.userId);
  }

  private getUserById(id: number) {
    this.apiService.getUserById(id).subscribe({
      next: (response) => {
        console.log("User Data Response:", response); //  Debugging
        if (response && response.data) {
          setTimeout(() => { //  Pastikan Angular mendeteksi perubahan
            this.editForm.patchValue(response.data);
            console.log("Form Updated with:", this.editForm.value);
          });
        } else {
          console.error("Invalid response format:", response);
        }
      },
      error: (error) => {
        console.error("Error fetching user:", error);
      }
    });
  }
  
  
  

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categoriesList = data.data; // Simpan kategori ke array
        console.log("Categories:", this.categoriesList);
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      }
    });
  }

  onSubmitEdit() {
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
                this.apiService.updateUser(this.userId, this.editForm.value).subscribe({
                    next: () => {
                        Swal.fire("Berhasil!", "Data berhasil diperbarui.", "success");
                        console.log("User updated successfully");
                        this.router.navigate(['/pages/master-user']); // Kembali ke halaman utama
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
