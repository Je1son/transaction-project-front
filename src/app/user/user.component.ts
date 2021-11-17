import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardsService } from '../services/cards/cards.service';
import { UsersService } from '../services/users/users.service';
import { DialogService } from '../services/dialog/dialog.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userFormUpdate: FormGroup;
  users: any;
  salida: boolean;
  listData: MatTableDataSource<any>
  searchKey: string;
  displayColumns: string[] = ['id', 'firstName', 'lastName', 'document', 'email', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  modalRef?: BsModalRef;

  constructor(
    public fb: FormBuilder,
    public cardsService: CardsService,
    public usersService: UsersService,
    private matDialog: DialogService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [''],
      document: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
    })

    this.userFormUpdate = this.fb.group({
      id: [''],
      document: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
    })

    this.usersService.getAllUsers().subscribe(resp => {
      this.listData = new MatTableDataSource(resp);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    }, error => { console.error(error) })
  }



  guardar(): void {
    this.usersService.saveUser(this.userForm.value).subscribe(resp => {

      this.userForm.reset();
      this.refresh();

    }, console => { console.error(console) })
  }

  eliminar(user: any) {

    this.matDialog.confirmDialog({
      title: 'Confirmar accion',
      message: 'Deseas eliminar el usuario?',
      confirmText: 'Si',
      cancelText: 'No'
    }).subscribe(resp => {
      if (resp) {
        this.usersService.deleteUser(user.id).subscribe(resp => {
          this.refresh();
        });
      }
    });

  }

  actualizar() {
    this.usersService.updateUser(this.userFormUpdate.value.id, this.userFormUpdate.value).subscribe(resp => {

      this.refresh();

    })
  }

  refresh(): void {
    window.location.reload();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listData.filter = filterValue.trim().toLowerCase();
  }

  verTarjetas(user: any) {
    this.router.navigate(['/users/', user.id, 'cards']);
  }

  openModalUpdate(template: TemplateRef<any>, user: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.userFormUpdate.setValue({
      id: user.id,
      document: user.document,
      lastName: user.lastName,
      email: user.email,
      firstName: user.firstName
    })
  }

}
