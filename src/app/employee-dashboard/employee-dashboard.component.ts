import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EmployeeModel} from './Employee.model';
import {ApiService} from '../shared/api.service';
import {subscribeOn} from 'rxjs/operators';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;

  constructor(private formbuilder: FormBuilder, private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    this.getAllEmployee();
  }

  postEmployeeDetails(): void {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.apiService.postEmploye(this.employeeModelObj)
      .subscribe(res => {
          console.log(res);
          const ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmployee();
        },
        err => {
          alert('Something went wrong');
        });
  }

  getAllEmployee(): void {
    this.apiService.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      });
  }

  deleteEmployee(row: any): void {
    this.apiService.deleteEmployee(row.id)
      .subscribe(res => {
        this.getAllEmployee();
      });
  }

  onEdit(row: any): void {
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(): void {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    // TODO uniknąć duplikacji

    this.apiService.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(res => {
        const ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
