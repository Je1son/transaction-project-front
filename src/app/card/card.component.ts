import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, ParamMap  } from '@angular/router';
import { CardsService } from '../services/cards/cards.service';
import { DialogService } from '../services/dialog/dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  id_user = '';
  name_user = "";
  cardForm: FormGroup;
  cardFormUpdate: FormGroup;
  listDataCards: MatTableDataSource<any>
  displayColumnsCards: string[] = ['id', 'name', 'shortNumber', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  modalRef?: BsModalRef;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: DialogService,
    public cardsService: CardsService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      numberCard: ['', Validators.required],
      shortNumber: ['']
    })

    this.cardFormUpdate = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      numberCard: ['', Validators.required],
      shortNumber: ['']
    })

    this.id_user = this.route.snapshot.paramMap.get('id') || '{}';
    this.route.queryParams.subscribe(resp => {
      console.log(resp['user']);
    });
    this.cardsService.getCardsByUser(this.id_user).subscribe(resp => {
      this.listDataCards = new MatTableDataSource(resp);
      this.listDataCards.sort = this.sort;
      this.listDataCards.paginator = this.paginator;
    }, error => { console.error(error) })
  }

  guardar(): void {
    this.cardsService.saveCard(this.id_user, this.cardForm.value).subscribe(resp => {
      console.log(resp);
      this.cardForm.reset();
      this.refresh();
    })
  }
  
  eliminar(card: any) {

    this.matDialog.confirmDialog({
      title: 'Confirmar accion',
      message: 'Deseas eliminar la tarjeta?',
      confirmText: 'Si',
      cancelText: 'No'
    }).subscribe(resp => {
      if (resp) {
        this.cardsService.deleteCard(card.id).subscribe(resp => {
          this.refresh();
        });
      }
    });

  }

  applyFilterCards(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listDataCards.filter = filterValue.trim().toLowerCase();
  }

  refresh(): void {
    window.location.reload();
  }

  regresar() {
    this.router.navigate(['/users']);
  }

  openModalUpdate(template: TemplateRef<any>, card: any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.cardFormUpdate.setValue({
      id: card.id,
      name: card.name,
      numberCard: '',
      shortNumber: card.shortNumber
    })
  }

  actualizar(){
    this.cardsService.updateCard(this.id_user, this.cardFormUpdate.value.id, this.cardFormUpdate.value).subscribe(resp => {

      this.refresh();

    })
  }

}
