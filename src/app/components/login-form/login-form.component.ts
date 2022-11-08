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
display: string ="none";
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
     // console.log(response)
      if (response) {

        console.log("lllllll")
    
        console.log(response.authorization);

        if(response.authorization== ''){
          console.log("errrror");
          this.display = "block";
        }
    
      this.Auth.setToken(response.authorization)
      
        this.router.navigateByUrl("dashboard")
        
       
        this.isValid = true
     
      }
      else{
       
        this.router.navigateByUrl("/")
      }
        
      
    })
  }

}
