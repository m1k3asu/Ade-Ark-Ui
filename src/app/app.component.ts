
import { Component, ViewChild, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { GridComponent, GridColumn, DataAdapter, Smart } from 'smart-webcomponents-angular/grid';
import { IEmployeeModel } from './models/employee-model';
import { DataService } from './service/data.service';
import { IDepartmentModel } from './models/department-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit, OnInit {
  @ViewChild('grid', { read: GridComponent, static: false }) grid!: GridComponent;

  constructor(private dataService: DataService)  {}

  rowData: IEmployeeModel[] = [];
  //departmentList: DepartmentModel[] = [];
  departmentList: string[] = [];
  selectedDepartment = '';
  
   
  layout = {
    rowHeight: 40
  }

  dataSource = new Smart.DataAdapter({
      dataSource: this.rowData, //this.getEmployees1(),
      dataFields: [
          'id: number',
          'firstName: string',
          'lastName: string',
          'email: string',
          'phone: string',
          'departmentId: number',
          'departmentName: string'
      ]
  });

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
  
  getEmployees1() {
    let rowData2: IEmployeeModel[] = [];
    rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
    rowData2.push({ id: 2, firstName: 'alpha2', lastName: 'betty2', email: 'test@test.com2', phone: '203-433-5677-2', departmentId: 22, departmentName: 'Human Resources2'});

    this.rowData = rowData2;
    return this.rowData;
  }

  


  ngOnInit(): void {
    
    this.getDepartments();

    //  let rowData2: EmployeeModel[] = [];
    //  rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
    //  rowData2.push({ id: 2, firstName: 'alpha2', lastName: 'betty2', email: 'test@test.com2', phone: '203-433-5677-2', departmentId: 22, departmentName: 'Human Resources2'});

    //  this.rowData = rowData2;
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
  }

  getDepartments() {
    this.dataService.getDepartmentList()
      .subscribe(
        (response) => { 
          this.extractValues(response, "name");
  
        },
        (error) => {  
          console.error('Request failed with error')
        },
        () => {
          //console.error('Request completed');      
        })
  }

init(): void {
    // let rowData2: IEmployeeModel[] = [];
    // rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
    // rowData2.push({ id: 2, firstName: 'alpha2', lastName: 'betty2', email: 'test@test.com2', phone: '203-433-5677-2', departmentId: 22, departmentName: 'Human Resources2'});
    // this.rowData = rowData2;

    //this.getDepartments();
}

selectDepartmentHandler(event: any) {
  this.selectedDepartment =  event.target.value as string;
}

getEmployees() {
  this.dataService.getEmployeeList()
    .subscribe(
      (response) => { 
        this.rowData = response;
        this.dataSource = this.rowData
        /*
id: 1        
firstName: "Bill"
lastName: "Jones"
email: "bill.jones@gmail.com"
phone:"202-234-3445"
departmentId: 1
departmentName: "Accounting"


rowData2.push({ id: 1, firstName: 'alpha', lastName: 'betty', email: 'test@test.com', phone: '203-433-5677', departmentId: 2, departmentName: 'Human Resources'});
        */
      },
      (error) => {  
        console.error('Request failed with error')
      },
      () => {
        //console.error('Request completed');      
      })
}

updateEmployee() {


}

addEmployee() {
  let fName = (<HTMLInputElement>document.getElementById('firstName')).value;
  let lName = (<HTMLInputElement>document.getElementById('lastName')).value;
  let email = (<HTMLInputElement>document.getElementById('email')).value;
  let phone = (<HTMLInputElement>document.getElementById('phone')).value;

  const employee: IEmployeeModel = { firstName: fName, lastName: lName, email: email, phone: phone, departmentName: this.selectedDepartment, departmentId: 0, id: 0};
    
    this.dataService.addEmployee(employee)
    .subscribe(
      (response) => {                           
        let a = response;
        /*
        departmentId: 7
        email: "gina.jones@tabasco.com"
        firstName: "Gina"
        id: 6
        lastName: "Jones"
        phone: "530-346-4545"
        */
        alert("Success. Employee Added to end of grid list");
        this.resetAddEmployeeFields();
      },
      (error) => {                              
        console.error('error caught in component')       
        alert("Error adding Employee");
        //throw error;   //You can also throw the error to a global error handler
      }
    );  
}

private resetAddEmployeeFields() {
  (<HTMLInputElement>document.getElementById('firstName')).value = "";
  (<HTMLInputElement>document.getElementById('lastName')).value = "";
  (<HTMLInputElement>document.getElementById('email')).value = "";
  (<HTMLInputElement>document.getElementById('phone')).value = "";
  (<HTMLInputElement>document.getElementById('masterDepartmentList')).value = "----";
}

private extractValues(arr: any, prop: string) {
  let extractValues = arr.map((item: { [x: string]: any; }) => item[prop]);
  Array.prototype.unshift.apply( extractValues, ["----"]);
  this.departmentList = extractValues;
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

