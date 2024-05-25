import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
 
  if(req.headers.get('No-Auth')== 'True'){
    return next(req);
  }
  debugger
  if(typeof window !== 'undefined'){
    const authToken = localStorage.getItem('userToken');
    debugger
    if(!authToken){
debugger
    }
    const authReq= req.clone({

      setHeaders:{

        Authorization:`Bearer${authToken}`
      }
    })
    debugger
    return next(authReq)
  }
return next(req) 
 
};



// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable()
// export class authInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const authToken = localStorage.getItem('userToken');
//     debugger

//     if (req.headers.get('No-Auth') === 'True') {
//       return next.handle(req);
//     }

//     if (authToken) {
//       const authReq = req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       return next.handle(authReq);
//     }

//     return next.handle(req);
//   }
// }
