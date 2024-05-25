import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = localStorage.getItem('userToken');
 
  if(req.headers.get('No-Auth')== 'True'){
    return next(req);
  }
  debugger
  if(typeof window !== 'undefined'){
    debugger
//     if(!authToken){s
// debugger
//     }
    const authToken = localStorage.getItem('userToken');
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





