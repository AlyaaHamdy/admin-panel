import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private Auth: AuthService) { }

  ngOnInit(): void {
    this.Auth.logout().subscribe(
      (response) => {
        console.log(response)
        this.Auth.removeToken()
        // this.Auth.setLoggedStatus(false)
        this.router.navigateByUrl('/login/')
      }
    )
  }

}
