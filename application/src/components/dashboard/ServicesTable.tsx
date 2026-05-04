
import { Service } from "@/types/service.types";
import { 服务TableContainer } from "@/components/services/服务TableContainer";

interface 服务TableProps {
  services: Service[];
}

export const 服务Table = ({ services }: 服务TableProps) => {
  return (
    <div class名称="flex-1 flex flex-col h-full">
      <服务TableContainer services={services} />
    </div>
  );
};
