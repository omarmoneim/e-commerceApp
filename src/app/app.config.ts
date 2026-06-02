import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {CookieService} from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorsInterceptor } from './core/interceptors/errors-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading-interceptor';





export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes ,
        withHashLocation(),
    withViewTransitions(),
    withInMemoryScrolling({scrollPositionRestoration:'top'})), provideClientHydration(withEventReplay()),
      provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        }),
        provideHttpClient(withFetch() , withInterceptors([headersInterceptor,errorsInterceptor,loadingInterceptor])),
        provideAnimations(),
        provideToastr(),
        importProvidersFrom(CookieService,NgxSpinnerModule)
  ]
};
