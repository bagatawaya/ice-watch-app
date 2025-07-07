
export type SightingType = 'checkpoint' | 'detainment' | 'sighting_motion' | 'sighting_stationary' | 'workplace_raid' | 'residential' | 'courthouse' | 'other';

export interface NotificationSettings {
  radius: number; // in miles
  email: boolean;
  sms: boolean;
  popup: boolean;
  phoneNumber?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
  password?: string; // In a real app this would be a hash
  notificationSettings: NotificationSettings;
  isAdmin: boolean;
  state?: string;
  county?: string;
}

export interface Report {
  id: string;
  reporter: Pick<User, 'id' | 'username'>;
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  photoBase64: string; // can be image or video thumbnail
  videoBase64?: string;
  address: string;
  area?: string;
  sightingType: SightingType;
  sightingTypeOtherDescription?: string;
}

export interface IceFacility {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  website: string;
  notes: string;
  state: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  url: string;
  date: string; // ISO 8601 format e.g., '2024-07-15'
  summary: string;
  imageUrl: string;
}

interface LawsuitContent {
  name: string;
  about: string;
  whoItHelps: string;
  goal: string;
  questions: { question: string; relevance: string; }[];
  steps: string[];
  documents: string[];
  resources: { name: string; phone: string; website: string; }[];
  deadlines: string;
  privacy: string;
}

export interface Lawsuit {
  id: string;
  en: LawsuitContent;
  es: LawsuitContent;
}

export interface Lawyer {
  id: number;
  name: string;
  firm: string;
  phone: string;
  website: string | null;
  proBono: boolean;
  languages: string[];
  specialties: string[];
  state: string;
  city?: string;
}