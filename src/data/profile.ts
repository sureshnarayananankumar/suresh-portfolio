/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for all portfolio content.
 *  Edit this file to update text, links, projects and skills.
 *  Everything below is taken from the resume (public/resume.pdf).
 * ─────────────────────────────────────────────────────────────
 */
import {
  Accessibility,
  Bot,
  Database,
  FlaskConical,
  Languages,
  LayoutTemplate,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'
import type {
  Achievement,
  Education,
  ExperienceItem,
  Metric,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  Strength,
} from '../types'

export const profile: Profile = {
  name: 'Suresh Kumar N',
  shortName: 'Suresh',
  title: 'Full Stack Developer',
  experience: '3+ years',
  location: 'Chennai, India',
  email: 'sureshnarayanan122@gmail.com',
  phone: '+91 82200 36016',
  phoneHref: 'tel:+918220036016',
  linkedin: 'https://linkedin.com/in/suresh-kumar-bbb113253',
  github: '', // e.g. 'https://github.com/your-username' — empty = hidden
  availability: 'Full Stack Developer | Open to Opportunities', // set to null to hide
  resumeFile: 'resume.pdf',
  resumeDownloadName: 'Suresh_Kumar_N_Full_Stack_Developer.pdf',
  siteUrl: '', // optional, your deployed URL
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const heroTech = ['Java', 'Spring Boot', 'Angular', 'React', 'Node.js', 'AI']

export const metrics: Metric[] = [
  { value: 3, suffix: '+', label: 'Years of experience', note: 'Full stack, since June 2023' },
  { value: 3, label: 'Government platforms delivered', note: 'JSRS · RABT · NSS for Oman' },
  { value: 5, label: 'JSRS business modules delivered', note: 'Spring Boot microservices + Angular' },
  { value: 2, label: 'Production Generative AI features', note: 'Contract summarisation · document classification' },
]

export const aboutParagraphs = [
  'I’m a Full Stack Developer at Business Gateways International in Chennai, where for the past three years I’ve built secure, bilingual (English/Arabic) e-government platforms for the Government of Oman.',
  'My work spans the whole stack: Java, Spring Boot and microservices on the backend, Angular and React.js on the frontend, and production work on Node.js (Express.js), MySQL and MongoDB. I’ve delivered features end to end inside Agile (Scrum) teams — from REST API design and JWT/RBAC security to data modelling, approval workflows, unit testing and CI/CD.',
  'I also bring Generative AI into real business flows, integrating LLM APIs for contract summarisation, document classification and bilingual support chatbots.',
]

export const strengths: Strength[] = [
  {
    icon: Server,
    title: 'Backend & APIs',
    text: 'Layered Spring Boot and Express.js services with DTO validation, centralised exception handling and clean REST design.',
  },
  {
    icon: LayoutTemplate,
    title: 'Modern frontends',
    text: 'Angular (Signals, SSR, standalone components) and React.js with Redux — reusable components and reactive forms.',
  },
  {
    icon: ShieldCheck,
    title: 'Security by default',
    text: 'Spring Security, JWT authentication and role-based access control enforced from API to route guards.',
  },
  {
    icon: Sparkles,
    title: 'Applied Generative AI',
    text: 'LLM API integrations that summarise contracts, classify documents and power bilingual chatbots.',
  },
  {
    icon: Languages,
    title: 'Bilingual & accessible',
    text: 'English/Arabic routing with automatic RTL, JSON-LD SEO and WCAG accessibility features.',
  },
  {
    icon: Users,
    title: 'Agile delivery',
    text: 'Scrum teams, code reviews, unit testing and Jenkins CI/CD — shipping features from design to deployment.',
  },
]

export const projects: Project[] = [
  {
    id: 'jsrs',
    code: 'JSRS',
    name: 'Joint Supplier Registration System',
    fullName: 'JSRS — Joint Supplier Registration System',
    region: 'Oman · Government',
    context: 'Professional project · Business Gateways International',
    summary:
      'A government supplier registration platform for Oman covering enterprise administration, company profiles, contract management, JStore and Sky Cards.',
    accent: 'blue',
    visual: 'microservices',
    stack: [
      'Java', 'Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'Microservices', 'Angular',
      'TypeScript', 'RxJS', 'MySQL', 'JWT', 'LLM APIs', 'JUnit', 'Mockito', 'Maven', 'Jenkins',
    ],
    highlights: ['5 business modules', 'JWT + RBAC security', 'AI contract summaries'],
    challenge:
      'Five distinct business domains — Enterprise Admin, Company Profile, Contract Management, JStore and Sky Cards — needed to be delivered as secure, maintainable services with consistent APIs, role-based access and fast, reliable reviewer workflows.',
    solution:
      'Each module was built as a Spring Boot microservice with an Angular front end on MySQL, following a layered Controller–Service–Repository architecture. Security was enforced end to end with Spring Security, JWT and RBAC, and an LLM-backed service was added to help reviewers digest contracts faster.',
    contributions: [
      'Developed five business modules using Spring Boot microservices and Angular.',
      'Built REST APIs with Controller–Service–Repository architecture, DTO validation and centralised exception handling.',
      'Implemented JWT authentication, Spring Security and role-based access control, enforced in the UI through Angular route guards and HTTP interceptors.',
      'Designed normalised MySQL schemas and Spring Data JPA / Hibernate repositories; wrote optimised SQL queries for module reports.',
      'Developed AI-assisted contract summarisation highlighting key dates, values and obligations for reviewers.',
      'Built reusable Angular components, reactive forms, RxJS-based services and lazy-loaded modules.',
      'Added JUnit and Mockito unit tests and shipped Maven builds through Jenkins CI/CD.',
    ],
    achievements: [
      '5 business modules delivered as Spring Boot microservices',
      'All 5 modules secured with Spring Security, JWT and RBAC',
      'Production Generative AI feature: contract summarisation',
    ],
  },
  {
    id: 'rabt',
    code: 'RABT',
    name: 'Industrial Supplier Registration & Certification',
    fullName: 'RABT — Industrial Supplier Registration & Certification Platform',
    region: 'Oman · Government',
    context: 'Professional project · Business Gateways International',
    summary:
      'A bilingual supplier registration and certification platform for Oman, with an Angular 22 SSR public site, approval workflows and an AI support chatbot.',
    accent: 'violet',
    visual: 'bilingual',
    stack: [
      'Node.js', 'Express.js', 'Angular 22', 'TypeScript', 'Signals', 'SSR', 'MySQL', 'REST APIs',
      'Tailwind CSS', 'AI Chatbot', 'Vitest',
    ],
    highlights: ['12 routes · 47 components in 1 week', '338 translated strings', '59 Vitest tests'],
    challenge:
      'The public website had to move from Next.js to Angular 22 quickly, while serving English and Arabic audiences with correct RTL layouts, strong SEO, accessibility, and two end-to-end approval workflows behind it.',
    solution:
      'The site was rebuilt with Angular 22, SSR and Signals using AI-assisted development, backed by Node.js (Express.js) REST APIs on MySQL. Locale-aware routing switches layout direction automatically, and a bilingual chatbot is deferred to browser idle time so it never delays first page load.',
    contributions: [
      'Migrated the public website from Next.js to Angular 22 SSR — 12 routes and 47 standalone components ready for testing in one week.',
      'Developed Node.js (Express.js) REST APIs for reCAPTCHA-secured registration and contact forms, platform statistics and tender listings.',
      'Implemented supplier registration and certification approval workflows across Angular review screens, REST APIs and MySQL status tracking.',
      'Implemented English/Arabic routing and automatic RTL layout switching across 338 translated UI strings.',
      'Added SEO metadata, JSON-LD structured data and a WCAG accessibility menu.',
      'Built the bilingual Sustainability module and revamped the supplier dashboard with profile-completeness scoring across 4 areas.',
      'Integrated a bilingual AI chatbot for supplier support.',
      'Wrote 59 Vitest unit tests covering routing, SEO and form logic.',
    ],
    achievements: [
      'Next.js → Angular 22 SSR migration in one week (12 routes, 47 components)',
      '338 translated UI strings with automatic RTL switching',
      '2 end-to-end approval workflows',
      '59 Vitest unit tests',
    ],
  },
  {
    id: 'nss',
    code: 'NSS',
    name: 'National Subsidy System',
    fullName: 'NSS — National Subsidy System',
    region: 'Oman · Government',
    context: 'Professional project · Business Gateways International',
    summary:
      'A subsidy application platform with document processing, AI-assisted document checks, reporting dashboards and backend microservices.',
    accent: 'cyan',
    visual: 'documents',
    stack: [
      'Node.js', 'Express.js', 'React.js', 'Redux', 'MongoDB', 'Mongoose', 'JWT', 'LLM APIs',
      'Chart.js', 'ApexCharts', 'Jenkins',
    ],
    highlights: ['AI document classification', 'MongoDB reporting pipelines', 'JWT-secured APIs'],
    challenge:
      'Subsidy applications arrive with many supporting documents. Reviewers needed reliable uploads, faster detection of wrong or incomplete documents, and clear reporting across applicants and applications.',
    solution:
      'A React.js and Redux front end connects to Node.js (Express.js) microservices on MongoDB. An AI step in the upload flow classifies each document and flags missing details before manual review, while aggregation pipelines feed reporting dashboards.',
    contributions: [
      'Developed React application modules with reusable components, Hooks and Redux.',
      'Built JWT-secured REST APIs and document upload/download functionality.',
      'Designed MongoDB collections, Mongoose schemas and indexes for applicants, applications and documents.',
      'Integrated AI-based document classification and missing-detail checks before manual review.',
      'Developed MongoDB aggregation pipelines feeding Chart.js and ApexCharts reporting dashboards.',
      'Improved page speed, responsiveness, WCAG accessibility and cross-browser compatibility; shipped via Git and Jenkins CI/CD.',
    ],
    achievements: [
      'Production Generative AI feature: document classification',
      'Reporting dashboards powered by MongoDB aggregation pipelines',
    ],
  },
]

export const skillGroups: SkillGroup[] = [
  {
    icon: Server,
    title: 'Backend Engineering',
    description: 'Service design on the JVM and Node.js.',
    skills: ['Java', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'Maven', 'Node.js', 'Express.js', 'Mongoose', 'Microservices', 'WebSockets'],
  },
  {
    icon: LayoutTemplate,
    title: 'Frontend Engineering',
    description: 'Component-driven, reactive interfaces.',
    skills: ['Angular (v9–v22)', 'TypeScript', 'RxJS', 'Signals', 'Standalone Components', 'SSR', 'Reactive Forms', 'Angular Material', 'React.js', 'Redux', 'React Hooks', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3', 'SCSS'],
  },
  {
    icon: Database,
    title: 'Databases',
    description: 'Relational and document data modelling.',
    skills: ['MySQL', 'MongoDB', 'Snowflake', 'Database Design', 'Query Optimization', 'Indexing', 'SQL'],
  },
  {
    icon: Bot,
    title: 'AI & Generative AI',
    description: 'LLMs inside real business workflows.',
    skills: ['LLM API Integration', 'OpenAI', 'Claude', 'Prompt Engineering', 'AI Chatbots', 'AI Document Processing', 'Claude Code'],
  },
  {
    icon: ShieldCheck,
    title: 'Security & API Design',
    description: 'Secure, predictable contracts.',
    skills: ['RESTful APIs', 'Spring Security', 'JWT', 'RBAC', 'DTO Validation', 'Exception Handling', 'reCAPTCHA'],
  },
  {
    icon: FlaskConical,
    title: 'Testing & DevOps',
    description: 'Confidence from commit to release.',
    skills: ['JUnit', 'Mockito', 'Jasmine', 'Karma', 'Vitest', 'Git', 'Jenkins (CI/CD)', 'Postman', 'Jira', 'Code Reviews', 'Agile (Scrum)'],
  },
  {
    icon: Accessibility,
    title: 'Accessibility & Internationalization',
    description: 'Inclusive, bilingual experiences.',
    skills: ['i18n', 'Arabic RTL', 'English/Arabic Routing', 'WCAG Accessibility', 'SEO (JSON-LD)', 'Cross-browser Responsiveness'],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: 'Business Gateways International',
    role: 'Full Stack Developer',
    location: 'Chennai, India',
    period: 'June 2023 – Present',
    summary:
      'Built and shipped 3 bilingual (English/Arabic) e-government platforms for the Government of Oman across Java, Node.js, Angular, React.js, MySQL and MongoDB.',
    tracks: [
      {
        project: 'JSRS',
        stack: 'Java · Spring Boot · Angular · MySQL',
        points: [
          'Delivered 5 business modules as Spring Boot microservices with Angular front ends.',
          'Secured every module with Spring Security, JWT and RBAC.',
          'Built an LLM-powered contract summarisation service for reviewers.',
        ],
      },
      {
        project: 'RABT',
        stack: 'Node.js · Angular 22 SSR · MySQL',
        points: [
          'Led the Next.js → Angular 22 SSR migration: 12 routes, 47 components in one week.',
          'Engineered 2 approval workflows and English/Arabic RTL across 338 strings.',
          'Integrated a bilingual AI chatbot; wrote 59 Vitest unit tests.',
        ],
      },
      {
        project: 'NSS',
        stack: 'Node.js · React.js · Redux · MongoDB',
        points: [
          'Developed React.js modules and JWT-secured Express.js APIs for documents.',
          'Added AI document classification and missing-detail checks to uploads.',
          'Built MongoDB aggregation pipelines for Chart.js/ApexCharts dashboards.',
        ],
      },
    ],
  },
]

export const achievements: Achievement[] = [
  {
    icon: Trophy,
    title: 'Three production government platforms',
    text: 'Delivered JSRS, RABT and NSS for Oman within three years, across Java, Node.js, Angular and React.js stacks.',
  },
  {
    icon: Layers,
    title: 'Angular 22 SSR migration in one week',
    text: 'Migrated a live public website from Next.js — 12 routes and 47 standalone components ready for testing in one week.',
  },
  {
    icon: Sparkles,
    title: 'Two production Generative AI features',
    text: 'Contract summarisation and document classification, shipped inside real approval workflows.',
  },
  {
    icon: Languages,
    title: 'Bilingual English/Arabic experiences',
    text: 'Locale-aware routing with automatic RTL layout switching across hundreds of translated UI strings.',
  },
]

export const education: Education = {
  degree: 'B.Sc. Information Technology',
  institution: 'Madurai Kamaraj University',
  period: '2019 – 2022',
  score: '83%',
}


/**
 * Which professional projects each skill was used on (from the resume's tech stacks and bullets).
 * Powers the project filter in the Skills section. Skills not listed are general (not project-specific).
 */
export const skillUsage: Record<string, string[]> = {
  Java: ['jsrs'], 'Spring Boot': ['jsrs'], 'Spring Data JPA': ['jsrs'], Hibernate: ['jsrs'], Maven: ['jsrs'],
  'Node.js': ['rabt', 'nss'], 'Express.js': ['rabt', 'nss'], Mongoose: ['nss'], Microservices: ['jsrs', 'rabt', 'nss'],
  'Angular (v9–v22)': ['jsrs', 'rabt'], TypeScript: ['jsrs', 'rabt'], RxJS: ['jsrs'], Signals: ['rabt'],
  'Standalone Components': ['rabt'], SSR: ['rabt'], 'Reactive Forms': ['jsrs'], 'React.js': ['nss'], Redux: ['nss'],
  'React Hooks': ['nss'], 'Next.js': ['rabt'], 'Tailwind CSS': ['rabt'],
  MySQL: ['jsrs', 'rabt'], MongoDB: ['nss'], 'Database Design': ['jsrs', 'nss'], 'Query Optimization': ['jsrs'],
  Indexing: ['nss'], SQL: ['jsrs'],
  'LLM API Integration': ['jsrs', 'nss'], 'AI Chatbots': ['rabt'], 'AI Document Processing': ['nss'], 'Claude Code': ['rabt'],
  'RESTful APIs': ['jsrs', 'rabt', 'nss'], 'Spring Security': ['jsrs'], JWT: ['jsrs', 'nss'], RBAC: ['jsrs'],
  'DTO Validation': ['jsrs'], 'Exception Handling': ['jsrs'], reCAPTCHA: ['rabt'],
  JUnit: ['jsrs'], Mockito: ['jsrs'], Vitest: ['rabt'], Git: ['nss'], 'Jenkins (CI/CD)': ['jsrs', 'nss'],
  i18n: ['rabt'], 'Arabic RTL': ['rabt'], 'English/Arabic Routing': ['rabt'], 'WCAG Accessibility': ['rabt', 'nss'],
  'SEO (JSON-LD)': ['rabt'], 'Cross-browser Responsiveness': ['nss'],
}
