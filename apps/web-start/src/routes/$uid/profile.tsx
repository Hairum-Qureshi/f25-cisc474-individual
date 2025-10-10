import { createFileRoute } from '@tanstack/react-router';
import { FaEdit, FaRegUserCircle } from 'react-icons/fa';
import Course from '../../components/Course';

export const Route = createFileRoute('/$uid/profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex justify-center py-10">
      <div className="w-full max-w-5xl grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 flex items-center gap-4 border border-gray-100">
            <img
              src="https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg"
              alt="Profile picture"
              className="w-30 h-30 rounded-full object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                Hairum Qureshi
              </h2>
              <p className="text-sm text-gray-500">
                Student ID: 123451251 | Major: Biology
              </p>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Hairum Qureshi's Bio:
            </h3>
            <div className="space-y-4">
              <p className="text-slate-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facere
                odit enim temporibus iusto rem eos laborum quae veniam suscipit
                eius vero cum incidunt corrupti quibusdam eum libero, adipisci
                nesciunt laudantium. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Deserunt accusamus quia, aspernatur pariatur
                itaque voluptatum earum dicta consequatur assumenda. Quisquam
                maxime consequatur distinctio nisi facilis. Voluptate illum
                tempora doloremque dignissimos! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptatibus sed quibusdam
                adipisci iste. Officiis quibusdam mollitia nobis repellendus et
                quidem sed facere, repudiandae modi, qui, reiciendis natus.
                Amet, ad unde!
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <p className="flex items-center hover:cursor-pointer text-sky-600">
                <span className="mr-2 text-2xl">
                  <FaRegUserCircle />
                </span>
                Update Profile Picture
              </p>
              <p className="flex items-center hover:cursor-pointer text-sky-600">
                <span className="mr-2 text-2xl">
                  <FaEdit />
                </span>
                Update Biography
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white shadow-sm rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pt-5 pl-5">
                Courses Taking:
              </h3>
              <div className="space-y-5 mx-3 my-4">
                <Course
                  courseName={'Intro Into Computer Science'}
                  courseTimings={'M, W, F - 2:30 PM to 4:00 PM'}
                  professorName={'Professor Smith'}
                />
                <Course
                  courseName={'Intro Into Data Structures & Algorithms'}
                  courseTimings={'T, R - 1:30 PM to 3:00 PM'}
                  professorName={'Professor Alex'}
                />
                <Course
                  courseName={'English Literature'}
                  courseTimings={'T, R - 3:30 PM to 4:15 PM'}
                  professorName={'Professor Hue'}
                />
                <Course
                  courseName={'Intro Into LLMs'}
                  courseTimings={'M, T - 8:30 AM to 9:45 AM'}
                  professorName={'Professor Jane'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
