import { pb } from "@/lib/pb";
import { Church } from "@/types/church.type";

export const churchProcedure = {
  getAll: async () => {
    const response = await pb.collection('igreja').getFullList();
    return response;
  },
};
