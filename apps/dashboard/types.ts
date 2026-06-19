export interface Event {
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