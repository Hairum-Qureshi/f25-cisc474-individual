import Link from 'next/link';
import Course from '../components/Course';

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-full lg:m-0 m-3">
        <div className="m-3 p-2 border border-sky-950 bg-cyan-950 text-white my-3 rounded-sm flex-shrink-0">
          <h2 className="text-xl font-semibold">
            Recent Announcements From Your Courses
          </h2>
          <p className="text-sm my-3 text-sky-300">
            There are currently no recent announcements from any of your
            courses.
          </p>
        </div>
        <div className="m-3 p-2 border border-sky-950 bg-blue-950 text-white my-3 rounded-sm flex-shrink-0">
          <h2 className="text-xl font-semibold">
            Upcoming Assignment Deadlines
          </h2>
          <p className="text-sm my-3 text-sky-300">
            There are currently no upcoming assignment deadlines from any of
            your courses.
          </p>
        </div>
        <div className="mx-3 h-full">
          <div className="w-full border-2 h-full border-slate-500 rounded-md lg:rounded-tr-md lg:rounded-tl-md bg-slate-800 p-3 overflow-y-auto">
            <h3 className="font-semibold text-2xl text-white mb-5">
              My Courses
            </h3>
            <Link href="/course/1234">
              <Course courseName={'Course 1 - click me!'} />
            </Link>
            <Link href="/course/5678">
              <Course courseName={'Course 2 - click me!'} />
            </Link>
            <Link href="/course/9101">
              <Course courseName={'Course 3 - click me!'} />
            </Link>
            <Link href="/course/1112">
              <Course courseName={'Course 4 - click me!'} />
            </Link>
            <Link href="/course/1314">
              <Course courseName={'Course 5 - click me!'} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
