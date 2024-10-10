import React from "react";

export default function Announcements() {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-shinaSkyLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2024-10-07
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Lorem palapa</p>
        </div>
        <div className="bg-shinaPurpleLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2024-10-07
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Lorem palapa</p>
        </div>
        <div className="bg-shinaYellowLight rounded-md p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium">Lorem ipsum dolor sit</h2>
            <span className="text-xs text-gray-400 bg-white rounded-md p-1">
              2024-10-07
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Lorem palapa</p>
        </div>
      </div>
    </div>
  );
}
