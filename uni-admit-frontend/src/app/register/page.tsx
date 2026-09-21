import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6 selection:bg-slate-900 selection:text-white">
            <div className="w-full max-w-md space-y-6">
                <RegisterForm />
            </div>
        </main>
    );
}