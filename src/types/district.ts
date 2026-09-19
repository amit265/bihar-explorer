export interface LocalizedText {
  en: string;
  hi: string;
}

export interface VerificationInfo {
  status: "verified" | "partially_verified" | "unverified";
  lastVerifiedAt?: string | null;
  sources: Array<{
    name: string;
    url?: string;
    type: "official" | "government" | "local" | "map" | "other";
  }>;
}

export interface District {
  id: string;
  slug: string;
  name: LocalizedText;
  division: string;
  description?: LocalizedText;
  overview?: LocalizedText;
  history?: LocalizedText;
  geography?: {
    location?: LocalizedText;
    areaSqKm?: number | null;
    boundaries?: LocalizedText;
    physiography?: LocalizedText;
    climate?: LocalizedText;
    rivers?: Array<{ name: LocalizedText; description: LocalizedText }>;
  };
  demographics?: {
    population?: { value: number | null; year: string | null; source: string | null };
    density?: { value: number | null; year: string | null };
    literacyRate?: { value: number | null; year: string | null };
    sexRatio?: { value: number | null; year: string | null };
  };
  administration?: {
    headquarters?: LocalizedText;
    subdivisions?: number | null;
    blocks?: number | null;
    villages?: number | null;
    asOf?: string | null;
  };
  economy?: {
    description?: LocalizedText;
    majorIndustries?: LocalizedText;
  };
  agriculture?: {
    description?: LocalizedText;
    majorCrops?: LocalizedText;
  };
  culture?: {
    festivals?: LocalizedText;
    artAndCrafts?: LocalizedText;
    food?: LocalizedText;
  };
  transport?: {
    road?: LocalizedText;
    railway?: LocalizedText;
    airport?: LocalizedText;
  };
  importantPersonalities?: Array<{ name: LocalizedText; association: LocalizedText }>;
  tourismIdentity?: Array<LocalizedText>;
  didYouKnow?: Array<LocalizedText>;
  sources?: Array<{ title: string; organization: string; url: string; year: string | null }>;
  heroImage: string | null;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  tourismThemes: string[];
  religiousAssociations: string[];
  placeIds: string[];
  featuredPlaceIds: string[];
  nearbyDistrictIds: string[];
  status: "draft" | "published";
  verification: VerificationInfo;
}
