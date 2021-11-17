import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_SERVER = "http://localhost:8080/api/v1/";

  constructor(private httpClient: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(this.API_SERVER + "user")
  }

  public saveUser(user: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + "user", user);
  }

  public deleteUser(id: any): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "user/" + id);
  }

  public getUser(id: any): Observable<any>{
    return this.httpClient.get(this.API_SERVER + "user/" + id);
  }

  public updateUser(id: any, user: any): Observable<any>{
    return this.httpClient.put(this.API_SERVER + "user/" + id, user);
  }

}
