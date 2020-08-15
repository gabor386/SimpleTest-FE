import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileCV } from '../model/FileCV';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) { }

  url;
  uploadFile(fd, id) {
    return this.httpClient.post<FileCV>(`${environment.BASE_URL}/file/${id}`, fd);
  }

  deleteFile(id) {
    return this.httpClient.delete(`${environment.BASE_URL}/file/${id}`);
  }

  downloadFile(id) {
    return this.httpClient.get(`${environment.BASE_URL}/file/${id}`, {responseType: 'blob' });
  }
}