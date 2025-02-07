import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "../../services/api-service.service";
import { CategoryServiceService } from '../../services/category-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-master-user',
  standalone: false,
  templateUrl: './master-user.component.html',
  styleUrls: ['./master-user.component.css']
})
export class MasterUserComponent implements OnInit {
  userData: User[] = [];
  categoriesList: Category[] = []; // 🔥 List kategori untuk dropdown
  displayedColumns: string[] = ['id', 'title', 'description'];
  modalAdd: any;
  addForm!: UntypedFormGroup;

  get af() {
    return this.addForm.controls;
  }

  constructor(
    private restApiService: ApiServiceService, 
    private categoryService: CategoryServiceService, // 🔥 Inject CategoryService
    private modalService: NgbModal, 
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getCategories(); // 🔥 Ambil data kategori

    this.addForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'category_id': [null, [Validators.required]],
      'description': ['', [Validators.required]],
      'progress': [null, [Validators.required]]
    });
  }

  private getEmployees() {
    this.restApiService.getUser().subscribe({
      next: (data) => {
        this.userData = data.data;
        console.log(this.userData);
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categoriesList = data.data; //  Simpan kategori ke array
        console.log("Categories:", this.categoriesList);
      },
      error: (error) => {
        console.error("Error fetching categories:", error);
      }
    });
  }

  addButton(content: any) {
    this.modalService.open(content, { size: 'xl', centered: true });
  }

  onSubmit() {
    this.addForm.markAllAsTouched();

    if (this.addForm.valid) {
        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data akan ditambahkan!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#28a745",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Tambahkan!",
            cancelButtonText: "Batal"
        }).then((result) => {
            if (result.isConfirmed) {
                let requestData = this.addForm.value;
                requestData.category_id = Number(requestData.category_id); // Konversi ke number

                console.log("Data yang dikirim ke backend:", requestData); // Debugging

                this.restApiService.createData(requestData).subscribe({
                    next: (data: any) => {
                        Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
                        console.log("Response dari backend:", data);
                        this.addForm.reset();
                        this.modalService.dismissAll();
                        this.getEmployees();
                    },
                    error: (error: any) => {
                        console.error("Terjadi error:", error);
                        Swal.fire("Error!", "Terjadi kesalahan saat menambahkan data.", "error");
                    }
                });
            }
        });
    }
}

  editUser(userId: number) {
    this.router.navigate(['/pages/master-user/edit-user', userId]); // Navigasi ke halaman edit
  }

  // 🔥 Delete User Function
  deleteUser(userId: number) {
    Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Data user ini akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            this.restApiService.deleteUser(userId).subscribe({
                next: () => {
                    Swal.fire("Deleted!", "User berhasil dihapus.", "success");
                    console.log("User deleted successfully");
                    this.getEmployees(); // Refresh Data
                },
                error: (error) => {
                    console.error("Error deleting user:", error);
                    Swal.fire("Error!", "Terjadi kesalahan saat menghapus user.", "error");
                }
            });
        }
    });
}


}

