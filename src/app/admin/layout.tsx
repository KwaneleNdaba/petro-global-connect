import AdminLayout from "@/components/admin/AdminLayout";
import { Suspense } from "react";
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AdminLayout>{children}</AdminLayout>
    </Suspense>
  );
}