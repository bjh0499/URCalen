export default function CalendarHeader({ monthSelector }) {
  return (
    <div className="h-1/5 w-full flex justify-center items-center">
      <div className="p-1 text-5xl">
        {monthSelector.year}.{monthSelector.month + 1}
      </div>
    </div>
  );
}
