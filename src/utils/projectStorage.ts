
export interface StoredProject {
  id: string;
  ipfsHash: string;
  name: string;
  description: string;
  category: string;
  targetAmount: number;
  apy: number;
  riskLevel: string;
  duration: number;
  minInvestment: number;
  teamSize: number;
  currentAmount: number;
  lenders: number;
  scfRound: number;
  daysRemaining: number;
  createdBy: string;
  createdAt: string;
}

const PROJECTS_STORAGE_KEY = 'blend_scf_projects';

export const saveProjectToStorage = (project: StoredProject): void => {
  try {
    const existingProjects = getProjectsFromStorage();
    const updatedProjects = [...existingProjects, project];
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
    console.log('Project saved to local storage:', project.name);
  } catch (error) {
    console.error('Error saving project to storage:', error);
  }
};

export const getProjectsFromStorage = (): StoredProject[] => {
  try {
    const projectsJson = localStorage.getItem(PROJECTS_STORAGE_KEY);
    return projectsJson ? JSON.parse(projectsJson) : [];
  } catch (error) {
    console.error('Error getting projects from storage:', error);
    return [];
  }
};

export const removeProjectFromStorage = (projectId: string): void => {
  try {
    const existingProjects = getProjectsFromStorage();
    const updatedProjects = existingProjects.filter(p => p.id !== projectId);
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(updatedProjects));
    console.log('Project removed from storage:', projectId);
  } catch (error) {
    console.error('Error removing project from storage:', error);
  }
};
