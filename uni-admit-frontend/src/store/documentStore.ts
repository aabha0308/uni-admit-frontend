import { create } from "zustand";
import documentService from "@/services/documentService";
import type { DocumentResponse } from "@/types";

interface DocumentStore {
    documents: DocumentResponse[];
    loading: boolean;
    error: string | null;
    fetchDocuments: () => Promise<void>;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
    documents: [],
    loading: false,
    error: null,

    fetchDocuments: async () => {
        set({ loading: true, error: null });
        try {
            // Fetches the latest uploaded documents via documentService
            const docs = await documentService.getMyDocuments();
            set({ documents: docs, loading: false });
        } catch (err: any) {
            set({
                error:
                    err?.response?.data?.message ||
                    err?.response?.data?.detail ||
                    "Failed to load documents.",
                loading: false,
            });
        }
    },
}));