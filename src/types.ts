export interface Room {
  id: string;
  name: string;
  subtitle: string;
  priceINR: number;
  priceUSD: number;
  sizeSqFt: number;
  occupancy: string;
  bedType: string;
  description: string;
  highlights: string[];
  amenities: string[];
  coverImage: string;
  galleryImages: string[];
  viewType: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'villas' | 'tea' | 'pool' | 'dining' | 'activities';
  image: string;
  caption: string;
  location?: string;
}

export interface MapAttraction {
  id: string;
  name: string;
  category: 'Resort' | 'Tea Garden' | 'Peak' | 'Waterfall' | 'Wildlife' | 'Dam';
  lat: number;
  lng: number;
  distanceKm: number;
  driveTimeMin: number;
  description: string;
  image: string;
  highlights: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  stayedIn: string;
  avatar: string;
}

export interface BookingFormData {
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  fullName: string;
  email: string;
  phone: string;
  mealPlan: string;
  specialAddons: string[];
  specialRequests: string;
}

export interface DiningItem {
  id: string;
  name: string;
  category: 'Kerala Special' | 'Halal Gourmet' | 'Tea & Brews' | 'Desserts';
  description: string;
  priceINR: number;
  isVegetarian: boolean;
  isChefSpecial?: boolean;
  image: string;
}

export interface WeatherData {
  tempC: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  mistLevel: string;
}

export interface MenuItem {
  name: string;
  priceINR: number;
}

export interface MenuCategory {
  category: string;
  items: MenuItem[];
}
