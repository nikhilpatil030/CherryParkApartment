import { CanActivateFn } from '@angular/router';

export const noCacheGuard: CanActivateFn = (route, state) => {
  window.history.replaceState(null, "", window.location.href);
  return true;
};
