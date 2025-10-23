import type { AnnouncementProps } from '../interfaces';

export default function Announcement({
  title,
  poster,
  content,
  date,
}: AnnouncementProps) {
  return (
    <div className="w-full flex p-3 bg-slate-100 rounded-md flex-col">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-sm font-semibold text-sky-700">
        {!poster
          ? `Posted on ${new Date(date).toLocaleDateString()}`
          : `Posted by ${poster} on ${new Date(date).toLocaleDateString()}`}
      </p>
      <p className="text-base">{content}</p>
    </div>
  );
}
