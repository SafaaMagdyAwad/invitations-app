import { LucideIcon } from 'lucide-react'
import React from 'react'

export type Page =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'events'
  | 'create-event'
  | 'guests'
  | 'invitation'
  | 'confirm-success'
  | 'decline'
  | 'qr-scanner'
  | 'templates'
  | 'settings'

export interface Guest {
  id: number
  name: string
  phone: string
  status: string
  qr: string
  checked: boolean
  eventName: string
  updatedAt: string
  plusOne?: boolean
}

export interface EventItem {
  id: number
  name: string
  date: string
  time: string
  location: string
  guests: number
  confirmed: number
  img: string
  tag: string
}

export interface TemplateItem {
  id: string
  name: string
  icon: LucideIcon
  color: string
  img: string
  h: number
}