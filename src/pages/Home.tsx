import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Profile, Project } from '../types'
import { uniqueStack } from '../components/TechGrid'
import { loadCv, triggerCvDownload, type StoredCv } from '../lib/store'

type Props = {
  profile: Profile
  stack: string[]
  services: { id: string; title: string; description: string }[]
  projects: Project[]
}

const process = [
  {
    n: '01',
    title: 'Descubrimiento',
    text: 'Entiendo tu negocio, audiencia y objetivo. Definimos alcance, estructura y tono del sitio.',
  },
  {
    n: '02',
    title: 'Diseño y desarrollo',
    text: 'Interfaz clara, código limpio y un sitio rápido en móvil y escritorio, listo para posicionar.',
  },
  {
    n: '03',
    title: 'Lanzamiento y soporte',
    text: 'Publicamos, medimos y seguimos cerca: ajustes, mejoras y acompañamiento cuando lo necesites.',
  },
]

export default function Home({ profile, stack, services, projects }: Props) {
  const [cv] = useState<StoredCv | null>(() => loadCv())
  const [open, setOpen] = useState(false)
  const wa = useMemo(() => {
    const digits = profile.whatsapp.replace(/\D/g, '')
    const text = encodeURIComponent(
      `Hola ${profile.name}, quiero cotizar una página web profesional.`,
    )
    return digits ? `https://wa.me/${digits}?text=${text}` : `mailto:${profile.email}`
  }, [profile])

  function downloadCv() {
    triggerCvDownload(cv)
  }

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <Link className="brand" to="/">
            <span className="brand-mark">SP</span>
            <span>
              {profile.name}
              <small>Desarrollo web</small>
            </span>
          </Link>
          <nav className={`nav-links ${open ? 'is-open' : ''}`}>
            <a href="#servicios" onClick={() => setOpen(false)}>
              Servicios
            </a>
            <a href="#trabajo" onClick={() => setOpen(false)}>
              Trabajo
            </a>
            <a href="#proceso" onClick={() => setOpen(false)}>
              Proceso
            </a>
            <a href="#contacto" onClick={() => setOpen(false)}>
              Contacto
            </a>
          </nav>
          <div className="nav-end">
            <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">
              Hablar por WhatsApp
            </a>
            <button
              className="menu-btn"
              type="button"
              aria-label="Abrir menú"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="kicker">Informático · Freelancer · Chile</p>
            <h1>
              Sitios web profesionales
              <em>claros, rápidos y hechos para convertir.</em>
            </h1>
            <p className="lead">{profile.bio}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={wa} target="_blank" rel="noreferrer">
                Cotizar un proyecto
              </a>
              <a className="btn btn-ghost" href="#trabajo">
                Ver trabajo
              </a>
              <button className="btn btn-ghost" type="button" onClick={downloadCv}>
                Descargar CV
              </button>
            </div>
            <ul className="stats">
              <li>
                <strong>Full stack</strong>
                <span>Python, Java, React y Node</span>
              </li>
              <li>
                <strong>Enfoque comercial</strong>
                <span>SEO, móvil y conversión</span>
              </li>
              <li>
                <strong>Soporte real</strong>
                <span>Acompañamiento después del lanzamiento</span>
              </li>
            </ul>
          </div>
          <figure className="hero-photo">
            <img src={profile.photo || '/sebastian.jpg'} alt={profile.name} />
            <figcaption>
              <strong>{profile.name}</strong>
              <span>{profile.phone}</span>
            </figcaption>
          </figure>
        </section>

        <section className="band">
          <div className="wrap band-inner">
            <p>Tecnologías</p>
            <div className="logo-row">
              {uniqueStack(stack).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap section" id="servicios">
          <div className="section-head">
            <p className="eyebrow">Servicios</p>
            <h2>Una presencia digital a la altura de tu negocio.</h2>
            <p>
              Diseño y desarrollo sitios que se ven serios, cargan rápido y ayudan a que te
              escriban.
            </p>
          </div>
          <div className="grid-2 services">
            {services.map((service) => (
              <article className="card service" key={service.id}>
                <h3>{service.title}</h3>
                <p className="muted">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap section" id="trabajo">
          <div className="section-head">
            <p className="eyebrow">Portafolio</p>
            <h2>Trabajo reciente</h2>
            <p>Proyectos de sitios, catálogos y sistemas web.</p>
          </div>
          <div className="grid-3 work-grid">
            {projects.length === 0 && (
              <article className="card">
                <h3>Portafolio en construcción</h3>
                <p className="muted">Pronto verás aquí sitios reales con enlace en vivo.</p>
              </article>
            )}
            {projects.map((project) => (
              <article className="project" key={project.id}>
                <div className="browser">
                  <div className="browser-bar">
                    <span />
                    <span />
                    <span />
                    <em>{project.url ? project.url.replace(/^https?:\/\//, '') : 'proyecto'}</em>
                  </div>
                  <div className="project-cover">
                    {project.image ? (
                      <img src={project.image} alt="" />
                    ) : (
                      <span>{project.title}</span>
                    )}
                  </div>
                </div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p className="muted">{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.url && (
                    <a className="text-link" href={project.url} target="_blank" rel="noreferrer">
                      Visitar sitio →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap section" id="proceso">
          <div className="section-head">
            <p className="eyebrow">Método</p>
            <h2>Así trabajamos un sitio nuevo.</h2>
          </div>
          <div className="grid-3 process">
            {process.map((step) => (
              <article key={step.n}>
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p className="muted">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="wrap" id="cv">
          <div className="cta">
            <div>
              <p className="eyebrow light">Curriculum</p>
              <h2>Perfil profesional descargable</h2>
              <p>Curriculum vitae en PDF, listo para descargar.</p>
            </div>
            <button className="btn btn-light" type="button" onClick={downloadCv}>
              Descargar CV
            </button>
          </div>
        </section>

        <section className="wrap section" id="contacto">
          <div className="contact">
            <div>
              <p className="eyebrow">Contacto</p>
              <h2>Cuéntame qué necesitas.</h2>
              <p className="muted">
                Landing, sitio corporativo, catálogo o sistema a medida. Respondo por WhatsApp o
                correo, con una propuesta clara.
              </p>
              <ul className="contact-list">
                <li>
                  <span>WhatsApp</span>
                  <a href={wa} target="_blank" rel="noreferrer">
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <span>Email</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <span>Ubicación</span>
                  <strong>{profile.location}</strong>
                </li>
              </ul>
            </div>
            <form
              className="card form"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const name = String(data.get('name') || '')
                const mail = String(data.get('email') || '')
                const msg = String(data.get('message') || '')
                window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
                  `Consulta web — ${name}`,
                )}&body=${encodeURIComponent(`${msg}\n\nContacto: ${mail}`)}`
              }}
            >
              <label>
                Nombre
                <input name="name" required placeholder="Nombre y empresa" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="tucorreo@empresa.com" />
              </label>
              <label>
                Proyecto
                <textarea name="message" required placeholder="Tipo de sitio, plazo y objetivo." />
              </label>
              <button className="btn btn-primary" type="submit">
                Enviar consulta
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Desarrollo web profesional · Chile</span>
          <Link to="/admin">Acceso interno</Link>
        </div>
      </footer>
    </>
  )
}
