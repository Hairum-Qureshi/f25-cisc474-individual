import { Link, useRouterState } from '@tanstack/react-router';

interface ModuleSectionProps {
  title: string;
  assignmentID: string;
}

export default function ModuleSection({
  title,
  assignmentID,
}: ModuleSectionProps) {
  const routerState = useRouterState();
  const currentMatch = routerState.matches.at(-1);
  const params = currentMatch?.params as { courseID?: string } | undefined;
  const courseID = params?.courseID;

  return (
    <Link
      to="/course/$courseID/$assignmentID/assignment"
      params={{ courseID: courseID!, assignmentID }}
    >
      <div className="bg-slate-400 text-white p-3 rounded-sm mb-3">
        <h3 className="font-semibold">{title}</h3>
      </div>
    </Link>
  );
}
