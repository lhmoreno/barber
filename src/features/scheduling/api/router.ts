import { createTRPCRouter } from "@/lib/trpc/root";

import { createPublicScheduling } from "./create-public-scheduling";
import { getPublicScheduling } from "./get-scheduling";

export const schedulingRouter = createTRPCRouter({
  public: {
    get: getPublicScheduling,

    create: createPublicScheduling,
  },
});
