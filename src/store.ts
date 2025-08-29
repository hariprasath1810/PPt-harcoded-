import { create } from 'zustand';

// In a real app, you might want to generate the slide ids dynamically
const slides = Array.from({ length: 28 }, (_, i) => (i + 1).toString());

type PresentationState = {
  slides: string[];
  currentSlide: string;
  actions: {
    next: () => void;
    prev: () => void;
    goTo: (slideId: string) => void;
  };
};

export const useStore = create<PresentationState>((set, get) => ({
  slides,
  currentSlide: slides[0],
  actions: {
    next: () => {
      const { slides, currentSlide } = get();
      const currentIndex = slides.indexOf(currentSlide);
      const nextIndex = Math.min(currentIndex + 1, slides.length - 1);
      set({ currentSlide: slides[nextIndex] });
    },
    prev: () => {
      const { slides, currentSlide } = get();
      const currentIndex = slides.indexOf(currentSlide);
      const prevIndex = Math.max(currentIndex - 1, 0);
      set({ currentSlide: slides[prevIndex] });
    },
    goTo: (slideId: string) => {
      const { slides } = get();
      if (slides.includes(slideId)) {
        set({ currentSlide: slideId });
      }
    },
  },
}));
