import { writable } from 'svelte/store';

// Create a writable store for addresses
export const addresses = writable<string[]>([]);

// Initialize from storage if available
if (typeof window !== 'undefined') {
  const storedAddresses = localStorage.getItem('addresses');
  if (storedAddresses) {
    try {
      const parsedAddresses = JSON.parse(storedAddresses);
      addresses.set(parsedAddresses);
    } catch (e) {
      console.error('Failed to parse stored addresses:', e);
    }
  }
}

// Subscribe to changes and update storage
addresses.subscribe(value => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('addresses', JSON.stringify(value));
  }
}); 