import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userinterface } from '../interfaces/userinterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  apiurl: string = 'http://127.0.0.1:8000/'
  constructor(private http: HttpClient) { }

  addUser(userData: Userinterface): Observable<any> {
    const [year,month,day]=Object.values(userData.dateofbirth)
    Object.assign(userData,{'dateofbirth':`${year}-${month}-${day}`})
    console.log(userData)
    return this.http.post<Userinterface>(`${this.apiurl}createtodouser`, userData)
  }
  getUser(): Observable<any> {
    return this.http.get<Userinterface>(this.apiurl)
  }
}