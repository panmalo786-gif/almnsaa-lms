import { getSchools } from "@/actions/schools";
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
import { Plus } from "lucide-react";
import { SchoolsPageClient } from "./_components/schools-page-client";

export default async function SchoolsPage() {
  const result = await getSchools();
  const schools = result.success ? result.data : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">المدارس والمجموعات</h1>
          <p className="text-muted-foreground mt-2">
            إدارة المدارس والمؤسسات التعليمية في النظام
          </p>
        </div>
      </div>

      <SchoolsPageClient initialSchools={schools} />
    </div>
  );
}
