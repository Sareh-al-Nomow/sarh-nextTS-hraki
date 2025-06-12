// Single language item
export interface Language {
  id: number;
  languageCode: string;
  languageName: string;
  isActive: boolean;
  flagUrl: string;
  created_at: string;  // ISO date string
  updated_at: string;  // ISO date string
}

// Response wrapper
export interface LanguageResponse {
  data: Language[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
