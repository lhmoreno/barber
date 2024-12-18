import { createTRPCRouter } from "@/lib/trpc/root";

import { getPublicServices } from "./get-public-services";
import { getPublicService } from "./get-service";
import { getServices } from "./get-services";
import { createService } from "./create-service";
import { updateService } from "./update-service";
import { deleteService } from "./delete-service";

export const serviceRouter = createTRPCRouter({
  getAll: getServices,
  create: createService,
  update: updateService,
  delete: deleteService,

  public: {
    getAll: getPublicServices,
    get: getPublicService,
  },
});
