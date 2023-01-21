import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../modals/employee.modal';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addEmployeeButton') addEmployeeButton: any;
  buttontemp: any;
  employeeForm: FormGroup;


  jobOptions = [
    'Admin',
    'Manager',
    'HR',
    'Developer'
  ];
  employeesToDisplay: Employee[];
  employees: Employee[];






  constructor(private fb: FormBuilder, private employeeService: ServicesService) {

    this.employeeForm = fb.group({});
    this.employees = [];
    this.employeesToDisplay = this.employees;

  }


  ngAfterViewInit(): void {
    this.buttontemp.nativeElement.click();

  }
  ngOnInit(): void {
    
    this.employeeForm = this.fb.group({
      firstname: this.fb.control(''),
      lastname: this.fb.control(''),
      birthday: this.fb.control(''),
      gender: this.fb.control(''),
      address: this.fb.control(''),
      phonenumber: this.fb.control(''),

      jobrole: this.fb.control('default')

    });

    this.employeeService.getEmployees().subscribe((res) => {
      for (let emp of res) {
        this.employees.unshift(emp);
      }
      this.employeesToDisplay = this.employees;
    });

  }

  addEmployee() {
    let employee: Employee = {
      firstname: this.FirstName.value,
      lastname: this.LastName.value,
      birthdate: this.BirthDay.value,
      gender: this.Gender.value,
      address: this.Address.value,
      phonenumber: this.PhoneNumber.value,
      jobrole: this.jobOptions[parseInt(this.Jobrole.value)],
      profile: this.fileInput.nativeElement.files[0]?.name,
    };
    this.employeeService.postEmployee(employee).subscribe((res) => {
      this.employees.unshift(res);
      this.clearForm();
    });
  }


  removeEmployee(event: any) {
    this.employees.forEach((val, index) => {
      if (val.id === parseInt(event)) {
        this.employeeService.deleteEmployee(event).subscribe((res) => {
          this.employees.splice(index, 1);
        });
      }
    });
  }

  editEmployee(event: any) {
    this.employees.forEach((val, ind) => {
      if (val.id === event) {
        this.setForm(val);
      }
    });
    this.removeEmployee(event);
    this.addEmployeeButton.nativeElement.click();
  }

  setForm(emp: Employee) {
    this.FirstName.setValue(emp.firstname);
    this.LastName.setValue(emp.lastname);
    this.BirthDay.setValue(emp.birthdate);
    this.Gender.setValue(emp.gender);
    this.Address.setValue(emp.address);
    this.PhoneNumber.setValue(emp.phonenumber);




    let jobIndex = 0;
    this.jobOptions.forEach((val, index) => {
      if (val === emp.jobrole) jobIndex = index;
    });
    this.Jobrole.setValue(jobIndex);

    this.fileInput.nativeElement.value = '';
  }

  clearForm() {
    this.FirstName.setValue('');
    this.LastName.setValue('');
    this.BirthDay.setValue('');
    this.Gender.setValue('');
    this.Address.setValue('');
    this.PhoneNumber.setValue('');


    this.Jobrole.setValue('');
    this.fileInput.nativeElement.value = '';
  }









  public get FirstName(): FormControl {
    return this.employeeForm.get('firstname') as FormControl;
  }
  public get LastName(): FormControl {
    return this.employeeForm.get('lastname') as FormControl;
  }
  public get BirthDay(): FormControl {
    return this.employeeForm.get('birthday') as FormControl;
  }
  public get Gender(): FormControl {
    return this.employeeForm.get('gender') as FormControl;
  }
  public get Address(): FormControl {
    return this.employeeForm.get('address') as FormControl;
  }
  public get PhoneNumber(): FormControl {
    return this.employeeForm.get('phonenumber') as FormControl;
  }
  public get Jobrole(): FormControl {
    return this.employeeForm.get('jobrole') as FormControl;
  }











}
