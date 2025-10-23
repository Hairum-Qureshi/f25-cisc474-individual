import { CourseProps } from '../interfaces';

export default function Course({
  courseName,
  courseTimings,
  professorName,
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
    </div>
  );
}
