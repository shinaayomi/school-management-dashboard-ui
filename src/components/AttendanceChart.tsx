"use client";

import Image from "next/image";
import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 40,
    absent: 40,
  },
  {
    name: "Tue",
    present: 30,
    absent: 38,
  },
  {
    name: "Wed",
    present: 20,
    absent: 80,
  },
  {
    name: "Thu",
    present: 20,
    absent: 98,
  },
  {
    name: "Fri",
    present: 10,
    absent: 80,
  },
];

export default function AttendanceChart() {
  return (
    <div className="bg-white rounded-lg  h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image
          src="/images/moreDark.png"
          alt="..."
          width={20}
          height={20}
          priority
        />
      </div>
      {/* CHART */}

      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="present"
            fill="#FAE27C"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
