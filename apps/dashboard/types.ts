export interface Event {
// NOTE: nyambung ke bagian lain
  id: string;
  year: string;
  title: string;
  location: string;
  description: string;
  image?: string;
  isPeak?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}