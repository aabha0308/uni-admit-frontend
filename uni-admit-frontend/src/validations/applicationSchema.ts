import { z } from "zod";

const CURRENT_YEAR = new Date().getFullYear();

export const applicationSchema = z.object({
    profileId: z
        .string()
        .uuid({
            message: "A valid profile is required before applying.",
        }),

    courseName: z
        .string()
        .trim()
        .min(2, "Course name must be at least 2 characters.")
        .max(150, "Course name is too long."),

    university: z
        .string()
        .trim()
        .min(2, "University name must be at least 2 characters.")
        .max(150, "University name is too long."),

    intakeYear: z
        .number({
            message: "Intake year is required.",
        })
        .int("Intake year must be a whole number.")
        .min(
            CURRENT_YEAR,
            "Intake year cannot be in the past."
        )
        .max(
            CURRENT_YEAR + 5,
            "Intake year is too far in the future."
        ),
});

export type ApplicationFormValues =
    z.infer<typeof applicationSchema>;