import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ACCEPTED_TYPES = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
];

export const uploadSchema = z.object({
    applicationId: z
        .string()
        .uuid("Invalid application"),

    documentType: z
        .string()
        .min(1, "Document type is required"),

    file: z
        .instanceof(File)
        .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            "Maximum file size is 10 MB"
        )
        .refine(
            (file) => ACCEPTED_TYPES.includes(file.type),
            "Only PDF, JPG and PNG files are allowed"
        ),
});

export type UploadFormData = z.infer<typeof uploadSchema>;