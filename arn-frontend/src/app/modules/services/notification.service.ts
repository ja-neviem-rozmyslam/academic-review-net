import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Notification} from '../objects/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `api/notifications`;

  notifications: Notification[] = [];
  unreadNotificationsCount = signal<number>(0);

  constructor(private http: HttpClient) {
    this.loadNotifications();
    //this.connectToWebSocket();
  }

  private loadNotifications(): void {
    this.http.get<Notification[]>(`${this.apiUrl}`)
      .subscribe({
        next: response=> {
          this.notifications = response;
          this.unreadNotificationsCount.set(this.notifications.filter(n => !n.isRead).length);
        },
        error: err => {
          console.error('Failed to load notifications', err);
        }
      });
  }

  markAllAsRead(): void {
    this.http.post(`${this.apiUrl}/mark-read`, {}).subscribe(() => {

    });
  }

  deleteNotifications(ids: number[]): void {
    this.http.request('delete', `${this.apiUrl}/delete`, {body: ids}).subscribe(() => {

    });
  }

  private connectToWebSocket(): void {
    const socket = new WebSocket('ws://localhost:3000/ws/notifications');

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      this.notifications.push(newNotification);
      this.unreadNotificationsCount.update(count => count + 1);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket closed. Reconnecting...');
      setTimeout(() => this.connectToWebSocket(), 5000);
    };
  }
}

