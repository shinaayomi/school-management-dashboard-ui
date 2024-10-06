import Image from "next/image";
import React from "react";

type Props = { type: string };

export default function UserCard({ type }: Props) {
  return (
    <div className="rounded-2xl odd:bg-shinaPurple even:bg-shinaYellow  p-4 flex-1 min-w-[130px]">
      <div className="flex items-center justify-between">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/27
        </span>
        <Image
          src="/images/more.png"
          alt="..."
          width={20}
          height={20}
          priority
        />
      </div>
      <h1 className="text-2xl font-semibold my-4">1,234</h1>
      <h2 className="capitalize text-smfont-medium text-gray-500">{type}</h2>
    </div>
  );
}
