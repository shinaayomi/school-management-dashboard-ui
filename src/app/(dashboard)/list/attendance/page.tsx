import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// import { resultsData, role } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { Prisma } from "../../../../../generated/prisma";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import FormContainer from "@/components/FormContainer";

type AttendaceList = {
  id: number;
  title: string;
  studentName: string;
  studentSurname: string;
  teacherName: string;
  teacherSurname: string;
  score: number;
  className: string;
  startTime: Date;
  present: boolean;
};

export default async function AttendanceListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { role, currentUserId } = await import("@/lib/utils").then((mod) =>
    mod.getAuthInfo()
  );

  const columns = [
    { header: "Title", accessor: "title" },
    {
      header: "Student",
      accessor: "studeent",
    },
    {
      header: "Score",
      accessor: "score",
      className: "hidden md:table-cell",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    ...(role === "admin" || role === "teacher"
      ? [{ header: "Actions", accessor: "actions" }]
      : []),
  ];

  const renderRow = (item: AttendaceList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:border-slate-50 text-sm hover:bg-shinaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td>{item.studentName + " " + item.studentSurname}</td>
      <td className="hidden md:table-cell">{item.score}</td>
      <td className="hidden md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(item.startTime)}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="attendance" type="update" data={item} />{" "}
              <FormContainer table="attendance" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page as string) : 1;

  // URL PARAMS CONDITION

  const query: Prisma.AttendanceWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              {
                lesson: {
                  attendances: { some: { present: value ? true : false } },
                },
              },
              {
                student: {
                  name: { contains: value, mode: "insensitive" },
                },
              },
              {
                student: {
                  surname: { contains: value, mode: "insensitive" },
                },
              },
            ];
            break;
          default:
            break;
        }
      }
    }
  }

  // ROLE CONDITIONS
  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { lesson: { teacherId: currentUserId! } },
        { student: { class: { supervisorId: currentUserId! } } }, // Assuming student has a class with a teacher
        { student: { parentId: currentUserId! } }, // Assuming student has a
      ];
      break;

    case "student":
      query.studentId = currentUserId!;
      break;

    case "parent":
      query.student = { parentId: currentUserId! };
      break;
    default:
      break;
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      //   where: {
      //     lessons: { some: { classId: parseInt(queryParams.classId!) } },
      //   },
      where: query,
      include: {
        student: { select: { name: true, surname: true } },

        lesson: {
          select: {
            name: true,
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),

    prisma.attendance.count({ where: query }),
  ]);

  const data = dataRes.map((item) => {
    const assessment = item.lesson || item.student;

    if (!assessment) return null;

    // const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.name,
      studentName: item.student.name,
      studentSurname: item.student.surname,
      teacherName: assessment.teacher.name,
      teacherSurname: assessment.teacher.surname,
      // score: item.score,
      // className: assessment.lesson.class.name,
      // startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 rounded-md m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Results</h1>
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
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="attendance" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}
