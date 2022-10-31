import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminLogin } from '../model/admin';
import { APIResponse } from '../viewModel/ApiResult';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    logged: BehaviorSubject<boolean>
    constructor(private http: HttpClient) {
        this.logged = new BehaviorSubject<boolean>(this.isLogged())
        // this.setLoggedStatus(this.isLogged())
    }
    // setLoggedStatus(status: boolean) {
    //     this.logged.next(status)
    // }
    // getLoggedStatus() {
    //     return this.logged.asObservable()
    // }
    login(user: AdminLogin) {
        return this.http.post<APIResponse<string>>(`${environment.APIURl}/users/login`, user)
    }
    logout() {

        return this.http.post(`${environment.APIURl}/users/logout`, {})
    }
    isLogged(): boolean {
        if (localStorage.getItem("token") == null) return false
        else return true
    }
    setToken(token: string) {
        localStorage.setItem("token", token)
    }
    getToken(): string | null {
        return localStorage.getItem("token")
    }
    removeToken() {
        localStorage.removeItem("token")
    }
}