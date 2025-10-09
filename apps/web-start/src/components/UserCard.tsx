export default function UserCard() {
  return (
    <div className="w-full p-3 border border-slate-300 rounded-md bg-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <img
          src="https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg"
          alt="User profile"
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col text-left break-words overflow-hidden">
          <h3 className="text-lg font-semibold text-slate-800 leading-tight break-words">
            User Name Here
          </h3>
          <p className="text-slate-500 text-sm">Student</p>
        </div>
      </div>
    </div>
  );
}
