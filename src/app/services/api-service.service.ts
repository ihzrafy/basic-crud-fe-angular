import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiZW1haWwiOiJqb2huLmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTczOTE1NDYyNywiZXhwIjoxNzM5MjQxMDI3fQ.RTEOVcS_L3ClPAxFjzO3Xw6G_-mwYq9xH9X5PNiV9KE'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrlLocal = 'http://localhost:4912';

  constructor(private http: HttpClient) { }

  //  Get All Users
  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todos`);
  }

  //  Get User by ID
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrlLocal}/todos/${id}`, httpOptions);
  }

  //  Create Data
  createData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrlLocal}/todos`, data, httpOptions);
  }

  //  Update User by ID
  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrlLocal}/todos/${id}`, data, httpOptions);
  }

  //  Delete User by ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrlLocal}/todos/${id}`, httpOptions);
  }
}
