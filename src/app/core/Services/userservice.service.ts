import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userinterface } from '../../interfaces/userinterface';
import { Observable, catchError, map, throwError } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';
import { error } from 'console';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  apiurl: string = 'http://127.0.0.1:8000/'
  tokenDetails!:any
  constructor(private http: HttpClient, private router:Router) { }

  login(loginData:any): Observable<any>{
    return this.http.post<Userinterface>(`${this.apiurl}login`,loginData ).pipe(
      map((response:any) => {
        this.storeTokens(response.data)
        return response;
      }),
      catchError((error) => throwError(() => error))
    )
  }
  private storeTokens(token:any){
    if (token){
      this.setTokenDetails(token.access);
      localStorage.setItem('access_token',token.access)
      localStorage.setItem('refresh_token',token.refresh)
    }
  }
  
  setTokenDetails(jwttoken:any):void{
    this.tokenDetails=jwtDecode(jwttoken)
  }
  // get access token 
  getAccessToken(){
    if (typeof localStorage === 'undefined'){
      this.router.navigateByUrl('/login')
      return false
    }
      if (localStorage.getItem('access_token')){
        return localStorage.getItem('access_token')
      }
      else{
        this.router.navigateByUrl('/login')
        return false
      }    
  }
  // is loggedin
  isAuthenitcated():boolean{
    let accessToken=this.getAccessToken();
    if (accessToken){
      return true
    }
    else{
      this.router.navigateByUrl('/login');
      return false;

    }
  }
   
  
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