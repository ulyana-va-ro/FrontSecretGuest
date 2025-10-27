export interface CleanlinessDetail {
  label: string; 
  comment: string; 
}

export interface CleanlinessSection {
  overallScore: number; 
  details: CleanlinessDetail[];
  imageSrc: string; 
}