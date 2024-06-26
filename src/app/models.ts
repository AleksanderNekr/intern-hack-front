export interface AppUser {
  email: string
  pass: string
  tags: string[]
  role: string
  subscribedTo: HseEvent[]
  selectedChannel: string
  tgId: string
}

export const Tags: string[] = [ 'IT', 'Анализ данных', 'Бэкенд' ]

export const Roles: string[] = [
  'Студент',
  'Сотрудник проектного офиса',
  'Представитель компании-партнера',
]

export interface HseEvent {
  id: number
  name: string
  type: string
  tags: string[]
  organizerName: string
  endDate: Date
  responded: string[]
  description: string
}

export const EventTypes = [
  'Стажировка',
  'Проектная работа',
  'Событие',
]
