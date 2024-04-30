import { Sticker } from "@/components/sticker/StickerArea";
import { UniqueIdentifier } from "@dnd-kit/core";

import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

export type Persist<T> = (config: StateCreator<T>, options: PersistOptions<T>) => StateCreator<T>;

export type StickerStore = {
  stickers: Sticker[];
  setStickers: (T: Sticker[]) => void;
  setSize?: (id: UniqueIdentifier, size: { width: string; height: string }) => void;
};

const INIT_STICKERS: Sticker[] = [
  {
    id: "1",
    content: "memo-1",
    color: "#6fa",
    date: new Date(),
    top: 0,
    left: 0,
    width: 200,
    height: 200,
  },
  {
    id: "2",
    content: "memo-2",
    color: "#6fa",
    date: new Date(),
    top: 200,
    left: 40,
    width: 200,
    height: 300,
  },
];

export const useStickerStore = create<StickerStore>(
  (persist as Persist<StickerStore>)(
    (set) => ({
      stickers: INIT_STICKERS,
      setStickers: (stickers) =>
        set((prev) => {
          return { ...prev, stickers };
        }),
    }),
    {
      name: "stickers",
    },
  ),
);
