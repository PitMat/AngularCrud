import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {EmployeeModel} from './Employee.model';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();

  constructor(private formbuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
  }
  postEmployeeDetails(): void{
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.apiService.postEmploye(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert('Employee Added Successfully');
        const ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
      },
        err => {
        alert('Something went wrong');
        });
  }

}
