import { Link, createFileRoute } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Course from '../components/Course';
import Calendar from '../components/Calendar';
import type { Course as ICourse } from '../interfaces';
import type {
  DeadlineCreateIn,
  DeadlineOut,
  DeadlineUpdateIn,
} from '@repo/api/deadlines';
import { useCurrentUser } from '../integrations/api';
import { useAuth0 } from '@auth0/auth0-react';

const CURR_UID = 'cmh3v8sgj0000y0gscplhgko8';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const { data: currUser } = useCurrentUser();

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseDeadline, setCourseDeadline] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDeadline, setEditDeadline] = useState('');

  const { data: deadlines = [], isLoading: deadlinesLoading } = useQuery<
    Array<DeadlineOut>
  >({
    queryKey: ['deadlines'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deadlines`);
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const { data: currUserData, isLoading: userLoading } = useQuery({
    queryKey: ['currUserData'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`).then(
        (res) => res.json(),
      ),
    enabled: isAuthenticated, 
  });

  const createMutation = useMutation({
    mutationFn: async (newDeadline: DeadlineCreateIn) => {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deadlines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeadline),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deadlines'] });
      setShowForm(false);
      setCourseTitle('');
      setCourseDescription('');
      setCourseDeadline('');
    },
    onError: (err) => {
      console.error('Failed to create deadline:', err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<DeadlineUpdateIn>;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/deadlines/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        },
      );
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deadlines'] });
      setEditId(null);
      setEditTitle('');
      setEditDescription('');
      setEditDeadline('');
      setShowEditForm(false);
    },
    onError: (err) => {
      console.error('Failed to update deadline:', err);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/deadlines/${id}`,
        {
          method: 'DELETE',
        },
      );
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deadlines'] });
    },
    onError: (err) => {
      console.error('Failed to delete deadline:', err);
    },
  });

  const handleEdit = (deadline: DeadlineOut) => {
    setEditId(deadline.id);
    setEditTitle(deadline.courseTitle);
    setEditDescription(deadline.courseDescription ?? '');
    setEditDeadline(deadline.courseDeadline.split('T')[0]!);
    setShowEditForm(true);
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            You must be logged in to view the dashboard.
          </h2>
          <p className="text-sky-700 font-semibold">
            Click here{' '}
            <Link to="/" className="underline">
              here
            </Link>{' '}
            to sign in
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-300 min-h-screen h-auto">
      <div className="flex-1 p-3 flex space-x-4">
        {/* Left Panel - Courses */}
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold mt-5 mx-5">My Courses</h2>
          </div>
          <div className="space-y-5 mx-3 my-3">
            {userLoading ? (
              <p>Loading...</p>
            ) : (
              currUserData?.enrolledCourses?.map((course: ICourse) => (
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
              ))
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
                    title="Close form"
                    className="hover:cursor-pointer text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-1.5 ml-auto rounded-md"
                    onClick={() => setShowForm(false)}
                  >
                    <AiOutlineClose />
                  </button>
                ) : (
                  <button
                    className="hover:cursor-pointer text-sm bg-green-500 hover:bg-green-700 text-white font-bold py-1.5 px-1.5 ml-auto rounded-md"
                    title="Add Deadline"
                    onClick={() => setShowForm(true)}
                  >
                    <FaPlus />
                  </button>
                )}
              </div>

              <div className="space-y-5 mx-3 h-60 overflow-y-auto">
                {deadlinesLoading ? (
                  <p>Loading deadlines...</p>
                ) : deadlines.length === 0 && !showForm && !showEditForm ? (
                  <p>No upcoming deadlines</p>
                ) : (
                  !showEditForm &&
                  !showForm &&
                  deadlines.map((deadline) => (
                    <div
                      key={deadline.id}
                      className="bg-white p-3 rounded-md shadow-md flex items-center"
                    >
                      <div className="w-3/4 break-words">
                        <h3 className="text-lg font-semibold">
                          {deadline.courseTitle}
                        </h3>
                        <p className="text-slate-500 text-sm">
                          {deadline.courseDescription}
                        </p>
                        <p className="text-sm text-gray-600">
                          Due Date: {deadline.courseDeadline.split('T')[0]}
                        </p>
                      </div>
                      <div className="ml-auto space-x-2 flex flex-col space-y-2">
                        <button
                          onClick={() => deleteMutation.mutate(deadline.id)}
                          className="hover:cursor-pointer text-red-500 bg-red-200 border border-red-600 p-1 w-7 rounded-md flex items-center justify-center"
                          title="Delete Deadline"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => handleEdit(deadline)}
                          className="hover:cursor-pointer text-orange-500 bg-orange-200 border border-orange-600 p-1 w-7 rounded-md flex items-center justify-center"
                          title="Edit Deadline"
                        >
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))
                )}

                {showForm && (
                  <div className="bg-white p-3 rounded-md shadow-md">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        maxLength={50}
                        title="Course Title"
                      />
                      <label className="block text-sm mt-2 font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={courseDescription}
                        onChange={(e) => setCourseDescription(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        maxLength={60}
                        title="Course Description"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={courseDeadline}
                        onChange={(e) => setCourseDeadline(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        title="Course Deadline"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-md"
                      onClick={() =>
                        createMutation.mutate({
                          courseTitle: courseTitle,
                          courseDescription: courseDescription,
                          courseDeadline: courseDeadline,
                          ownerId: CURR_UID,
                        })
                      }
                    >
                      Add Deadline
                    </button>
                  </div>
                )}

                {editId && showEditForm && (
                  <div className="bg-white p-3 rounded-md shadow-md border border-blue-500">
                    <h3 className="text-lg font-semibold mb-2">
                      Edit Deadline
                    </h3>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        maxLength={50}
                        title="Course Title"
                      />
                      <label className="block text-sm mt-2 font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        maxLength={60}
                        title="Course Description"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={editDeadline}
                        onChange={(e) => setEditDeadline(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                        title="Course Deadline"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() => {
                          setEditId(null);
                          setEditTitle('');
                          setEditDescription('');
                          setEditDeadline('');
                          setShowEditForm(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={() =>
                          updateMutation.mutate({
                            id: editId,
                            updates: {
                              courseTitle: editTitle,
                              courseDescription: editDescription,
                              courseDeadline: new Date(
                                editDeadline,
                              ).toISOString(),
                            },
                          })
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>
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

export default RouteComponent;

// Code tweaked by ChatGPT
