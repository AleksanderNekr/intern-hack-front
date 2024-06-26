import { Injectable, signal, WritableSignal } from '@angular/core';
import { AppUser, HseEvent } from "../models";
import { UserMgmService } from "../user-mgm/user-mgm.service";

@Injectable({
  providedIn: 'root'
})
export class VacanciesService {

  constructor() {
  }

  getVacancies() {

    fetch("http://localhost:8080/manual_parse", {
      method: "GET",
      redirect: "follow",
      mode: "no-cors"
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
}
