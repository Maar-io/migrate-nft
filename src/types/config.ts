export interface ProjectData {
    address: string;
    logoUrl?: string;
}

export interface ProjectConfig {
    [key: string]: ProjectData;
}