import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

var serverConfig =  require ("../../../config/serverConfig.json");


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http: HttpClient) {}

  log(module: string, message: string, level: 'debug' | 'info' | 'warn' | 'error' = 'info') {
    const logMessage = `[${new Date().toISOString()}] ${level.toUpperCase()}: ${message}`;
    //console.log(logMessage);

    this.http.post(serverConfig.serverApi + 'logs', { 'module': module, 'message': logMessage }).subscribe(res => {
      console.log(res);
    },error => {
      console.log(error);
    });
  }

  info(module: string, message: string) {
    this.log(module, message, 'info');
  }

  debug(module: string, message: string) {
    this.log(module, message, 'debug');
  }

  warn(module: string, message: string) { 
    this.log(module, message, 'warn');
  }

  error(module: string, message: string) {  
    this.log(module, message, 'error');
  }
}
