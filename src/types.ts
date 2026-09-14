export type Profile = {
  name: string
  role: string
  headline: string
  tagline: string
  bio: string
  location: string
  email: string
  phone: string
  website: string
  github: string
  linkedin: string
  whatsapp: string
  photo: string
}

export type Service = {
  id: string
  title: string
  description: string
}

export type Project = {
  id: string
  title: string
  description: string
  url: string
  github: string
  tags: string[]
  image: string
  featured: boolean
}

export type SiteData = {
  profile: Profile
  services: Service[]
  stack: string[]
  projects: Project[]
  adminPin: string
}
