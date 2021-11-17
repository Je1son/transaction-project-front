import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private API_SERVER = "http://localhost:8080/api/v1/user/";

  constructor(private httpClient: HttpClient) { }

  public getCardsByUser(id: any): Observable<any> {
    return this.httpClient.get(this.API_SERVER + id + "/card");
  }

  public saveCard(id: any, card: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER + id + "/card", card);
  }

  public deleteCard(id: any): Observable<any>{
    return this.httpClient.delete("http://localhost:8080/api/v1/card/" + id);
  }

  public getCard(idUser: any, idCard: any): Observable<any>{
    return this.httpClient.get(this.API_SERVER + idUser + "/card/" + idCard);
  }

  public updateCard(idUser: any, idCard: any, card: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER + idUser + "/card/" + idCard, card);
  }

}
