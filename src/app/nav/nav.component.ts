import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../_services/auth.service';
import { ModalService } from '../_services/modal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  public readonly user$: Observable<boolean | null> = EMPTY;

  constructor(private modal: ModalService, public authService: AuthService, private auth: AngularFireAuth) {}

  ngOnInit(): void {}

  openModal(event: Event) {
    event.preventDefault();
    this.modal.toggleModal('auth');
  }

  async logout(event: Event) {
    event.preventDefault();
    await this.auth.signOut();
  }
}
