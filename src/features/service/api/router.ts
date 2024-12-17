import { createTRPCRouter } from "@/lib/trpc/root";

import { getPublicServices } from "./get-public-services";
import { getPublicService } from "./get-service";

export const serviceRouter = createTRPCRouter({
  public: {
    getAll: getPublicServices,
    get: getPublicService,
  },
});
