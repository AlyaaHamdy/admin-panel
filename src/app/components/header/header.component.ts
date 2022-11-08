import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';
// import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  islogged:boolean 
 @Output() toggleSidebarForMe:EventEmitter<any>= new EventEmitter();
  constructor(private Auth:AuthService ,private router:Router) {
    this.islogged = this.Auth.isLogged()
   }

  ngOnInit(): void {
    // this.Auth.getLoggedStatus().subscribe((data)=>{
    //   this.islogged = data
    // })
    // this.WebSocketService.listen('test event').subscribe((data) => {
    //   console.log(data);
    // });
    // this.WebSocketService.emit('my message', 'hello from front');
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }
  logOut(){
    console.log("Out")
    this.Auth.removeToken();
    this.router.navigateByUrl("login")
  }

}
