import { z } from 'zod';

// Reference DTOs (lightweight relation embeds)
export const DeadlineRef = z.object({
  id: z.string().uuid(),
  title: z.string(),
  dueDate: z.string().datetime(),
});
export type DeadlineRef = z.infer<typeof DeadlineRef>;

// Output DTOs (API responses)
export const DeadlineOut = z.object({
  id: z.string().uuid(),
  title: z.string(),
  dueDate: z.string().datetime(),
  ownerId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type DeadlineOut = z.infer<typeof DeadlineOut>;

// Creation DTOs (API request bodies)
export const DeadlineCreateIn = z.object({
  title: z.string().min(1).max(50),
  dueDate: z.string().datetime(),
  ownerId: z.string().uuid(),
});
export type DeadlineCreateIn = z.infer<typeof DeadlineCreateIn>;

// Update DTOs (API request bodies)
export const DeadlineUpdateIn = z.object({
  title: z.string().min(1).max(50),
  dueDate: z.string().datetime(),
  ownerId: z.string().uuid().optional(),
});
export type DeadlineUpdateIn = z.infer<typeof DeadlineUpdateIn>;

// Query DTOs (API query parameters)
// export const CoursesListFilter = Pagination.extend({
//   ownerId: z.string()uuid().optional(),
//   nameLike: z.string().optional(),
// });
