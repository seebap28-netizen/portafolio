import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Project, SiteData } from '../types'
import { compressImage, fileToDataUrl, loadCv, saveCv, saveSite, type StoredCv } from '../lib/store'

type Props = {
  data: SiteData
  onChange: (next: SiteData) => void
}

export default function Admin({ data, onChange }: Props) {
  const [cv, setCv] = useState<StoredCv | null>(() => loadCv())
  const [status, setStatus] = useState('')
  const [draft, setDraft] = useState<SiteData>(data)

  function persist(next: SiteData) {
    setDraft(next)
    onChange(next)
    saveSite(next)
    setStatus('Cambios guardados en este navegador')
  }

  async function onCv(file?: File) {
    if (!file) return
    if (file.size > 4_500_000) {
      setStatus('El CV debe pesar menos de 4.5 MB')
      return
    }
    const stored = { name: file.name, mime: file.type, dataUrl: await fileToDataUrl(file) }
    saveCv(stored)
    setCv(stored)
    setStatus('CV listo para descargar en el portafolio')
  }

  async function addProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const file = fd.get('image') as File | null
    const image = file && file.size ? await compressImage(file) : ''
    const tags = String(fd.get('tags') || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const project: Project = {
      id: crypto.randomUUID(),
      title: String(fd.get('title') || 'Proyecto'),
      description: String(fd.get('description') || ''),
      url: String(fd.get('url') || ''),
      github: String(fd.get('github') || ''),
      tags,
      image,
      featured: true,
    }
    persist({ ...draft, projects: [project, ...draft.projects] })
    form.reset()
  }

  function removeProject(id: string) {
    persist({ ...draft, projects: draft.projects.filter((p) => p.id !== id) })
  }

  return (
    <section className="wrap admin">
      <Link to="/">← Ver sitio público</Link>
      <h1>Panel de Sebastian Pedreros</h1>
      <p className="notice">
        Los datos (CV, proyectos y perfil) se guardan en este navegador. Si cambias de
        computador, vuelve a cargarlos. Para producción puedes reemplazar el flyer, el correo y
        el WhatsApp reales aquí.
      </p>
      {status && <p className="ok">{status}</p>}

      <div className="grid-2">
        <form
          className="card form"
          onSubmit={(e) => {
            e.preventDefault()
            persist(draft)
          }}
        >
          <h3>Perfil y promoción</h3>
          <label>
            Nombre
            <input
              value={draft.profile.name}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, name: e.target.value } })
              }
            />
          </label>
          <label>
            Titular
            <input
              value={draft.profile.headline}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, headline: e.target.value } })
              }
            />
          </label>
          <label>
            Frase
            <input
              value={draft.profile.tagline}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, tagline: e.target.value } })
              }
            />
          </label>
          <label>
            Bio
            <textarea
              value={draft.profile.bio}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, bio: e.target.value } })
              }
            />
          </label>
          <label>
            Email
            <input
              value={draft.profile.email}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, email: e.target.value } })
              }
            />
          </label>
          <label>
            Teléfono / WhatsApp visible
            <input
              value={draft.profile.phone}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, phone: e.target.value } })
              }
            />
          </label>
          <label>
            WhatsApp (solo números, con código de país)
            <input
              value={draft.profile.whatsapp}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, whatsapp: e.target.value } })
              }
            />
          </label>
          <label>
            Sitio
            <input
              value={draft.profile.website}
              onChange={(e) =>
                setDraft({ ...draft, profile: { ...draft.profile, website: e.target.value } })
              }
            />
          </label>
          <label>
            Foto o flyer
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const photo = await compressImage(file)
                setDraft({ ...draft, profile: { ...draft.profile, photo } })
              }}
            />
          </label>
          <button className="btn btn-primary" type="submit">
            Guardar perfil
          </button>
        </form>

        <div className="card form">
          <h3>Curriculum vitae</h3>
          <p className="muted">
            Ya hay un CV en el sitio (curriculum.pdf). Aquí puedes reemplazarlo por otra versión.
          </p>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => void onCv(e.target.files?.[0])}
          />
          {cv ? (
            <p className="ok">Reemplazo cargado: {cv.name}</p>
          ) : (
            <p className="ok">Usando el CV del escritorio: curriculum.pdf</p>
          )}
          <div className="row-actions">
            <a
              className="btn btn-teal"
              href={cv?.dataUrl ?? '/curriculum.pdf'}
              download={cv?.name ?? 'CV-Sebastian-Pedreros.pdf'}
            >
              Probar descarga
            </a>
            {cv && (
              <button
                className="btn danger"
                type="button"
                onClick={() => {
                  saveCv(null)
                  setCv(null)
                  setStatus('CV eliminado')
                }}
              >
                Quitar CV
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="card form" style={{ marginTop: 22 }}>
        <h3>Subir una página o proyecto</h3>
        <form className="form" onSubmit={(e) => void addProject(e)}>
          <label>
            Título
            <input name="title" required placeholder="Tienda para..." />
          </label>
          <label>
            Descripción
            <textarea name="description" required placeholder="Qué hiciste y para quién" />
          </label>
          <label>
            URL del sitio
            <input name="url" placeholder="https://" />
          </label>
          <label>
            GitHub (opcional)
            <input name="github" placeholder="https://github.com/..." />
          </label>
          <label>
            Tecnologías (separadas por coma)
            <input name="tags" placeholder="React, Django, SEO" />
          </label>
          <label>
            Captura o logo
            <input name="image" type="file" accept="image/*" />
          </label>
          <button className="btn btn-teal" type="submit">
            Publicar proyecto
          </button>
        </form>
      </div>

      <div className="project-admin" style={{ marginTop: 22 }}>
        {draft.projects.map((project) => (
          <article className="card project-admin-item" key={project.id}>
            {project.image ? (
              <img className="thumb" src={project.image} alt="" />
            ) : (
              <div className="thumb" />
            )}
            <div>
              <h3>{project.title}</h3>
              <p className="muted">{project.description}</p>
              <button className="btn danger" type="button" onClick={() => removeProject(project.id)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
