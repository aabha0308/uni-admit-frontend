export interface DocumentResponse {
    id: string;
    applicationId: string;
    studentId: string;
    originalFileName: string;
    contentType: string;
    fileSize: number;
    documentType: string;
    status: string;
    downloadUrl: string;
    uploadedAt: string;
}