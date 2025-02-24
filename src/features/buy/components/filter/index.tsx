"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { accountTypes, accountTypesNamed, sortByLists } from "@/config";

const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortby] = useState("");
  const [accountType, setAccountType] = useState<accountTypes | string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex flex-1 relative">
        <Input
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search..."
          className="flex-1 h-10 pl-[34px]"
        />
        <span
          className="absolute left-2 hover:bg-zinc-100/10 duration-300 transition-all top-1/2 -translate-y-1/2 p-0.5 rounded"
          onClick={() => {}}
        >
          <Search className="size-4 opacity-50" />
        </span>
        {searchTerm && (
          <span
            className="absolute right-3 hover:bg-zinc-100/10 duration-300 transition-all top-1/2 -translate-y-1/2 p-0.5 rounded"
            onClick={clearSearch}
          >
            <X className="size-4" />
          </span>
        )}
      </div>
      <div className="flex min-w-[30%] gap-2">
        <Select value={sortBy} onValueChange={(e) => setSortby(e)}>
          <SelectTrigger id="payment-method" className="h-10">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortByLists.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">{item.name}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={accountType} onValueChange={(e) => setAccountType(e)}>
          <SelectTrigger id="payment-method" className="h-10 min-w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            {accountTypesNamed.map((item) => (
              <SelectItem
                key={item.id}
                value={item.id}
                className="flex items-center gap-2"
              >
                <div className="flex items-center gap-2">{item.name}</div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
