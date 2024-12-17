import { publicProcedure } from "@/lib/trpc/root";

export const getUnavailableDays = publicProcedure.query(
  async ({ ctx, input }) => {
    return {
      days: [0, 6],
      dates: [],
    };
  }
);
