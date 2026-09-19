import { LocalizedText, VerificationInfo } from './district';

export interface Place {
  id: string;
  slug: string;
  name: LocalizedText;
  districtId: string;
  placeType: string;
  primaryCategory: string;
  categories: string[];
  subcategories: string[];
  religions: string[];
  circuits: string[];
  tags: string[];
  audiences: string[];
  discoveryFlags: {
    popular: boolean;
    featured: boolean;
    hiddenGem: boolean;
    familyFriendly: boolean;
    weekendTrip: boolean;
    photography: boolean;
  };
  shortDescription: LocalizedText;
  description: LocalizedText;
  history?: LocalizedText;
  significance?: LocalizedText;
  location: {
    address: LocalizedText;
    latitude: number | null;
    longitude: number | null;
    mapQuery: string;
  };
  visitingInfo: {
    openingHours?: Array<{
      day: string;
      open?: string;
      close?: string;
      closed?: boolean;
    }>;
    entryFee?: {
      amount: number;
      currency: string;
      type: string;
    };
    recommendedDurationMinutes?: number;
    bestTimeToVisit?: LocalizedText;
  };
  howToReach?: {
    road?: LocalizedText;
    railway?: Array<{
      name: LocalizedText;
      distanceKm?: number;
    }>;
    airport?: Array<{
      name: LocalizedText;
      distanceKm?: number;
    }>;
    localTransport?: LocalizedText;
  };
  costEstimate?: {
    entry?: {
      min: number | null;
      max: number | null;
      currency: string;
      note?: LocalizedText;
    };
    localTransport?: {
      min: number | null;
      max: number | null;
      currency: string;
      note?: LocalizedText;
    };
  };
  facilities?: {
    parking?: boolean | null;
    toilets?: boolean | null;
    drinkingWater?: boolean | null;
    food?: boolean | null;
    accommodation?: boolean | null;
    atm?: boolean | null;
    medical?: boolean | null;
  };
  accessibility?: {
    difficulty?: "easy" | "moderate" | "difficult";
    walkingRequired?: boolean | null;
    walkingDistanceMeters?: number | null;
    stairs?: boolean | null;
    wheelchairAccessible?: boolean | null;
    suitableForChildren?: boolean | null;
    suitableForElderly?: boolean | null;
  };
  travelTips?: Array<LocalizedText>;
  nearbyPlaceIds?: string[];
  images?: Array<{
    url: string;
    type: "hero" | "gallery";
    caption?: LocalizedText;
    source?: string;
  }>;
  heroImage?: string;
  imageGallery?: any[];
  videoGallery?: any[];
  verification: VerificationInfo;
  status: "draft" | "published";
  createdAt?: string | null;
  updatedAt?: string | null;
}
