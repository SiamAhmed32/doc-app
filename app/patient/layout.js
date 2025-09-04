import AuthWrapper from "@/components/auth/AuthWrapper";
import Header from "@/components/layout/Header";

export default function PatientLayout({ children }) {
  return (
    <AuthWrapper>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
      </div>
    </AuthWrapper>
  );
}
