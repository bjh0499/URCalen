import React from "react";
import { useState } from "react";

import Nav from "./nav/Nav";
import Calendar from "./calendar/Calendar";
import loadHolidays from "../../utils/loadHolidays";

export default function Home() {
  // TODO: 임시로 공휴일 정보를 해당 함수에서 지정하지만, 실제 배포 시에는 서버에서 받을 방침
  let holidays = loadHolidays();

  let today = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // HACK: Calendar에서 1px 이미지를 불러올 때, 바로 불러오면 첫 드래그에서는 엉뚱한 아이콘이 나타남
  // 따라서 부득이하게 1px 이미지를 HTML 상에서 로딩하게 함
  return (
    <div>
      <Nav monthSelector={monthSelector} setMonthSelector={setMonthSelector} />
      <Calendar monthSelector={monthSelector} holidays={holidays} />
      <img className="hidden" id="1px" src="/1px.png" />
    </div>
  );
}
