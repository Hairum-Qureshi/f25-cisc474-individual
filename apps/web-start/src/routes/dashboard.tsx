import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Course from '../components/Course';
import Calendar from '../components/Calendar';
import Assignment from '../components/Assignment';
import Announcement from '../components/Announcement';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const [showGrades, setShowGrades] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrades(e.target.checked);
  };

  return (
    <div className="bg-slate-300 h-screen">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
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
              courseName={'Intro Into Data Structures & Algorithms'}
              courseTimings={'T, R - 1:30 PM to 3:00 PM'}
              professorName={'Professor Alex'}
              grade={showGrades ? '89%' : ''}
            />
            <Course
              courseName={'English Literature'}
              courseTimings={'T, R - 3:30 PM to 4:15 PM'}
              professorName={'Professor Hue'}
              grade={showGrades ? '92%' : ''}
            />
            <Course
              courseName={'Intro Into LLMs'}
              courseTimings={'M, T - 8:30 AM to 9:45 AM'}
              professorName={'Professor Jane'}
              grade={showGrades ? '79%' : ''}
            />
          </div>
        </div>
        <div className="w-1/2 rounded-md bg-slate-200">
          <div className="flex">
            <div className="w-1/2 overflow-y-scroll">
              <h2 className="text-2xl font-semibold my-5 mx-5">
                Upcoming Deadlines
              </h2>
              <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
              </div>
            </div>
            <div className="w-1/2">
              <Calendar />
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold my-5 mx-5">
              Recent Announcements
            </h2>
            <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
              <Announcement />
              <Announcement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
