import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

/**
 * Description: Service that provides generic methods for http requests
 * @Date: 2023-03-24
 * @Author: John Buitrago
 * @service
 */
@Injectable({ providedIn: 'root' })
export class HttpGenericService {

  /**
   * Description: Inject the http dependency of type HttpClient that is used in methods of type http request
   * @Date: 2023-03-24
   * @Author: John Buitrago
   * @param {HttpClient} http
   * @constructor
   */
  constructor(private http: HttpClient) { }

  /**
   * Description: Get method for http get requests using the HttpClient component of the @angular/common/http package
   * @Date: 2023-03-24
   * @Author: John Buitrago
   * @param {string} sUrl
   * @param {HttpParams} params optional
   * @param {HttpHeaders} headers optional
   * @returns {Observable<T>} Observable that receives an http get response
   * @method
   * @public
   */
  public get<T>(sUrl: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {

    let options;
    switch (true) {
    case params !== undefined && headers !== undefined:
      options = { headers, params };
      break;
    case params !== undefined:
      options = { params };
      break;
    default:
      options = {};
      break;
    }

    return this.http.get<T>(sUrl, options).pipe(
      tap(() => console.log(`fetched get: ${sUrl}`)),
      catchError((err) => this.handleError(`get: ${sUrl}`, err))
    );
  }

  /**
   * Description: Put method for http put requests using the HttpClient component of the @angular/common/http package
   * @Date: 2023-03-24
   * @Author: John Buitrago
   * @param {string} sUrl
   * @param {any} body
   * @returns {Observable<T>} Observable that receives an http put response
   * @method
   * @public
   */
  public put<T>(sUrl: string, body: any): Observable<T> {
    return this.http.put<T>(sUrl, body).pipe(
      tap(() => console.log(`fetched put: ${sUrl}`)),
      catchError((err) => this.handleError(`put: ${sUrl}`, err))
    );
  }

  /**
   * Description: Post method for http post requests using the HttpClient component of the @angular/common/http package
   * @Date: 2023-03-24
   * @Author: John Buitrago
   * @param {string} sUrl
   * @param {any} body
   * @param {HttpHeaders} headers optional
   * @param {string} responseType optional
   * @returns {Observable<T>} Observable that receives an http post response
   * @method
   * @public
   */
  public post<T>(sUrl: string, body: any, headers?: HttpHeaders, responseType?: any): Observable<T> {
    return this.http.post<T>(sUrl, body, { headers, responseType }).pipe(
      tap(() => console.log(`fetched post: ${sUrl}`)),
      catchError((err) => this.handleError(`post: ${sUrl}`, err))
    );
  }

  /**
   * Description: Delete method for http delete requests using the HttpClient component of the @angular/common/http package
   * @Date: 2023-03-24
   * @Author: John Buitrago
   * @param {string} sUrl
   * @param {HttpHeaders} headers optional
   * @param {string} responseType optional
   * @returns {Observable<string>} Observable that receives an http post response
   * @method
   * @public
   */
  public delete(sUrl: string, headers?: HttpHeaders, responseType?: any): Observable<string> {
    return this.http.delete(sUrl, { headers, responseType }).pipe(
      tap(() => console.log(`fetched delete: ${sUrl}`)),
      catchError((err) => this.handleError(`delete: ${sUrl}`, err))
    );
  }

  /**
   * Description: Method used to display the error on the console and issue a throwError in case an http request fails
   * @Date: 2023-03-24
   * @Author: John Buitrago
   * @param {string} proceso
   * @param {HttpErrorResponse} error
   * @returns {Observable<any>} Observable that receives a throwError error
   * @method
   * @public
   */
  public handleError(proceso: string, error: HttpErrorResponse): Observable<any> {
    console.log(`Failed ${proceso} - Error ${error.message}`);
    return of({ error: true });
  }
}
