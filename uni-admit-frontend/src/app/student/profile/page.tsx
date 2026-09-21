import ProfileForm from "@/components/profile/ProfileForm";

export default function StudentProfilePage() {
    return (
        <>
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                    Student Profile
                </h1>
                <p className="mt-2 text-slate-500">
                    Complete your profile before applying for admission.
                </p>
            </div>

            <ProfileForm />
        </>
    );
}