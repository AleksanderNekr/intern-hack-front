import { Component, computed } from '@angular/core';
import { EventsMgmService, Event, EventType } from "../../internships-mgm/events-mgm.service";
import { NgForOf } from "@angular/common";
import { AddEventModalComponent } from "../../add-event-modal/add-event-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-hse',
  templateUrl: './hse.component.html',
  standalone: true,
  imports: [
    NgForOf
  ],
  styleUrls: [ './hse.component.css' ]
})
export class HseComponent {
  constructor(private eventsMgmService: EventsMgmService,
              private modalService: NgbModal) {
  }

  events = computed(() => this.eventsMgmService.events())

  addEvent() {
    let modal = this.modalService.open(AddEventModalComponent)
    let event: Event = {
      id: Date.now(),
      tags: [],
      endDate: new Date(),
      name: 'New event',
      type: EventType.internship,
      organizerName: '',
      responded: [],
      description: ''
    }
    modal.componentInstance.setEvent(event)
    modal.componentInstance.setSubmitCallback(() => {
      this.eventsMgmService.addEvent(event)
      console.log('add event:', event)
    })
  }

  editEvent(event: Event) {

  }
}
