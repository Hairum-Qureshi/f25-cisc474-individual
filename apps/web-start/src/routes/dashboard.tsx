import { Link, createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Course from '../components/Course';
import Calendar from '../components/Calendar';
import type { Course as ICourse } from '../interfaces';

const CURR_UID = 'cmh3v8sgj0000y0gscplhgko8';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: currUserData, isLoading } = useQuery({
    queryKey: ['currUserData'],
    queryFn: () => {
      return fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`,
      ).then((res) => res.json());
    },
  });

  const [showForm, setShowForm] = useState(false);

  const [deadlines, setDeadlines] = useState([
    {
      id: '1',
      title: 'Assignment 1',
      descrioption: 'First assignment description',
      dueDate: '2024-07-01',
    },
    {
      id: '2',
      title: 'Project Proposal',
      description: 'Submit project proposal',
      dueDate: '2024-07-05',
    },
  ]);

  return (
    <div className="bg-slate-300 min-h-screen h-auto">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold mt-5 mx-5">My Courses</h2>
          </div>
          <div className="space-y-5 mx-3 my-3">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              currUserData?.enrolledCourses?.map((course: ICourse) => {
                return (
                  <Link
                    key={course.id}
                    to="/course/$courseID"
                    params={{ courseID: course.id }}
                    className="m-3"
                  >
                    <Course
                      courseName={course.courseName}
                      courseTimings={'Course Timings TBD'}
                      professorName={'Professor Name TBD'}
                    />
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="w-1/2 rounded-md bg-slate-200">
          <div className="flex">
            <div className="w-1/2 overflow-y-scroll">
              <div className="flex items-center">
                <h2 className="text-2xl font-semibold my-5 mx-5">
                  List Your Upcoming Deadlines
                </h2>
                {showForm ? (
                  <button
                    className="hover:cursor-pointer text-sm bg-red-500 hover:bg-red-700 active:bg-red-600 text-white font-bold py-1.5 px-1.5 ml-auto rounded-md"
                    title="Close button"
                    onClick={() => setShowForm(false)}
                  >
                    <AiOutlineClose />
                  </button>
                ) : (
                  <button
                    className="hover:cursor-pointer text-sm bg-green-500 hover:bg-green-700 active:bg-green-600 text-white font-bold py-1.5 px-1.5 ml-auto rounded-md"
                    title="Add button"
                    onClick={() => setShowForm(true)}
                  >
                    <FaPlus />
                  </button>
                )}
              </div>
              <div className="space-y-5 mx-3 h-60 overflow-y-auto">
                {!deadlines.length && !showForm ? (
                  <p>No upcoming deadlines</p>
                ) : (
                  deadlines.length &&
                  !showForm &&
                  deadlines.map((deadline) => {
                    return (
                      <div
                        key={deadline.id}
                        className="bg-white p-3 rounded-md shadow-md flex items-center"
                      >
                        <div className="w-3/4 break-words">
                          <h3 className="text-lg font-semibold">
                            {deadline.title}
                          </h3>
                          <p className="text-slate-500 text-sm">
                            {deadline.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            Due Date: {deadline.dueDate}
                          </p>
                        </div>
                        <div className="ml-auto space-x-2 flex flex-col space-y-2">
                          <button
                            title="Trash button"
                            className="hover:cursor-pointer text-red-500 bg-red-200 border active:bg-red-700 border-red-600 p-1 w-7 rounded-md flex items-center justify-center"
                          >
                            <FaTrash />
                          </button>
                          <button
                            title="Edit button"
                            className="hover:cursor-pointer text-orange-500 bg-orange-200 border active:bg-orange-700 border-orange-600 p-1 w-7 rounded-md flex items-center justify-center"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
                {showForm && (
                  <form
                    className="bg-white p-3 rounded-md shadow-md"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newDeadline = {
                        id: (deadlines.length + 1).toString(),
                        title: formData.get('title') as string,
                        description: formData.get('description') as string,
                        dueDate: formData.get('dueDate') as string,
                      };
                      setDeadlines([newDeadline, ...deadlines]);
                      setShowForm(false);
                    }}
                  >
                    <div className="mb-3">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        maxLength={50}
                      />
                      <label
                        htmlFor="description"
                        className="block text-sm mt-2 font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        maxLength={60}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="dueDate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Due Date
                      </label>
                      <input
                        type="date"
                        name="dueDate"
                        id="dueDate"
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                      Add Deadline
                    </button>
                  </form>
                )}
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
              <p className="mx-3">
                There are currently no recent announcements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
