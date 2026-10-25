import type { LucideIcon } from 'lucide-react'

export interface SocialLink {
  label: string
  href: string
  kind: 'email' | 'phone' | 'linkedin' | 'github'
  display: string
}

export interface Profile {
  name: string
  shortName: string
  title: string
  experience: string
  location: string
  email: string
  phone: string
  phoneHref: string
  linkedin: string
  /** Leave empty to hide. */
  github: string
  /** Set to null to hide the availability badge in the hero. */
  availability: string | null
  /** Path relative to /public. */
  resumeFile: string
  resumeDownloadName: string
  siteUrl: string
}

export interface Metric {
  value: number
  suffix?: string
  label: string
  note: string
}

export interface Strength {
  icon: LucideIcon
  title: string
  text: string
}

export interface Project {
  id: string
  code: string
  name: string
  fullName: string
  region: string
  context: string
  summary: string
  accent: 'blue' | 'violet' | 'cyan'
  visual: 'microservices' | 'bilingual' | 'documents'
  stack: string[]
  highlights: string[]
  challenge: string
  solution: string
  contributions: string[]
  achievements: string[]
  /** Leave empty — buttons stay hidden until a real, shareable URL exists. */
  liveUrl?: string
  repoUrl?: string
}

export interface SkillGroup {
  icon: LucideIcon
  title: string
  description: string
  skills: string[]
}

export interface Achievement {
  icon: LucideIcon
  title: string
  text: string
}

export interface ExperienceItem {
  company: string
  role: string
  location: string
  period: string
  summary: string
  tracks: { project: string; stack: string; points: string[] }[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  score: string
}

export interface NavItem {
  id: string
  label: string
}
