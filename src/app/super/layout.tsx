import AdminLayout from "@/components/admin/AdminLayout";
import SuperLayout from "@/components/super/SuperLayout";
import { Suspense } from "react";
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <SuperLayout>{children}</SuperLayout>
    </Suspense>
  );
}