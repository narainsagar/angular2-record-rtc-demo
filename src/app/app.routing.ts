import { RouterModule, Routes } from '@angular/router';

// import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RecordRTCComponent } from './record-rtc/record-rtc.component';
import { RecordRTCAudioComponent } from './record-rtc-audio/record-rtc-audio.component';

const routes: Routes = [
  { path: '', redirectTo: '/record-rtc-audio', pathMatch: 'full'/*component: HomeComponent */ },
  { path: 'about', component: AboutComponent},
  { path: 'record-rtc', component: RecordRTCComponent},
  { path: 'record-rtc-audio', component: RecordRTCAudioComponent}
];

export const routing = RouterModule.forRoot(routes);
