import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [MatSidenavModule,MatIconModule,MatDividerModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.css'
})
export class SidenavbarComponent {

}
