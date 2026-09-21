import { z } from "zod";

export const reviewSchema = z.object({
    newStatus: z.string(),

    reason: z
        .string()
        .optional(),

    adminComments: z
        .string()
        .optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;