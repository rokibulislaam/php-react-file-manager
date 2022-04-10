export interface FilesList {
  location: string;
  items: {
    type: 'file' | 'dir' | 'back';
    path: string;
    name: string;
    size: string;
    time: string;
  }[];
}
