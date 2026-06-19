import { Event, NavItem } from './types';

export const IMAGES = {
  logo: "https://i.ibb.co.com/VpzHz4sj/logo-bg-transparan.png",
  hero: "https://picsum.photos/id/216/1920/1080",
  about: "https://picsum.photos/id/102/800/1200",
  joyride: "https://i.ibb.co.com/qFV390Dm/IMG-0165-1.jpg",
  community: "https://picsum.photos/id/177/800/800",
  event1: "https://i.ibb.co.com/93bYBzBW/Pi7-image-tool.jpg",
  event2: "https://i.ibb.co.com/DqW18vL/Pi7-image-tool-1.jpg",
  event3: "https://i.ibb.co.com/Q3vJ2h14/Indonesian3.jpg",
  event4: "https://i.ibb.co.com/gbnV4wFM/DSCF1072-EDIT-2.jpg",
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Filosofi', href: '#joyride' },
  { label: 'Jejak', href: '#events' },
  { label: 'Komunitas', href: '#community' },
];

export const EVENTS: Event[] = [
  {
    id: 'irs1',
    year: '2022',
    title: 'IRS 1: The Debut',
    location: 'Yogyakarta',
    description: 'Awal mula sejarah. Berkumpul di Loko Cafe Malioboro, menyatukan penggemar kereta dan furry dalam satu wadah.',
    image: IMAGES.event1
  },
  {
    id: 'irs2',
    year: '2022',
    title: 'IRS 2: Bandung Local Line',
    location: 'Bandung',
    description: 'Menjelajahi jalur lokal Bandung Raya. Momen kebersamaan dalam perjalanan komuter yang ikonik.',
    image: IMAGES.event2
  },
  {
    id: 'irs3',
    year: '2023',
    title: 'IRS 3: Bogor Station Meet',
    location: 'Bogor',
    description: 'Hangout santai di Tomoro Coffee, sekitar Stasiun Bogor. Momen akrab sambil menikmati suasana hiruk pikuk stasiun.',
    image: IMAGES.event3
  },
  {
    id: 'irs4',
    year: '2023',
    title: 'IRS 4: NOSTALGICFURS',
    location: 'Solo',
    description: 'Puncak pencapaian komunitas (Nostalgicfurs). Menyewa secara pribadi Kereta Uap Jaladara untuk perjalanan eksklusif.',
    image: IMAGES.event4,
    isPeak: true
  }
];