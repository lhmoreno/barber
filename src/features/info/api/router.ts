import { createTRPCRouter } from "@/lib/trpc/root";
import { getInfo } from "./get-info";
import { updateInfo } from "./update-info";
import { removeImage, uploadImage } from "./upload-image";

export const infoRouter = createTRPCRouter({
  public: {
    get: getInfo,
  },
  update: updateInfo,
  updateLogo: uploadImage,
  removeLogo: removeImage,
});
