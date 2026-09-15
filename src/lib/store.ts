import { DEFAULT_DATA } from '../data/defaults'
import type { SiteData } from '../types'

const KEY = 'sp-portfolio-v5'
const CV_KEY = 'sp-cv-v1'
export const DEFAULT_CV_HREF = '/curriculum.pdf'
export const DEFAULT_CV_NAME = 'CV-Sebastian-Pedreros.pdf'

export function loadSite(): SiteData {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return structuredClone(DEFAULT_DATA)
    const parsed = JSON.parse(raw) as Partial<SiteData>
    return {
      ...structuredClone(DEFAULT_DATA),
      ...parsed,
      profile: {
        ...DEFAULT_DATA.profile,
        ...parsed.profile,
        email:
          !parsed.profile?.email || parsed.profile.email.includes('example@')
            ? DEFAULT_DATA.profile.email
            : parsed.profile.email,
        photo:
          !parsed.profile?.photo ||
          parsed.profile.photo.includes('promo.jpg') ||
          parsed.profile.photo.includes('portrait.jpg')
            ? DEFAULT_DATA.profile.photo
            : parsed.profile.photo,
      },
      services: parsed.services?.length ? parsed.services : DEFAULT_DATA.services,
      stack: parsed.stack?.length ? parsed.stack : DEFAULT_DATA.stack,
      projects: parsed.projects ?? DEFAULT_DATA.projects,
    }
  } catch {
    return structuredClone(DEFAULT_DATA)
  }
}

export function saveSite(data: SiteData) {
  localStorage.setItem(KEY, JSON.stringify(data))
}

export type StoredCv = {
  name: string
  mime: string
  dataUrl: string
}

export function loadCv(): StoredCv | null {
  try {
    const raw = localStorage.getItem(CV_KEY)
    return raw ? (JSON.parse(raw) as StoredCv) : null
  } catch {
    return null
  }
}

export function saveCv(cv: StoredCv | null) {
  if (!cv) localStorage.removeItem(CV_KEY)
  else localStorage.setItem(CV_KEY, JSON.stringify(cv))
}

export function triggerCvDownload(stored?: StoredCv | null) {
  const a = document.createElement('a')
  if (stored) {
    a.href = stored.dataUrl
    a.download = stored.name || DEFAULT_CV_NAME
  } else {
    a.href = DEFAULT_CV_HREF
    a.download = DEFAULT_CV_NAME
  }
  a.click()
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

export async function compressImage(file: File, max = 1400): Promise<string> {
  const url = URL.createObjectURL(file)
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image()
      el.onload = () => resolve(el)
      el.onerror = reject
      el.src = url
    })
    const scale = Math.min(1, max / Math.max(img.width, img.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.width * scale)
    canvas.height = Math.round(img.height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) return fileToDataUrl(file)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.82)
  } finally {
    URL.revokeObjectURL(url)
  }
}
