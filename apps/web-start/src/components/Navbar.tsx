export default function Navbar() {
  return (
    <nav className="w-full bg-slate-200 p-4 h-20">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-md border-2 border-slate-400">
          <img
            src="https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg"
            alt="User profile picture"
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold ml-3 text-lg">Hairum Qureshi</h3>
          <h3 className="font-semibold ml-3 text-slate-600 text-sm">
            UID: 123451251
          </h3>
        </div>
      </div>
    </nav>
  );
}
