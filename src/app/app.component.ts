
import { Component, ViewChild, OnInit } from '@angular/core';
import { Grid, GridComponent, Smart } from 'smart-webcomponents-angular/grid';
import { IEmployeeModel } from './models/employee-model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  @ViewChild('grid', { read: GridComponent, static: false }) grid!: GridComponent;

  constructor(private dataService: DataService)  {}

  rowData: IEmployeeModel[] = [];
  departmentList: string[] = [];
  selectedDepartment = '';
  
   
  layout = {
    rowHeight: 40
  }

  dataSource = new Smart.DataAdapter({
      dataSource: this.rowData, 
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
    { label: 'Last Name', dataField: 'lastName', width: 150 },
    { label: 'Email', dataField: 'email', width: 200 },
    { label: 'Phone', dataField: 'phone', width: 150 },
    { label: 'Department', dataField: 'departmentName', width: 250, allowEdit: false } ,
    { label: 'Id', dataField: 'id', width: 20, allowEdit: false  },
  ]

  appearance = {
    showRowHeaderNumber: true
  }

  editing = {
    enabled: true,
    action: 'click',
    mode: 'row'
  }

  ngOnInit(): void {
    this.getDepartments();
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

  selectDepartmentHandler(event: any) {
    this.selectedDepartment =  event.target.value as string;
  }

  getEmployees() {
    this.dataService.getEmployeeList()
      .subscribe(
        (response) => { 
          this.rowData = response;
          this.dataSource = this.rowData
        },
        (error) => {  
          console.error('Request failed with error')
        },
        () => {
          //console.error('Request completed');      
        })
  }

  updateEmployee() {
    let gridData: IEmployeeModel[] = [];
    const grid = <Grid>document.getElementById('grid');
    
    let gridRows = grid.rows?.length;
    if(gridRows !== undefined) {
      
      for(let i = 0; i < gridRows; i++) {
        let fname =grid.getCellValue(i,"firstName");
        let lname =grid.getCellValue(i,"lastName");
        let email =grid.getCellValue(i,"email");
        let phone =grid.getCellValue(i,"phone");
        let department =grid.getCellValue(i,"departmentName");
        let id =grid.getCellValue(i,"id");        

        let employee: IEmployeeModel = {
          id: id,
          firstName: fname,
          lastName: lname,
          departmentName: department,
          email: email,
          phone: phone,
          departmentId: 0
        }

        gridData.push(employee);
        //UpdateEmployees
      
      }
    }
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
          alert("Success. Employee Added to end of grid list");
          this.resetAddEmployeeFields();
          this.getEmployees();
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

}

