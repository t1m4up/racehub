import { FormAction, RouteMeta } from '@analogjs/router';
import { Component, computed, signal } from '@angular/core';

type FormErrors =
  | {
      email?: string;
      password?: string;
    }
  | undefined;

export const routeMeta: RouteMeta = {
  title: 'Login',
};

@Component({
  selector: 'app-login-page',
  imports: [FormAction],
  template: `
    <h2>Login</h2>

    <form
      method="post"
      (onSuccess)="onSuccess()"
      (onError)="onError($any($event))"
      (onStateChange)="errors.set(undefined)"
    >
      <label for="email">Email</label>
      <input id="email" type="email" name="email" />

      <br />

      <label for="password">Password</label>
      <input id="password" type="password" name="password" />

      <br />

      <button class="button" type="submit">Log in</button>
    </form>

    @if (messages().length) {
    <ul>
      @for (message of messages(); track $index) {
      <li>{{ message }}</li>
      }
    </ul>
    }
  `,
  styles: `
    form { 
      display: flex;
      padding: 4px;
      flex-direction: column;
    }
  `,
})
export default class LoginPage {
  signedUp = signal(false);
  errors = signal<FormErrors>(undefined);
  messages = computed(() => Object.values(this.errors() ?? {}));

  onSuccess() {
    this.signedUp.set(true);
  }

  onError(result?: FormErrors) {
    this.errors.set(result);
  }
}
