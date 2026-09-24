import type { SiteData } from '../types'

export const DEFAULT_DATA: SiteData = {
  profile: {
    name: 'Sebastian Pedreros',
    role: 'Informático · Freelancer',
    headline: 'Desarrollo web profesional',
    tagline: 'Creamos tu página web, optimizada y atractiva',
    bio: 'Diseño y desarrollo sitios a medida para empresas y profesionales: rápidos, claros y pensados para generar consultas. Trabajo con Python, Java, React y Node, con foco en rendimiento, SEO y soporte después del lanzamiento.',
    location: 'Chile · trabajo remoto',
    email: 'seebap17@gmail.com',
    phone: '+56 9 9887 6024',
    website: 'https://www.tusitioweb.cl',
    github: '',
    linkedin: '',
    whatsapp: '56998876024',
    photo: '/sebastian.jpg',
  },
  stack: [
    'Python',
    'Django',
    'Flask',
    'Java',
    'Spring',
    'HTML5',
    'CSS3',
    'JavaScript',
    'React',
    'Node.js',
  ],
  services: [
    {
      id: 'landing',
      title: 'Páginas web y landing pages',
      description:
        'Sitios modernos, claros y rápidos para presentar tu marca, captar leads y vender con confianza.',
    },
    {
      id: 'responsive',
      title: 'Diseño responsivo',
      description:
        'Tu web se ve y funciona bien en celular, tablet y escritorio. Nada se rompe, todo se entiende.',
    },
    {
      id: 'seo',
      title: 'SEO integrado',
      description:
        'Estructura, velocidad y contenido pensados para que Google te encuentre y tus clientes te elijan.',
    },
    {
      id: 'soporte',
      title: 'Soporte continuo',
      description:
        'No te dejo el sitio y desaparezco. Ajustes, mejoras y acompañamiento cuando tu negocio lo necesita.',
    },
  ],
  projects: [
    {
      id: 'delvalle',
      title: 'Del Valle Sushi',
      description:
        'Carta online para armar rolls, ver promos y pedir por WhatsApp. Local en Coelemu, Ñuble.',
      url: 'https://delvallesushi.cl',
      github: '',
      tags: ['Gastronomía', 'Carta online', 'WhatsApp'],
      image: '/proyectos/delvalle.jpg',
      featured: true,
    },
    {
      id: 'cedrus',
      title: 'Cedrus Café Restaurant',
      description:
        'Sitio del café y restaurant en Coelemu: carta de lunes a domingo, especialidades de la casa y contacto directo.',
      url: 'https://cedrusrestaurant.cl',
      github: '',
      tags: ['Gastronomía', 'Carta online', 'Coelemu'],
      image: '/proyectos/cedrus.jpg',
      featured: true,
    },
    {
      id: 'artejoyas',
      title: 'ArteJoyas',
      description:
        'Tienda web de joyas y relojes, con piezas destacadas, ubicación en Coelemu y contacto por WhatsApp.',
      url: 'https://artejoyas.cl',
      github: '',
      tags: ['E-commerce', 'Catálogo', 'WhatsApp'],
      image: '/proyectos/artejoyas.jpg',
      featured: true,
    },
    {
      id: 'mujica',
      title: 'Mujica Abogada Penal',
      description:
        'Sitio profesional para Paula Mujica, abogada penalista en Chillán: defensa de imputados, víctimas y agenda online.',
      url: 'https://mujicaabogadapenal.cl',
      github: '',
      tags: ['Sitio profesional', 'Agenda', 'Ñuble'],
      image: '/proyectos/mujica.jpg',
      featured: true,
    },
  ],
}
