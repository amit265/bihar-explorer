import taxonomyData from './tourism/taxonomy.json';
import { allDistricts } from './tourism/districts';
import { allPlaces } from './tourism/places';
import { District } from '../types/district';
import { Place } from '../types/place';

export const taxonomy = taxonomyData;
export const mockDistricts: District[] = allDistricts as unknown as District[];
export const mockPlaces: Place[] = allPlaces;

// Helper function to get place count for a district
export const getDistrictName = (districtId: string): string => {
  const district = allDistricts.find((d: any) => d.id === districtId);
  return district ? (district.name?.en || district.name?.hi || districtId) : districtId;
};

export const getDistrictPlaceCount = (districtId: string): number => {
  return mockPlaces.filter(p => p.districtId === districtId).length;
};
