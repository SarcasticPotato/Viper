export interface Package {
  pid?: number;
  name?: string;
  folder?: string;
  links: Link[]
}

interface Link {
  fid: number;
  status: number;
  statusmsg: string;
  plugin: string;
  format_size: string;
  size: number;
  error: string;
  url: string;
  packageID: number;
  order: number;
}
