import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedInResponse, LoginVM } from '../../shared/models/LoginVM';
import { devEnv } from '../../environment/dev.environment';
import { RegisterVM } from '../../shared/models/registerVM';

@Injectable({
  providedIn: 'root'
})
export class BarberiaService {

  private readonly baseURL: string = devEnv.apiUrl;
  private jwtToken: string | null = null; 
  constructor(private http: HttpClient) { }

  login = (request: LoginVM): Observable<LoggedInResponse> => {
    return this.http.post<LoggedInResponse>(`${this.baseURL}/Auth/Login`, request);
  }

  signup = (request: RegisterVM): Observable<any> => {
    return this.http.post<any>(`${this.baseURL}/Auth/register`, request);
  }

  getJWTToken = () => {
    if(this.jwtToken) return this.jwtToken;
    this.jwtToken = sessionStorage.getItem('token');
    return this.jwtToken;
  }
}
