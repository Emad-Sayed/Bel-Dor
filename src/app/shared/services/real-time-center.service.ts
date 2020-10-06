import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HubConnectionBuilder, HubConnection, IHttpConnectionOptions } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { IfStmt } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class RealTimeCenterService {


  notifier = new Subject();
  hubConnection: HubConnection;
  isConnected = false;
  constructor(private http: HttpClient) {
    if (!this.isConnected) this.connect();
  }
  connect() {
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return localStorage.getItem("token");
      }
    };
    this.hubConnection = new HubConnectionBuilder().withUrl(environment.baseUrl + "notificationcenter", options).build();
    this.hubConnection
      .start()
      .then((data) => {
        console.log('Connection started!')
        this.isConnected = true;
      })
      .catch(err => console.log('Error while establishing connection :('));
    this.hubConnection.on("newMessage", data => {
      this.notifier.next(data);
    })
  }
  addMeToGroup(groupName) {
    if(this.isConnected)
    this.hubConnection.invoke("CreateNotificationGroup", groupName);
  }
}
