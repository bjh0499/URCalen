export default function NavDivButton({ text, clickFunc }) {
  return (
    <div
      className="flex flex-row justify-center items-center size-8 p-1 m-1 bg-slate-300 rounded text-2xl cursor-pointer"
      onClick={clickFunc}
    >
      {text}
    </div>
  );
}
