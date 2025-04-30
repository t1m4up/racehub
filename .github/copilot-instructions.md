# .github/copilot-instructions.md

# Instructions for GitHub Copilot: Analog.js Project

## About Me

I am an AI assistant specialized in developing modern web applications using Analog.js, Angular 19, and Nitro. I am programmed to help you create performant, maintainable web applications following development best practices.

## About This Project

This project uses Analog.js, a meta-framework for Angular that combines the best of Angular with the capabilities of modern file-system based frameworks. This project integrates:

- Analog.js as the main meta-framework
- Angular 19 with its modern features
- Nitro for backend APIs
- Vite as bundler for optimal performance
- Supabase for backend services

## Technical Knowledge

### Analog.js Architecture

Analog.js is a meta-framework that brings modern meta-framework features to Angular. It uses a file-based routing system, integrates Vite for fast development and optimized builds, and supports Server-Side Rendering (SSR) and Static Site Generation (SSG).

### Application Structure

```
/my-app
├── analog.config.ts       // Analog.js configuration
├── vite.config.ts         // Vite configuration
├── src/
│   ├── app/
│   │   ├── pages/         // File-based pages
│   │   │   ├── index.page.ts    // Home page
│   │   │   └── [id].page.ts     // Dynamic page with parameter
│   │   ├── components/    // Reusable components
│   │   ├── services/      // Angular services
│   │   └── models/        // Interfaces and types
│   ├── server/
│   │   └── routes/        // Nitro API routes
│   │       └── api/
│   │           └── [...].ts
│   └── main.ts            // Entry point
├── public/                // Static files
└── tests/                 // Tests

```

### File-Based Routing

Routes are automatically created from the file structure in the `pages` folder:

- `src/app/pages/index.page.ts` → `/`
- `src/app/pages/about.page.ts` → `/about`
- `src/app/pages/blog/[slug].page.ts` → `/blog/:slug`
- `src/app/pages/blog/index.page.ts` → `/blog`

Example:

```tsx
// src/app/pages/index.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Welcome to Analog.js!</h1>
    <p>This is the home page.</p>
  `,
})
export default class HomePageComponent {}

```

Dynamic route example:

```tsx
// src/app/pages/[id].page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Details Page</h1>
    <p>ID: {{ id }}</p>
  `,
})
export default class DetailsPageComponent {
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
}

```

### Angular 19 - Modern Features

### Signals

Signals are a next-generation reactivity system that enables granular updates for better performance:

```tsx
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <h2>Counter: {{ count() }}</h2>
    <p>Doubled: {{ doubled() }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  increment() {
    this.count.update(value => value + 1);
  }
}

```

### @defer

The @defer directive allows lazy loading components to improve initial performance:

```tsx
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Main Content</h1>

    @defer {
      <app-heavy-component />
    } @loading {
      <p>Loading...</p>
    }
  `,
})
export default class HomeComponent {}

```

### Control Flow

New directives @if and @for replace *ngIf and *ngFor with better performance and improved syntax:

```tsx
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `
    <h2>User List</h2>

    @if (users().length > 0) {
      <ul>
        @for (user of users(); track user.id) {
          <li>{{ user.name }}</li>
        } @empty {
          <li>No users available</li>
        }
      </ul>
    } @else {
      <p>Loading users...</p>
    }
  `,
})
export class UserListComponent {
  users = signal([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
}

```

### HttpResource

HttpResource simplifies HTTP requests with a declarative approach. It's a modern Angular feature for seamless data fetching:

```tsx
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { injectHttpResource } from '@analogjs/resource';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (users.result(); as users) {
      <ul>
        @for (user of users; track user.id) {
          <li>{{ user.name }} ({{ user.email }})</li>
        }
      </ul>
    } @else if (users.loading()) {
      <p>Loading users...</p>
    } @else if (users.error(); as error) {
      <p>Error: {{ error }}</p>
    }
  `,
})
export default class UsersComponent {
  users = injectHttpResource<User[]>('/api/users');
}

```

Key features of httpResource:

- Automatic loading states
- Error handling
- Data refetching
- Cache management
- Seamless server-side rendering integration
- Type safety with generics
- Mutations and optimistic updates

### API with Nitro and Vite

Nitro is a backend framework that integrates perfectly with Analog.js to create robust APIs:

```tsx
// src/server/routes/api/users.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  // Retrieve users from database
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  return users;
});

```

Dynamic API route:

```tsx
// src/server/routes/api/users/[id].ts
import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params.id);

  // Simulate retrieval from a database
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ];

  const user = users.find(u => u.id === id);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: `User with id ${id} not found`,
    });
  }

  return user;
});

```

Middleware example:

```tsx
// src/server/middleware/auth.ts
import { defineEventHandler } from 'h3';

export default defineEventHandler((event) => {
  // Simple authentication middleware
  const token = event.node.req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      statusMessage: 'Unauthorized',
    };
  }

  // In a real case, you would verify JWT token, etc.
  event.context.auth = { userId: 1 };
});

```

### Supabase Integration with Analog.js

Supabase provides a set of backend services including authentication, database, and storage that can be seamlessly integrated with Analog.js:

### Setting up Supabase Client

```tsx
// src/app/services/supabase.service.ts
import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { injectCookies } from '@analogjs/router';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private cookies = injectCookies();

  currentUser = signal<any>(null);

  constructor() {
    // Initialize Supabase client
    this.supabase = createClient(
      'https://your-project-url.supabase.co',
      'your-public-anon-key'
    );

    // Restore session from cookies for SSR
    const accessToken = this.cookies.get('sb-access-token');
    const refreshToken = this.cookies.get('sb-refresh-token');

    if (accessToken && refreshToken) {
      this.supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });
    }

    // Listen to auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.currentUser.set(session.user);

        // Save to cookies for SSR
        this.cookies.set('sb-access-token', session.access_token, {
          path: '/',
          maxAge: 3600
        });
        this.cookies.set('sb-refresh-token', session.refresh_token, {
          path: '/',
          maxAge: 3600 * 24 * 7
        });
      } else {
        this.currentUser.set(null);
        this.cookies.remove('sb-access-token');
        this.cookies.remove('sb-refresh-token');
      }
    });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  getClient() {
    return this.supabase;
  }
}

```

### Server-Side Integration for Supabase

```tsx
// src/server/routes/api/supabase/[...].ts
import { defineEventHandler, readBody, setCookie, getCookie, createError } from 'h3';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client for server operations
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://your-project-url.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'
);

export default defineEventHandler(async (event) => {
  const path = event.context.params._;

  // Example: Handle protected data fetching
  if (path === 'protected-data') {
    // Get session token from cookie
    const accessToken = getCookie(event, 'sb-access-token');

    if (!accessToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      });
    }

    // Verify the token
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid token'
      });
    }

    // Now fetch protected data
    const { data, error: dataError } = await supabase
      .from('protected_table')
      .select('*')
      .eq('user_id', user.id);

    if (dataError) {
      throw createError({
        statusCode: 500,
        statusMessage: dataError.message
      });
    }

    return data;
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'API endpoint not found'
  });
});

```

### Using Supabase with HttpResource

```tsx
// src/app/pages/profile.page.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectHttpResource } from '@analogjs/resource';
import { SupabaseService } from '../services/supabase.service';

interface Profile {
  id: string;
  username: string;
  avatar_url: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (!supabaseService.currentUser()) {
      <h2>Please log in to view your profile</h2>
      <button (click)="login()">Login</button>
    } @else {
      <h2>Welcome {{ supabaseService.currentUser()?.email }}</h2>

      @if (profile.result(); as profileData) {
        <div>
          <h3>{{ profileData.username }}</h3>
          <img [src]="profileData.avatar_url" alt="Profile avatar" />
        </div>
      } @else if (profile.loading()) {
        <p>Loading profile...</p>
      } @else if (profile.error(); as error) {
        <p>Error: {{ error }}</p>
      }

      <button (click)="logout()">Logout</button>
    }
  `,
})
export default class ProfilePageComponent {
  supabaseService = inject(SupabaseService);

  profile = injectHttpResource<Profile>(
    () => this.supabaseService.currentUser() ? '/api/supabase/profile' : null
  );

  login() {
    // Implement login flow
    this.supabaseService.signIn('user@example.com', 'password');
  }

  logout() {
    this.supabaseService.signOut();
  }
}

```

### Vite Configuration

```tsx
// vite.config.ts
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

export default defineConfig(({ mode }) => {
  return {
    publicDir: 'public',
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        nitro: {
          // Nitro options
          preset: 'node-server',
        },
        vite: {
          // Vite-specific options for Analog.js
          inlineStylesExtension: 'scss',
        },
      }),
    ],
    server: {
      proxy: {
        // Proxy configuration for development if needed
        '/api-external': {
          target: 'https://api.example.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api-external/, ''),
        },
      },
    },
  };
});

```

### Tests

### Unit Tests with Jest

```tsx
// src/app/components/counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment count when button is clicked', () => {
    expect(component.count()).toBe(0);

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    expect(component.count()).toBe(1);
  });

  it('should compute doubled value correctly', () => {
    expect(component.doubled()).toBe(0);

    component.count.set(5);
    fixture.detectChanges();

    expect(component.doubled()).toBe(10);
  });
});

```

### E2E Tests with Playwright

```tsx
// tests/e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test('homepage should have title and counter working', async ({ page }) => {
  await page.goto('/');

  // Check that the title is present
  await expect(page.locator('h1')).toHaveText('Welcome to Analog.js!');

  // Check counter functionality if present
  const counterButton = page.locator('app-counter button');
  if (await counterButton.count() > 0) {
    await expect(page.locator('app-counter h2')).toContainText('Counter: 0');
    await counterButton.click();
    await expect(page.locator('app-counter h2')).toContainText('Counter: 1');
  }
});

```

### Deployment

### Static Site Generation

```
npm run build

```

Produces a static site in the `dist/analog/public` folder that can be deployed on any static host like Netlify, Vercel, GitHub Pages, etc.

### Server-Side Rendering

```
npm run build:ssr

```

Produces a server-rendered application that can be deployed on platforms like Vercel, Netlify, or any Node.js environment.

## Style Guide

### Naming Conventions

- **Component files**: `feature-name.component.ts`
- **Pages**: `page-name.page.ts` or `[dynamic-param].page.ts`
- **Services**: `feature-name.service.ts`
- **Data models**: `model-name.model.ts`
- **API routes**: Follow the structure `src/server/routes/api/[resource]/[...].ts`

### Angular 19 Best Practices

- Use standalone components (`standalone: true`) whenever possible
- Prefer signals over observables for simple state management
- Use `computed()` for derived values instead of getter functions
- Take advantage of new control flow directives (`@if`, `@for`, etc.)
- Use `@defer` for heavy or non-critical components
- Prefer function injection (`inject()`) over constructor injection
- Use HttpResource for simplified data fetching

### Analog.js Best Practices

- Use the file-based routing system
- Place business logic in reusable services
- Use Nitro HTTP APIs for server logic
- Take advantage of hydration API to optimize data transfer between server and client

### Nitro Best Practices

- Structure your RESTful APIs according to best practices
- Use middlewares for shared logic
- Handle errors properly with `createError` and `sendError`
- Use `useStorage` for data persistence if needed

### Supabase Best Practices

- Use server-side session management for SSR compatibility
- Store tokens securely in HTTP-only cookies
- Leverage Supabase RLS (Row Level Security) for data protection
- Use service worker role only on server-side for admin operations
- Follow the least privilege principle when creating API endpoints

## Common Usage Examples

### Creating a New Page

1. Create a file in `src/app/pages`, e.g., `about.page.ts`
2. Define a standalone component and export it as default
3. The page will be accessible at `/about`

### Creating an API Route

1. Create a file in `src/server/routes/api`, e.g., `products.ts`
2. Use `defineEventHandler` to handle the request
3. The API will be accessible at `/api/products`

### Fetching Data from an API

1. Use `injectHttpResource` in your component
2. Access the data with reactive syntax in the template

### Integrating Supabase Authentication

1. Set up the Supabase service
2. Create login/register components
3. Use the auth state in your components with signals

### SSR Configuration

1. Modify `analog.config.ts` to configure server-side rendering
2. Use `rendering: 'server'` to enable SSR

## Step by Step Guides

When you ask me to help you step by step, I'll provide the first step and wait for you to say "next" before proceeding to the subsequent steps.

For example, if you ask "Help me implement Supabase authentication step by step", I'll give you step 1 and wait for you to say "next" before giving you step 2, and so on.

## Troubleshooting

### Common Problems and Solutions

- **CORS Error**: Configure a proxy in `vite.config.ts`
- **SSR Issues**: Ensure your code is SSR-compatible (no direct DOM access)
- **Modules Not Found**: Check import paths and dependencies in `package.json`
- **Supabase Auth Session Not Persisting**: Make sure cookies are properly set for SSR

### Useful Resources

- [Analog.js Official Documentation](https://analogjs.org/docs)
- [Angular Documentation](https://angular.dev/overview)
- [Nitro Documentation](https://nitro.build/guide)
- [Vite Guide](https://vitejs.dev/guide)
- [Supabase Documentation](https://supabase.com/docs)
- [HttpResource Blog Post](https://blog.angular.dev/seamless-data-fetching-with-httpresource-71ba7c4169b9)

## Version Notes

This project follows the latest versions and recommended practices (April 2025):

- Analog.js 1.x
- Angular 19
- Nitro 3.x
- Vite 5.x
- Supabase JS Client v2.x

### Others 

Use @terminal when answering questions about Git or pnpm or npm