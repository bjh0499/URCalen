export default function CalendarHeader({ monthSelector }) {
  return (
    <div className="flex-center h-1/5 w-full">
      <div className="p-1 text-5xl">
        {monthSelector.year}.{monthSelector.month + 1}
      </div>
    </div>
  );
}
