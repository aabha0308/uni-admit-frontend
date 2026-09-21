import { z } from "zod";

/**
 * ============================================================================
 * Uni Admit Frontend
 * Profile Validation Schema
 * ============================================================================
 *
 * Mirrors backend ProfileRequest DTO.
 */

export const profileSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required")
        .max(50, "First name cannot exceed 50 characters"),

    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Last name cannot exceed 50 characters"),

    dateOfBirth: z
        .string()
        .min(1, "Date of birth is required"),

    phone: z
        .string()
        .trim()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot exceed 15 digits"),

    address: z
        .string()
        .trim()
        .min(5, "Address is required")
        .max(255, "Address cannot exceed 255 characters"),

    city: z
        .string()
        .trim()
        .min(2, "City is required")
        .max(100, "City cannot exceed 100 characters"),

    state: z
        .string()
        .trim()
        .min(2, "State is required")
        .max(100, "State cannot exceed 100 characters"),

    country: z
        .string()
        .trim()
        .min(2, "Country is required")
        .max(100, "Country cannot exceed 100 characters"),

    tenthPercentage: z.coerce
        .number()
        .min(0, "10th percentage cannot be less than 0")
        .max(100, "10th percentage cannot exceed 100"),

    twelfthPercentage: z.coerce
        .number()
        .min(0, "12th percentage cannot be less than 0")
        .max(100, "12th percentage cannot exceed 100"),
});

/**
 * Type inferred from schema
 */
export type ProfileFormData = z.input<typeof profileSchema>;