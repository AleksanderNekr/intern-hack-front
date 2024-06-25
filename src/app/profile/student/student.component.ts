import { Component, computed } from '@angular/core';
import { UserMgmService } from "../../user-mgm/user-mgm.service";
import { FormsModule } from "@angular/forms";
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { EventsMgmService } from "../../internships-mgm/events-mgm.service";
import { HseEvent, Roles, Tags } from "../../models";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  styleUrls: [ './student.component.css' ]
})
export class StudentComponent {

  constructor(protected userService: UserMgmService,
              private eventsMgmService: EventsMgmService) {
    this.allTags = Tags
  }

  currentUser = computed(() => this.userService.currentUser())

  protected readonly role = Roles[0];
  protected readonly allTags: string[] = []
  educationalProgram = "Программная инженерия"
  courseNumber = 1
  experience = "Без опыта"
  currentJob = 'Безработный'
  skills = ''
  summary = ''
  fullName = ''

  events = computed(() => this.eventsMgmService.events())

  addTagHandle(tag: string) {
    this.userService.addTagToCurrent(tag)
  }

  removeTagHandle(tag: string) {
    this.userService.removeTagFromCurrent(tag)
  }

  subscribeToEvent(event: HseEvent) {
    this.userService.subscribeCurrentToEvent(event)
  }

  getTags(event: HseEvent) {
    return event.tags.join('; ')
  }

  protected readonly Roles = Roles;

  selectedChannel: string = this.currentUser()?.selectedChannel ?? 'none'

  showFormToAddId() {
    if (this.currentUser()?.tgId.length === 0) {
      // todo
    }
  }

  updateChannel() {
    this.userService.updateChannel(this.selectedChannel);
  }
}
