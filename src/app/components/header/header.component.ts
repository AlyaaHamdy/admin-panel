import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth.service';
import { WebSocketService } from '../../services/web-socket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  islogged: boolean;
  notfyList: string[] = [];
  count: number = 0;
  display: string = '';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private Auth: AuthService, private router: Router, private WebSocketService: WebSocketService) {
    this.islogged = this.Auth.isLogged()
  }

  ngOnInit(): void {
    // this.Auth.getLoggedStatus().subscribe((data)=>{
    //   this.islogged = data
    // })
    this.WebSocketService.listen('Admin Notifications').subscribe(
      (data: any) => {
        console.log(data);
        if (data.length == 0) this.hide();
        this.notificationCount(data);
        this.notfyList = []
        for (let index = 0; index < data.length; index++) {
          this.notfyList.push(data[index]);
          this.display = "block";
        }
      }
    );
  }
  hide() {
    this.display = 'none';
    this.count = 0;

  }
  notificationCount(data: any) {
    if (data.length > this.notfyList.length) {
      this.count = this.count + 1;
    }
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }
  logOut() {
    console.log("Out")
    this.Auth.removeToken();
    this.router.navigateByUrl("login")
    this.WebSocketService.emit('Clear Notifications', 'Hello From Admin');
  }

}
