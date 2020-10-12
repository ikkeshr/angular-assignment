import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) {}

  public loadEvents(): Observable<any> {
    return this.http.get("../assets/json/events.json");
  }

  public loadEventById(id: number): Observable<any> {
    return this.http.get("../assets/json/events.json").pipe(
      map ((response: any) => {
        if (response) {
          return response.filter(event => event.event_id == id).pop();
        }
      })
    );
  }

}
