import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface UIState {
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  isMobileMenuOpen: boolean;
  newsletterSubscribers: string[];
}

const initialState: UIState = {
  isQuickViewOpen: false,
  quickViewProduct: null,
  isMobileMenuOpen: false,
  newsletterSubscribers: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openQuickView: (state, action: PayloadAction<Product>) => {
      state.isQuickViewOpen = true;
      state.quickViewProduct = action.payload;
    },
    closeQuickView: (state) => {
      state.isQuickViewOpen = false;
      state.quickViewProduct = null;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    subscribeToNewsletter: (state, action: PayloadAction<string>) => {
      if (!state.newsletterSubscribers.includes(action.payload)) {
        state.newsletterSubscribers.push(action.payload);
      }
    },
  },
});

export const {
  openQuickView,
  closeQuickView,
  toggleMobileMenu,
  closeMobileMenu,
  subscribeToNewsletter,
} = uiSlice.actions;
export default uiSlice.reducer;
