import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import ModuleSection from './ModuleSection';

interface ModuleProps {
  collapseAll: boolean;
  module: string;
  moduleMetaData?: any[];
}

// ! CollapseAll logic needs to be fixed

export default function Module({
  collapseAll,
  module,
  moduleMetaData,
}: ModuleProps) {
  const [openModule, setOpenModule] = useState(false);

  return (
    <div className="w-full text-xl font-semibold rounded-sm bg-slate-300 border border-slate-400 mb-4">
      <div className="flex items-center justify-between rounded-sm px-3">
        <span className="py-3">{module}</span>
        <button
          type="button"
          className="bg-slate-500 p-1 rounded-sm hover:cursor-pointer text-white"
          onClick={() => setOpenModule(!openModule)}
          aria-label={openModule ? 'Collapse module' : 'Expand module'}
        >
          {openModule ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {openModule ||
        (collapseAll && (
          <div className="space-y-2 mx-3 mb-3">
            {moduleMetaData?.map((section: any) => (
              <ModuleSection
                key={section.id}
                title={section.title}
              />
            ))}
          </div>
        ))}
    </div>
  );
}
