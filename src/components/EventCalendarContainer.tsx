import Image from "next/image";
import React from "react";

import EventList from "./EventList";
import EventCalendar from "./EventCalendar";

const EventCalendarContainer =  ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { date } =  searchParams;

  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image
          src="/images/moreDark.png"
          alt="..."
          width={20}
          height={20}
          priority
        />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
};

export default EventCalendarContainer;
