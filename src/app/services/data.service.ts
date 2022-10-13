import { Employee } from './../model/employee.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  employees: Employee[] = [];
  employeeMap: Map<string, number> = new Map<string, number>();

  constructor(private http:HttpClient) { }

  getEmployees(){
    return this.http.get<Employee[]>('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==')
    .pipe(
      map(employees => {
        return employees.map(employee => {return {...employee}});
      })
    );
  }
}
