export type MockApplication = {
  applicationId: string;
  studentFirstName: string;
  studentLastName: string;
  studentPhone: string;
  studentCity: string;

  courseName: string;
  university: string;
  intakeYear: number;

  status: "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW";

  submittedAt: string;

  tenthPercentage: number;
  twelfthPercentage: number;

  adminComments: string;
  rejectionReason: string;
};

export const mockApplications: MockApplication[] = [
  {
    applicationId: "APP-001",
    studentFirstName: "Aarav",
    studentLastName: "Sharma",
    studentPhone: "+91 9876543210",
    studentCity: "Mumbai",

    courseName: "Computer Science",
    university: "Technical University of Munich",
    intakeYear: 2026,

    status: "PENDING",

    submittedAt: "01/08/2026 10:30 AM",

    tenthPercentage: 91,
    twelfthPercentage: 88,

    adminComments: "",
    rejectionReason: "",
  },

  {
    applicationId: "APP-002",
    studentFirstName: "Priya",
    studentLastName: "Mehta",
    studentPhone: "+91 9876543211",
    studentCity: "Pune",

    courseName: "Data Science",
    university: "RWTH Aachen University",
    intakeYear: 2026,

    status: "APPROVED",

    submittedAt: "29/07/2026 09:00 AM",

    tenthPercentage: 94,
    twelfthPercentage: 92,

    adminComments: "Excellent academic profile.",
    rejectionReason: "",
  },

  {
    applicationId: "APP-003",
    studentFirstName: "Rohan",
    studentLastName: "Patel",
    studentPhone: "+91 9876543212",
    studentCity: "Ahmedabad",

    courseName: "Artificial Intelligence",
    university: "University of Stuttgart",
    intakeYear: 2026,

    status: "REJECTED",

    submittedAt: "01/01/2026 10:30 AM",

    tenthPercentage: 78,
    twelfthPercentage: 74,

    adminComments: "",
    rejectionReason: "Academic requirements not met.",
  },

  {
    applicationId: "APP-004",
    studentFirstName: "Ananya",
    studentLastName: "Singh",
    studentPhone: "+91 9876543213",
    studentCity: "Delhi",

    courseName: "Software Engineering",
    university: "University of Hamburg",
    intakeYear: 2026,

    status: "UNDER_REVIEW",

    submittedAt: "22/07/2026 02:20 PM",

    tenthPercentage: 89,
    twelfthPercentage: 86,

    adminComments: "",
    rejectionReason: "",
  },
];