import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../objects/Notification';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `api/notifications`;
  private webSocket: WebSocket | null = null;

  notifications: Notification[] = [];
  unreadNotificationsCount = signal<number>(0);

  constructor(private http: HttpClient, private tokenService: TokenService) {
  }

  loadNotifications(): void {
    this.http.get<Notification[]>(`${this.apiUrl}`)
      .subscribe({
        next: response => {
          this.notifications = response;
          this.unreadNotificationsCount.set(this.notifications.filter(n => !n.isRead).length);
        },
        error: err => {
          console.error('Failed to load notifications', err);
        }
      });
  }

  connectToWebSocket(): void {
    if (this.webSocket) {
      console.warn('WebSocket is already connected.');
      return;
    }

    const token = this.tokenService.getToken();
    if (!token) {
      console.error('Cannot connect to WebSocket: no token found.');
      return;
    }

    const webSocketUrl = `ws://localhost:8080/ws/notification?token=${token}`;
    this.webSocket = new WebSocket(webSocketUrl);

    this.webSocket.onopen = () => console.log('✅ Connected to WebSocket');

    this.webSocket.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      this.notifications.push(newNotification);
      this.unreadNotificationsCount.update(count => count + 1);
    };

    this.webSocket.onerror = (error) => console.error('❌ WebSocket Error:', error);

    this.webSocket.onclose = () => {
      console.log('⚠️ WebSocket closed.');
      this.webSocket = null;
    };
  }

  closeWebSocket(): void {
    if (this.webSocket) {
      console.log('🛑 Closing WebSocket...');
      this.webSocket.close();
      this.webSocket = null;
    }
  }
}
