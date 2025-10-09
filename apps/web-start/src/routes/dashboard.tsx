import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Course from '../components/Course';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const [showGrades, setShowGrades] = useState(false);

  const handleChange = (e) => {
    setShowGrades(e.target.checked);
  };

  return (
    <div className="bg-slate-300 h-screen">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold my-5 mx-5">My Courses</h2>
            <div className="ml-auto">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showGrades}
                  onChange={handleChange}
                />
                <div
                  className="
      w-11 h-6 bg-gray-400 rounded-full
      relative transition
      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
      after:w-5 after:h-5 after:bg-white after:rounded-full
      after:transition-all
      peer-checked:bg-blue-600 peer-checked:after:translate-x-full
    "
                ></div>
                <span className="ml-3 mr-5 text-base font-medium">
                  {showGrades ? 'Hide grades' : 'Show grades'}
                </span>
              </label>
            </div>
          </div>
          <div className="space-y-5 mx-3 my-4">
            <Course
              courseName={'Intro Into Computer Science'}
              courseTimings={'M, W, F - 2:30 PM to 4:00 PM'}
              professorName={'Professor Smith'}
              grade={showGrades ? '100%' : ''}
            />
            <Course
              courseName={'Intro Into Algorithms'}
              courseTimings={'T, R - 1:30 PM to 3:00 PM'}
              professorName={'Professor Alex'}
              grade={showGrades ? '89%' : ''}
            />
          </div>
        </div>
        <div className="border border-red-500 w-1/2 rounded-md"></div>
      </div>
    </div>
  );
}
