import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private _http: HttpClient
  ) { }

  uploadFile(file: Blob): Observable<any> {
    return this._http.post(`${environment.apiUrl}/files`, file)
  }
}
