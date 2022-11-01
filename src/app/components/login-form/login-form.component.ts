import { Component, OnInit } from '@angular/core';
import { AdminLogin } from '../../model/admin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  addform!: FormGroup;
  isValid = false;

  returnURL: string = "";
  constructor(private router: Router, private activate: ActivatedRoute, private Auth: AuthService) {
    this.addform = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.returnURL = this.activate.snapshot.paramMap.get("path") ?? ""
  }
  Login() {
    let user: AdminLogin = this.addform.value as AdminLogin
    console.log("ddddddd")
    this.Auth.login(user).subscribe((response) => {
      console.log("ffffff")
      if (response) {
        console.log("lllllll")
    
        console.log(response.token);
    
      this.Auth.setToken(response.token)
      
        this.router.navigateByUrl("dashboard")
        
       
        this.isValid = true
     
      }
      else (
        
        this.router.navigateByUrl("/")
      )
    })
  }

}
