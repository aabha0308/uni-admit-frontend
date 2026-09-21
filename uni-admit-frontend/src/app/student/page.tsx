import DashboardHeader from "@/components/student/DashboardHeader";
import StatsCards from "@/components/student/StatsCards";
import QuickActions from "@/components/student/QuickActions";

export default function StudentDashboardPage() {
    return (
        <div className="space-y-8">
            <DashboardHeader />
            <StatsCards />
            <QuickActions />
        </div>
    );
}