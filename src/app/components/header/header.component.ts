import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  islogged:boolean 
 @Output() toggleSidebarForMe:EventEmitter<any>= new EventEmitter();
  constructor(private Auth:AuthService) {
    this.islogged = this.Auth.isLogged()
   }

  ngOnInit(): void {
    // this.Auth.getLoggedStatus().subscribe((data)=>{
    //   this.islogged = data
    // })
  }

  toggleSidebar(){
    this.toggleSidebarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

}
