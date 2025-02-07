export interface ProjectData {
  address: string;
  tokenURIchangeNeeded: string;
  logoUrl: string;
}

export interface ProjectConfig {
  [key: string]: ProjectData;
}