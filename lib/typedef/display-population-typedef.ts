import { z } from 'zod'

export const DisplayPopulationTypedef = z.object({
resid: z.number(),
name: z.string(),
gender: z.string(),
birthdate: z.string(),
age: z.number(),
category: z.string(),
street: z.string(),
house: z.string(),
status: z.string(),
education: z.string(),
occupation: z.string(),
nationality: z.string(),
religion: z.string(),
benefit: z.string(),
pwd: z.string(),
ofw: z.string(),
income: z.string(),
head: z.string(),
children: z.number(),
iodized: z.string(),
fortified: z.string(),
housetype: z.string(),
occupancy: z.string(),
water: z.string(),
toilet: z.string(),
planning: z.string(),
method: z.string(),
pregnant: z.string(),
lactating: z.string(),
nursing: z.string(),
})

export type Population2 = z.infer<typeof DisplayPopulationTypedef>




