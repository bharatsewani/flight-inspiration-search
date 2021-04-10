import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendService } from './services/backend.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CustomTableComponent } from './custom-table/custom-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [CustomTableComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    NgxPaginationModule
  ],
  exports: [CustomTableComponent],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }, BackendService, AuthService]
})
export class SharedModule { }
