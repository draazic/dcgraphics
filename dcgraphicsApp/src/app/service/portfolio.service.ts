import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Portfolio }  from '../interface/portfolio.interface';
import { Observable, of } from 'rxjs';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

@Injectable()
export class PortfolioService {

  baseUrl:string ="http://localhost:3000/api";

  constructor(private http: HttpClient) { }

getPortfolios():Observable<Portfolio[]> {
    return this.http.get<Portfolio[]>(this.baseUrl + '/portfolios');
}
createPortfolio(portfolio:Portfolio):Observable<Object>{
  console.log(portfolio)
  return this.http.post(this.baseUrl + '/uploadfile',portfolio);
}
// createPortfolio(portfolio:Portfolio):Observable<Object>{
//     //const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.httpClient
//       .post(this.baseUrl, formData, { headers: yourHeadersConfig })
//       .map(() => { return true; })
//       .catch((e) => this.handleError(e));
//   //return this.http.post(this.baseUrl + '/uploadfile',portfolio);
// }

deletePortfolio(id:number):Observable<Portfolio[]>{
    return this.http.delete<Portfolio[]>(this.baseUrl + '/portfolio/'+id);

  }

}