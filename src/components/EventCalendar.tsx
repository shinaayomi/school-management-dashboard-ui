"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
// const events = [
//   {
//     id: 1,
//     title: "Lorem ipsum dolor",
//     time: "12:00 PM - 2:00 PM",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 2,
//     title: "Lorem ipsum dolor",
//     time: "12:00 PM - 2:00 PM",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
//   {
//     id: 3,
//     title: "Lorem ipsum dolor",
//     time: "12:00 PM - 2:00 PM",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//   },
// ];

export default function EventCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  const router = useRouter();

  useEffect(() => {
    if (value instanceof Date) {
      router.push(`?date=${value}`);
    }
  }, [value, router]);

  return <Calendar onChange={onChange} value={value} />;
}
