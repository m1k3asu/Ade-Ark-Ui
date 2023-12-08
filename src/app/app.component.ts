
import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { GridComponent, GridColumn, DataAdapter, Smart } from 'smart-webcomponents-angular/grid';
import { EmployeeModel } from './models/employee-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit, OnInit {
  @ViewChild('grid', { read: GridComponent, static: false }) grid!: GridComponent;
  rowData: EmployeeModel[] = [];
   
  layout = {
    rowHeight: 40
}

dataSource = new Smart.DataAdapter({
    dataSource: this.getEmployees(),
    dataFields: [
        'id: number',
        'firstName: string',
        'lastName: string',
        'email: string',
        'phone: string',
        'departmentId: number',
        'departmentName: string'
    ]
})

  columns = [
    { label: 'First Name', dataField: 'firstName', width: 150 },
    { label: 'Last Name', dataField: 'lastName', width: 200 },
    { label: 'Email', dataField: 'email', width: 150 },
    { label: 'Phone', dataField: 'phone', width: 120 },
    { label: 'Department', dataField: 'departmentName', width: 200, allowEdit: false }  
  ]

  appearance = {
    showRowHeaderNumber: true
  }

  editing = {
    enabled: true,
    action: 'click',
    mode: 'row'
  }

  

  // rowData: [
  //   { mission: "Voyager", company: "NASA", location: "Cape Canaveral", date: "1977-09-05", rocket: "Titan-Centaur ", price: 86580000, successful: true },
  //   { mission: "Apollo 13", company: "NASA", location: "Kennedy Space Center", date: "1970-04-11", rocket: "Saturn V", price: 3750000, successful: false },
  //   { mission: "Falcon 9", company: "SpaceX", location: "Cape Canaveral", date: "2015-12-22", rocket: "Falcon 9", price: 9750000, successful: true }
  // ];
  
  getEmployees() {
    let rowData2: EmployeeModel[] = [];
    rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
    rowData2.push({ id: 2, firstName: 'alpha2', lastName: 'betty2', email: 'test@test.com2', phone: '203-433-5677-2', departmentId: 22, departmentName: 'Human Resources2'});

    this.rowData = rowData2;
    return this.rowData;
  }


  ngOnInit(): void {

    //  let rowData2: EmployeeModel[] = [];
    //  rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
    //  rowData2.push({ id: 2, firstName: 'alpha2', lastName: 'betty2', email: 'test@test.com2', phone: '203-433-5677-2', departmentId: 22, departmentName: 'Human Resources2'});

    //  this.rowData = rowData2;
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
}

init(): void {
    // init code.
    let rowData2: EmployeeModel[] = [];
    rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
    rowData2.push({ id: 2, firstName: 'alpha2', lastName: 'betty2', email: 'test@test.com2', phone: '203-433-5677-2', departmentId: 22, departmentName: 'Human Resources2'});

    this.rowData = rowData2;

}

// Get the row here.
// grid.addEventListener('beginEdit', (event) => {  
  
//   const detail = event.detail;
//   const id = detail.id;
//   const dataField = detail.dataField;
//   const row = detail.row;
//   const column = detail.column;
//   const cell = detail.cell;
//   const data = detail.data;
//   const value = detail.value;

//   if(id % 2 === 0) {
//     grid.cancelEdit()
//   }

// })

}

