import Image from "next/image";
import React from "react";
import AttendanceChart from "./AttendanceChart";
import { prisma } from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceModay = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust to get days since Monday

  const lastModay = new Date(today);
  lastModay.setDate(today.getDate() - daysSinceModay);

  const responseData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastModay,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  responseData.forEach((item) => {
    const itemDate = new Date(item.date);
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1]; // Adjust to get the correct day name

      if (item.present) {
        attendanceMap[dayName].present += 1; // Assuming present is a boolean
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

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
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
