import { useSelector } from "react-redux";

export default function CalendarHeader() {
  let selectedYear = useSelector((state) => state.selectedMonth.year);
  let selectedMonth = useSelector((state) => state.selectedMonth.month);
  if (selectedMonth === 0) {
    selectedYear--;
    selectedMonth = 12;
  } else if (selectedMonth === 13) {
    selectedYear++;
    selectedMonth = 1;
  }
  return (
    <div className="flex-center h-1/5 w-full">
      <div className="p-1 text-5xl">
        {selectedYear}.{selectedMonth}
      </div>
    </div>
  );
}
