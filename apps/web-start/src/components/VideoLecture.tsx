export default function VideoLecture() {
  return (
    <div className="border border-black rounded-lg inline-block w-full">
      <img
        src="https://www.shutterstock.com/shutterstock/videos/1028480267/thumb/1.jpg?ip=x480"
        alt="Thumbnail"
        className="w-full object-cover rounded-tr-md rounded-tl-md h-50"
      />
      <div className="p-2 bg-white rounded-md">
        <h4 className="font-semibold text-xl">Lecture 1</h4>
        <p className="text-slate-500 text-base">[28:42]</p>
        <p className="text-slate-500 text-base">Brief description here...</p>
      </div>
    </div>
  );
}
