import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { AppUser, HseEvent } from "../models";
import { EventsMgmService } from "../internships-mgm/events-mgm.service";

@Injectable({
  providedIn: 'root'
})
export class UserMgmService {
  constructor(protected eventsMgmService: EventsMgmService) {
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
    if (this.currentUser() === null || (this.currentUser()!.subscribedTo.map(ev => ev.id).includes(event.id))) {
      return;
    }

    this.currentUser.update(value => {
      event.responded.push(value!)
      value!.subscribedTo.push(event)
      localStorage.setItem("user", JSON.stringify(value))
      this.eventsMgmService.updateToLocal(event)
      return value
    })
  }

  login(user: AppUser) {
    this.currentUser.set(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  updateChannel(selectedChannel: string) {
    this.currentUser.update(u => {
      if (u === null || u.selectedChannel === selectedChannel) {
        return u;
      }

      u.selectedChannel = selectedChannel;
      localStorage.setItem("user", JSON.stringify(u))
      return u;
    })
  }
}
