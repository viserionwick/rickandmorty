"use client";

// Essentials
import clsx from "clsx";
import { useQueryState } from "nuqs";

// Components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PROPS {
  className?: string;
}

const FilterBar: React.FC<PROPS> = ({
  className
}) => {
  const [status, setStatus] = useQueryState("status", { shallow: false });
  const [gender, setGender] = useQueryState("gender", { shallow: false });

  return (
    <div className={clsx("space-y-2", className)}>
      <h2 className="text-xl font-semibold">Filter</h2>
      <div className="flex gap-4">
        <div>
          <label className="block mb-1 text-sm font-semibold">Status</label>
          <Select
            value={status || "all"}
            onValueChange={(val) => setStatus(val === "all" ? null : val || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="alive">Alive</SelectItem>
              <SelectItem value="dead">Dead</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-semibold">Gender</label>
          <Select
            value={gender || "all"}
            onValueChange={(val) => setGender(val === "all" ? null : val || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="all" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="genderless">Genderless</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;