import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',  // ✅ Perbaiki 'contentType' ke 'Content-Type'
    Authorization: 'Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczOTE1NDYyNywiZXhwIjoxNzM5MjQxMDI3fQ.RTEOVcS_L3ClPAxFjzO3Xw6G_-mwYq9xH9X5PNiV9KE'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  apiUrlLocal = 'http://localhost:4912';

  constructor(private http: HttpClient) { }
  getCategories(): Observable<any> {
    return this.http.get(this.apiUrlLocal + '/category');
  }

  createCategory(data: any): Observable<any> {
      return this.http.post(this.apiUrlLocal + '/category', data, httpOptions);
    }

  getCategoryById(id: number): Observable<any> {
      return this.http.get(`${this.apiUrlLocal}/category/${id}`, httpOptions);
    }

  updateCategory(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrlLocal}/category/${id}`, data, httpOptions);
    }
  
  deleteCategory(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrlLocal}/category/${id}`, httpOptions);
    }

}