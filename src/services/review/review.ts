import * as StoreReview from 'expo-store-review';

export async function maybeRequestStoreReview() {
  const isAvailable = await StoreReview.isAvailableAsync();
  if (!isAvailable) {
    return false;
  }

  await StoreReview.requestReview();
  return true;
}
