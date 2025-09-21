import { ReactElement } from 'react';

// Defines the structure for a single destination
export interface Destination {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
  category: 'heritage' | 'nature' | 'adventure' | 'spiritual';
  bestTime: string;
  duration: string;
  highlights: string[];
}

// Defines the structure for a user's trip plan
// This is now updated to match ALL fields from your TripPlanModal
export interface TripPlan {
  id: string;
  userId: string;
  destination: string; // Changed from destinations array
  duration: number;
  budget: string;
  tripType: 'cultural' | 'adventure' | 'spiritual' | 'nature' | 'food';
  safetyMonitoring: boolean;
  numberOfPeople: number;
  itineraryText: string;
  createdAt: Date;
}

// Defines the structure for an item in the user's wishlist from MongoDB
export interface WishlistItem {
  _id: string; // The ID from the MongoDB database
  destination: Destination;
  addedAt: Date;
  userId: string;
}

// Defines the structure for a cultural destination
export interface CulturalDestination {
  id: string;
  icon: ReactElement;
  title: string;
  description: string;
  detailedDescription: string;
  history: string;
  bestTime: string;
  duration: string;
  images: string[];
  highlights: string[];
}

