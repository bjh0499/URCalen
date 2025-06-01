export default function NormalNavDivButton({ text, clickFunc }) {
  return (
    <div
      className="flex-center h-8 w-fit p-1 m-1 bg-slate-300 rounded text-2xl cursor-pointer"
      onClick={clickFunc}
    >
      {text}
    </div>
  );
}
