import { z } from 'zod'

export const PopulationTypedef = z.object({
  id: z.number(),
  owner: z.string(), 
  establishment: z.string(),
  bld_no: z.string(),
  street: z.string(),
  type: z.string(),
  water: z.string(),
  toilet: z.string(),
})

export type Population = z.infer<typeof PopulationTypedef>
