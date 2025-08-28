

import { z } from "zod";

export const tellUsAboutSelf = z.object({
  experience: z.string(),
  goal: z.string().optional(),
  about: z.string(),
  specialInstructions: z.string().optional()
});
