interface ModuleSectionProps {
  title: string;
}

export default function ModuleSection({ title }: ModuleSectionProps) {
  return (
    <div className="bg-slate-400 text-white p-3 rounded-sm">
      <h3 className="font-semibold">{title}</h3>
    </div>
  );
}
