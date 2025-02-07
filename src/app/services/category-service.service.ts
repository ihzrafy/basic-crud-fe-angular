import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',  // ✅ Perbaiki 'contentType' ke 'Content-Type'
    Authorization: 'Berear eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczODgxMDYxOSwiZXhwIjoxNzM4ODk3MDE5fQ.1PBSax9ZqS7np2KhT2d7ISzxJig8z-AqVVpAlilSSyI'
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

}