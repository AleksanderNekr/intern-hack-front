import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { AppUser, HseEvent } from "../models";

@Injectable({
  providedIn: 'root'
})
export class UserMgmService {
  constructor() {
  }

  currentUser: WritableSignal<AppUser | null> = signal(JSON.parse(localStorage.getItem("user")!))

  register(user: AppUser) {
    this.currentUser.set(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  logout() {
    this.currentUser.set(null)
    localStorage.removeItem("user")
  }

  addTagToCurrent(tag: string) {
    if (this.currentUser()?.tags.indexOf(tag) ?? -1 < 0) {
      this.currentUser.update(value => {
        value?.tags.push(tag)
        return value
      })
      localStorage.setItem("user", JSON.stringify(this.currentUser()))
    }
  }

  removeTagFromCurrent(tag: string) {
    if (this.currentUser() !== null) {
      this.currentUser.update(value => {
        value!.tags = value!.tags.filter((t) => t != tag)
        return value
      })
      localStorage.setItem("user", JSON.stringify(this.currentUser()))
    }
  }

  subscribeCurrentToEvent(event: HseEvent) {
    this.currentUser.update(value => {
      if (value === null || (value.subscribedTo.indexOf(event) ?? -1) >= 0) {
        return value
      }
      value.subscribedTo.push(event)
      localStorage.setItem("user", JSON.stringify(value))
      event.responded.push(value)
      return value
    })
  }

  eventsForCurrent = computed(() => this.currentUser()?.subscribedTo)

  login(user: AppUser) {
    this.currentUser.set(user)
    localStorage.setItem("user", JSON.stringify(user))
  }
}
