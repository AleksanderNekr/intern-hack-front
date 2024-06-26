import { Injectable, signal, WritableSignal } from '@angular/core';
import { AppUser, HseEvent } from "../models";
import { UserMgmService } from "../user-mgm/user-mgm.service";

@Injectable({
  providedIn: 'root'
})
export class EventsMgmService {

  public events: WritableSignal<HseEvent[]> = signal(this.fetchEvents())

  constructor() {
    this.events.set(this.fetchEvents())
  }

  private fetchEvents(): HseEvent[] {
    let events = localStorage.getItem("events")
    if (events === null) {
      return []
    }
    return JSON.parse(events)
  }

  addEvent(event: HseEvent) {
    this.events.update(value => {
      value.push(event)
      return value
    })
    localStorage.setItem("events", JSON.stringify(this.events()))

    const studval = localStorage.getItem("student");
    if (studval === null) {
      return;
    }

    const userToSend: AppUser = JSON.parse(studval);
    for (const tag of event.tags) {
      if (userToSend?.tags.includes(tag)) {
        this.callApi(event, userToSend);
        return
      }
    }
  }

  private callApi(event: HseEvent, user: AppUser) {
    const target: string = user.selectedChannel;
    if (target === 'none') {
      console.log('no send')
      return;
    }

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");

    let target_id: string;
    if (target === 'telegram') {
      target_id = user.tgId;
    } else {
      target_id = user.email;
    }

    const raw = JSON.stringify({
      "users": [
        {
          "target_id": target_id,
          "target": target
        },
      ],
      "event_name": event.name,
      "event_link": "https://hse-events-management.vercel.app/profile"
    });
    fetch("http://localhost:5000/send_message", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));


  }

  deleteEvent(event: HseEvent) {
    this.events.update(value => {
      value = value.filter(v => v != event)
      return value
    })
    localStorage.setItem("events", JSON.stringify(this.events()))
  }

  updateEvent(event: HseEvent) {
    this.events.update(value => {
      value = value.filter(e => e.id !== event.id)
      value.push(event)
      return value
    })
    localStorage.setItem("events", JSON.stringify(this.events()))
  }

  updateToLocal(event: HseEvent) {
    let events = this.events().filter(e => e.id !== event.id)
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events))
  }
}
