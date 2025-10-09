interface CourseProps {
  courseName: string;
  courseTimings: string;
  professorName: string;
  grade: string;
}

export default function Course({
  courseName,
  courseTimings,
  professorName,
  grade,
}: CourseProps) {
  return (
    <div className="w-full flex items-center p-3 bg-slate-100 rounded-md">
      <div>
        <h3 className="font-semibold text-lg">{courseName}</h3>
        <p className="text-base text-slate-500 font-semibold">
          {courseTimings}
        </p>
        <p className="text-base text-slate-500 font-semibold">
          {professorName}
        </p>
      </div>
      <div className="ml-auto text-4xl font-bold">
        <h1>{grade}</h1>
      </div>
    </div>
  );
}
