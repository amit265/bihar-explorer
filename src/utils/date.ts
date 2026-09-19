/**
 * Utility to format ISO date string (YYYY-MM-DD) to Indian numeric format (DD/MM/YYYY)
 */
export const formatToIndianDate = (dateStr: string | undefined | null): string => {
  if (!dateStr) return '';
  const parts = dateStr.trim().split('-');
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
};
