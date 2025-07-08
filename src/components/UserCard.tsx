import { prisma } from "@/lib/prisma";
import Image from "next/image";
import React from "react";

type Props = { type: "admin" | "teacher" | "student" | "parent" };

const UserCard = async ({ type }: Props) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

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
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
};

export default UserCard;
