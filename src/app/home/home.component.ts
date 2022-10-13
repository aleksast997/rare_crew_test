import { Employee } from './../model/employee.model';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: Employee[] = [];
  employeeMap: Map<string, number> = new Map<string, number>();
  chart: any = [];

  public keepOriginalOrder = (a: { key: any; }, b: any) => a.key;

  constructor(private dataService: DataService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.dataService.getEmployees().subscribe(
      (employess: Employee[]) => {this.employees = employess;
        this.employeeMap = this.editData(employess);
        this.employeeMap = this.sortMap(this.employeeMap);
        console.log(this.employeeMap);
        this.chart = this.createChart(this.employeeMap);
      }
    );
  }

  editData(employees: Employee[]) {
    let employeeMap = new Map<string, number>();
    employees.forEach(employee => {
      if (employee.DeletedOn === null) {
          var start = new Date(employee.StarTimeUtc);
          var end = new Date(employee.EndTimeUtc);
          var duration = (end.valueOf() - start.valueOf()) / 3600000;
          duration = Math.round(duration);
          if (duration < 0) {
            duration = duration * (-1);
          }
        if (employee.EmployeeName != null) {
          if (!employeeMap.has(employee.EmployeeName)) {
            employeeMap.set(employee.EmployeeName, duration);
          } else {
            var time = employeeMap.get(employee.EmployeeName);
            employeeMap.set(employee.EmployeeName, time! + duration);
          }
        }else {
          if(!employeeMap.has("NN")){
            employeeMap.set("NN",duration);
          }else {
            var time = employeeMap.get("NN");
            employeeMap.set("NN", time! + duration);
          }

        }

      }
    });
    return employeeMap;
  }

  sortMap(employeeMap: Map<string, number>){
    const mapSort1 = new Map([...employeeMap.entries()].sort((a, b) => b[1] - a[1]));
    return mapSort1;
  }

  createChart(employeeMap: Map<string, number>) {
    var lableArray = [];
    var valueArray = [];
    for (let key of employeeMap.keys()) {
      lableArray.push(key);
      valueArray.push(employeeMap.get(key) || 0);
    }
    return new Chart('canvas', {
      type: 'pie',
      data: {
        labels: lableArray,
        datasets: [{
          label: 'My First Dataset',
          data: valueArray,
          backgroundColor: [
            'rgb(250, 250, 110)',
            'rgb(201, 238, 115)',
            'rgb(156, 223, 124)',
            'rgb(114, 207, 133)',
            'rgb(74, 189, 140)',
            'rgb(35, 170, 143)',
            'rgb(0, 150, 142)',
            'rgb(0, 130, 136)',
            'rgb(16, 110, 124)',
            'rgb(34, 91, 108)',
            'rgb(42, 72, 88)'
          ],
          hoverOffset: 5
        }]
      }
    })
  }
}

