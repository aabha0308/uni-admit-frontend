import api from "@/lib/axios";
import type { DocumentResponse } from "@/types";

const DOCUMENT_BASE = "/docs";

const documentService = {
    /**
     * Upload document
     * POST /docs/upload
     *
     * Backend expects:
     * multipart/form-data
     * - applicationId
     * - documentType
     * - file
     */
    async uploadDocument(
        applicationId: string,
        documentType: string,
        file: File
    ): Promise<DocumentResponse> {
        const formData = new FormData();

        formData.append("applicationId", applicationId);
        formData.append("documentType", documentType);
        formData.append("file", file);

        const { data } = await api.post<DocumentResponse>(
            `${DOCUMENT_BASE}/upload`,
            formData
        );

        return data;
    },

    /**
     * GET /docs/{documentId}
     */
    async getDocument(
        documentId: string
    ): Promise<DocumentResponse> {
        const { data } = await api.get<DocumentResponse>(
            `${DOCUMENT_BASE}/${documentId}`
        );

        return data;
    },

    /**
     * GET /docs/application/{applicationId}
     */
    async getDocumentsByApplication(
        applicationId: string
    ): Promise<DocumentResponse[]> {
        const { data } = await api.get<DocumentResponse[]>(
            `${DOCUMENT_BASE}/application/${applicationId}`
        );

        return data;
    },

    /**
     * GET /docs/my
     */
    async getMyDocuments(): Promise<DocumentResponse[]> {
        const { data } = await api.get<DocumentResponse[]>(
            `${DOCUMENT_BASE}/my`
        );

        return data;
    },

    /**
     * DELETE /docs/{documentId}
     */
    async deleteDocument(
        documentId: string
    ): Promise<void> {
        await api.delete(
            `${DOCUMENT_BASE}/${documentId}`
        );
    },
};

export default documentService;