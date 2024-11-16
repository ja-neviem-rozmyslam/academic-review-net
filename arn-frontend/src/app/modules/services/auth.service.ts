import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Login} from '../components/login-panel/enitites/Login';
import {Registration} from '../components/registration-panel/entities/Registration';
import {map} from 'rxjs/operators';
import {LoginResponse} from '../objects/LoginResponse';
import {TokenService} from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    USER_API_ENDPOINT = 'api/auth';
    private authStatus = new BehaviorSubject<boolean>(this.tokenService.isAuthenticated());

    constructor(
        private http: HttpClient,
        private tokenService: TokenService) {
    }

    login(loginInfo: Login): Observable<any> {
        return this.http.post<LoginResponse>(`${this.USER_API_ENDPOINT}/login`, loginInfo, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            observe: 'response'
        }).pipe(
            map(response => {
                const authToken = response.headers.get('Authorization');
                const refreshToken = response.headers.get('Refresh-Token');
                if (authToken) {
                    this.tokenService.storeToken(authToken);
                    this.tokenService.storeRefreshToken(refreshToken);
                    this.authStatus.next(true);
                }
                return response.body;
            })
        );
    }

    registration(registrationInfo: Registration): Observable<any> {
        return this.http.post(`${this.USER_API_ENDPOINT}/registration`, registrationInfo, {
            headers: {'Content-Type': 'application/json'}
        });
    }

    refreshToken(): Observable<string> {
        const refreshToken = this.tokenService.getRefreshToken();

        if (!refreshToken) {
            this.logout();
            return new Observable(observer => observer.error('No refresh token available'));
        }

        return this.http.post<{ token: string }>(`${this.USER_API_ENDPOINT}/refresh-token`, {refreshToken}).pipe(
            map(response => response.token)
        );
    }

    isAuthenticated(): Observable<boolean> {
        return this.authStatus.asObservable();
    }

    logout(): void {
        this.tokenService.removeToken();
        this.authStatus.next(false);
    }
}

