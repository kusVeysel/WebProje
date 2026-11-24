import { INITIAL_PROJECTS } from '../data/initialProjects'

const STORAGE_KEY = 'istakip-projects'
const SEED_MIGRATION_KEY = 'istakip-seed-seven-v1'

export function readProjects() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      localStorage.setItem(SEED_MIGRATION_KEY, 'complete')
      return INITIAL_PROJECTS
    }

    const savedProjects = JSON.parse(stored)
    if (!Array.isArray(savedProjects)) return INITIAL_PROJECTS
    if (localStorage.getItem(SEED_MIGRATION_KEY) === 'complete') return savedProjects

    const additionalSamples = INITIAL_PROJECTS.slice(4)
      .filter((sample) => !savedProjects.some((project) => project.id === sample.id))
    const migratedProjects = [...savedProjects, ...additionalSamples]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedProjects))
    localStorage.setItem(SEED_MIGRATION_KEY, 'complete')
    return migratedProjects
  } catch {
    return INITIAL_PROJECTS
  }
}

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}
