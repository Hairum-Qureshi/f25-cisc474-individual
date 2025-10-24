import { z } from 'zod';

// Reference DTO (lightweight)
export const DeadlineRef = z.object({
  id: z.string(), // because you're using cuid()
  courseTitle: z.string(),
  courseDeadline: z.string().datetime(),
});
export type DeadlineRef = z.infer<typeof DeadlineRef>;

// Output DTO (API responses)
export const DeadlineOut = z.object({
  id: z.string(),
  courseTitle: z.string(),
  courseDescription: z.string().optional().nullable(),
  courseDeadline: z.string().datetime(),
  ownerId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type DeadlineOut = z.infer<typeof DeadlineOut>;

// Creation DTO (API request bodies)
export const DeadlineCreateIn = z.object({
  courseTitle: z.string().min(1).max(50),
  courseDescription: z.string().optional().nullable(),
  courseDeadline: z.string().datetime(),
  ownerId: z.string(),
});
export type DeadlineCreateIn = z.infer<typeof DeadlineCreateIn>;

// Update DTO (API request bodies)
export const DeadlineUpdateIn = z.object({
  courseTitle: z.string().min(1).max(50).optional(),
  courseDescription: z.string().optional().nullable(),
  courseDeadline: z.string().datetime().optional(),
  ownerId: z.string().optional(),
});
export type DeadlineUpdateIn = z.infer<typeof DeadlineUpdateIn>;
