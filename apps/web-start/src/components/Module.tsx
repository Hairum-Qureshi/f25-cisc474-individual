import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import ModuleSection from './ModuleSection';

interface ModuleProps {
  collapseAll: boolean;
}

// ! CollapseAll logic needs to be fixed

export default function Module({ collapseAll }: ModuleProps) {
  const [openModule, setOpenModule] = useState(false);

  return (
    <div className="w-full text-white text-xl font-semibold rounded-sm bg-slate-400 border-2 border-slate-400 mb-4">
      <div className="flex items-center justify-between rounded-sm px-3">
        <span className="py-3">Module</span>
        <button
          type="button"
          className="bg-slate-500 p-1 rounded-sm hover:cursor-pointer"
          onClick={() => setOpenModule(!openModule)}
          aria-label={openModule ? 'Collapse module' : 'Expand module'}
        >
          {openModule ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {openModule ||
        (collapseAll && (
          <div className="space-y-2 mx-3 mb-3">
            <ModuleSection />
            <ModuleSection />
            <ModuleSection />
            <ModuleSection />
            <ModuleSection />
          </div>
        ))}
    </div>
  );
}
