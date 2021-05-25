import { Employee } from './employee';
import { EmployeeService } from './services/employee.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'employeeManagerApp';

  public editEmployee: Employee;
  public deleteEmployee: Employee;

  public employees: Employee[];
  constructor(
    private empService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees() {
    this.empService.getEmployee().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, '', {
          closeButton: true,
        });
      }
    );
  }

  // Mode may be edit/delete/add
  public openModal(employee: Employee, mode: string) {
    const container = document.getElementById('main-container'); //with this we get the access to the div
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode == 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode == 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#editModal');
    }
    if (mode == 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteModal');
    }
    container.appendChild(button); //appending the button to the container div
    button.click();
  }

  //add Employee form
  public onAddEmployee(addform: NgForm) {
    document.getElementById('add-employee-form').click(); // when we will submit the form then It will load the home page
    this.empService.addEmployee(addform.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addform.reset(); // it will reset the form once you submit the form.
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, '', {
          closeButton: true,
        }),
          addform.reset();
      }
    );
  }

  //Update employee details
  public onEditEmployee(employee: Employee) {
    this.empService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, '', {
          closeButton: true,
        });
      }
    );
  }

  //Delete employee details
  public onDeleteEmployee(empId: number) {
    this.empService.deleteEmployee(empId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
        this.toastr.success('Successfully Deleted', '', {
          closeButton: true,
        });
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.message, '', {
          closeButton: true,
        });
      }
    );
  }

  //Searching employees. do it in front end to reduce the load from backend
  public searchEmployees(key: string) {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
