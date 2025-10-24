import type { UserCardProps } from "../interfaces";

export default function UserCard({
  name,
  role,
  profilePicture,
}: UserCardProps) {
  return (
    <div className="w-full p-3 border border-slate-300 rounded-md bg-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <img
          src={profilePicture}
          alt="User profile"
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col text-left break-words overflow-hidden">
          <h3 className="text-lg font-semibold text-slate-800 leading-tight break-words">
            {name}
          </h3>
          <p className="text-slate-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}
