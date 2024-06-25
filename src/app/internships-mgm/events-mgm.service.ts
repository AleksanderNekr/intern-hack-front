import { Injectable, signal, WritableSignal } from '@angular/core';
import { HseEvent } from "../models";

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

    this.callApi(event)
  }

  private callApi(event: HseEvent) {
    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "users": [
        {
          "target_id": "926188677",
          "target": "telegram"
        },
      ],
      "event_name": event.name,
      "event_link": event.organizerName.length > 0 ? event.organizerName.length : "none"
    });
    fetch("https://hack-bot.cleverapps.io/send_message", {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
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

  getEvents(): HseEvent[] {
    return this.events();
  }

  updateToLocal(event: HseEvent) {
    let events = this.events().filter(e => e.id !== event.id)
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events))
  }
}
