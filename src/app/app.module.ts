import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';


import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EventComponent } from './components/event/event.component';
import { ScheduleGridComponent } from './components/schedule-grid/schedule-grid.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EventFormComponent } from './components/event-form/event-form.component';
import { ScheduleService } from './services/shcedule.service';
import { eventsReducer } from './redusers/events.reduser';




@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    ScheduleGridComponent,
    CalendarComponent,
    TruncatePipe,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({events: eventsReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
  ],
  providers: [ ScheduleService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
