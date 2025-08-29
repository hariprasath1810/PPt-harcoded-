import { create } from 'zustand';

// In a real app, you might want to generate the slide ids dynamically
const slides = Array.from({ length: 28 }, (_, i) => (i + 1).toString());

type PresentationState = {
  slides: string[];
  currentSlide: string;
  actions: {
    goTo: (slideId: string) => void;
  };
};

export const useStore = create<PresentationState>((set, get) => ({
  slides,
  currentSlide: slides[0],
  actions: {
    goTo: (slideId: string) => {
      const { slides } = get();
      if (slides.includes(slideId)) {
        set({ currentSlide: slideId });
      }
    },
  },
}));
