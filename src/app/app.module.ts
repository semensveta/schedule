import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { EventComponent } from './components/event/event.component';
import { ScheduleGridComponent } from './components/schedule-grid/schedule-grid.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EventFormComponent } from './components/event-form/event-form.component';


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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
