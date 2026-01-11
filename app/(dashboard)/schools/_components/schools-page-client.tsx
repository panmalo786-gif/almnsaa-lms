"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SchoolModal } from "@/components/modals/school-modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";

interface School {
  id: string;
  name: string;
  domain: string;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface SchoolsPageClientProps {
  initialSchools: School[];
}

export function SchoolsPageClient({ initialSchools }: SchoolsPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh();
  };

  return (
    <>
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">قائمة المدارس</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            إضافة مدرسة
          </Button>
        </div>
        <div className="p-4">
          {initialSchools.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>لا توجد مدارس مسجلة بعد</p>
              <p className="text-sm mt-2">ابدأ بإضافة مدرسة جديدة</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>اسم المدرسة</TableHead>
                  <TableHead>النطاق</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإنشاء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {initialSchools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {school.domain}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {school.isActive ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-600">نشط</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-red-600">غير نشط</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(school.createdAt), "yyyy/MM/dd")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <SchoolModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={handleSuccess}
      />
    </>
  );
}
