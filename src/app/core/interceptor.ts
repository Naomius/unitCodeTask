import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Injectable()
export class CancelSameRequestInterceptor implements HttpInterceptor {
  private cache = new Map<string, Subject<void>>();

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const url = request.url;

    const cachedResponse = this.cache.get(url);

    if (cachedResponse) {
      cachedResponse.next();
    }

    const cancelRequests$ = new Subject<void>();

    this.cache.set(url, cancelRequests$);

    const newRequest = next.handle(request).pipe(

      takeUntil(cancelRequests$),

      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.delete(url);
        }
      })
    );

    return newRequest;

  }
}
