import Pagination from "@/components/Pagination";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import React from "react";

export default function TeacherListPage() {
  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-shinaYellow">
              <Image
                src="/images/filter.png"
                alt="filter"
                width={14}
                height={14}
                priority
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-shinaYellow">
              <Image
                src="/images/sort.png"
                alt="filter"
                width={14}
                height={14}
                priority
              />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-shinaYellow">
              <Image
                src="/images/plus.png"
                alt="filter"
                width={14}
                height={14}
                priority
              />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className=""></div>
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}