import { RouteMeta } from '@analogjs/router';
import { Component } from '@angular/core';
import { isAuthenticatedGuard } from '../session.guard';

export const routeMeta: RouteMeta = {
  canActivate: [() => isAuthenticatedGuard()],
};

@Component({
  selector: 'app-protected-page',
  template: ` <h2>Protected Page</h2> `,
  styles: `
    form { 
      display: flex;
      padding: 4px;
      flex-direction: column;
    }
  `,
})
export default class ProtectedPage {}
