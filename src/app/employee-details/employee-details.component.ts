import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from '../modals/employee.modal';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;
   @Output() onRemoveEmployee = new EventEmitter<number>();
   @Output() onEditEmployee = new EventEmitter<number>();
  constructor() {
    this.employee = {
      firstname: '',
      lastname: '',
      birthdate: '',
      gender: '',
      address: '',
      phonenumber:'',
      jobrole: '',
      profile: '',
    };

  }
  ngOnInit(): void {
    console.log(this.employee);
  }

  
deleteEmployeeClicked() {
  this.onRemoveEmployee.emit(this.employee.id);
}

editEmployeeClicked(){
  this.onEditEmployee.emit(this.employee.id);
}

}
