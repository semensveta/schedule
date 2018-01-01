import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  public eventParams = {
    positionX: 50,
    positionY: 0,
    duration: 150,
    width: 200,
    title: 'First Event!'
  };


}
