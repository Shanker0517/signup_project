import { inject } from '@angular/core';
import {
  // ActivatedRouteSnapshot,
  // RouterStateSnapshot,
  Router,
  CanActivateFn
} from '@angular/router';
import { UserserviceService } from '../Services/userservice.service';
export const guardGuard: CanActivateFn = (route, state) => {
  const userservices = inject(UserserviceService)
  const router = inject(Router)
  if (userservices.isAuthenitcated()) {
    // router.navigateByUrl('/home')
    return true
  }
  else {
    // router.navigateByUrl('/login')
    return false
  }
};
