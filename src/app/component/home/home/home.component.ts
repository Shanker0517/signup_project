import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserserviceService } from '../../../core/Services/userservice.service';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,SidenavbarComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[UserserviceService]
})
export class HomeComponent {

}
