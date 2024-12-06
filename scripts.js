// 임시 데이터: 요일, 시간대, 혼잡도 예측 값
const mockData = {
  "강남역": {
    "월요일": { "10:00": "혼잡함", "15:00": "보통", "20:00": "여유있음" },
    "화요일": { "10:00": "보통", "15:00": "보통", "20:00": "여유있음" }
  },
  "서울역": {
    "월요일": { "10:00": "보통", "15:00": "혼잡함", "20:00": "보통" },
    "화요일": { "10:00": "여유있음", "15:00": "보통", "20:00": "혼잡함" }
  }
};

// 현재 요일과 시간을 가져오는 함수
function getCurrentDayAndTime() {
  const now = new Date();
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const day = days[now.getDay()];
  const time = now.getHours().toString().padStart(2, '0') + ":00"; // 시간만 가져오기
  return { day, time };
}

// 검색 버튼 클릭 이벤트
document.getElementById('search-button').addEventListener('click', () => {
  const stationName = document.getElementById('station-search').value.trim();

  if (!stationName) {
    document.getElementById('result').textContent = "역 이름을 입력해주세요.";
    return;
  }

  const { day, time } = getCurrentDayAndTime();

  if (mockData[stationName]) {
    const prediction = mockData[stationName][day]?.[time] || "데이터 없음";
    document.getElementById('result').textContent = 
      `${stationName} (${day} ${time}) - 예상 상태: ${prediction}`;
  } else {
    document.getElementById('result').textContent = "그런 역은 존재하지 않습니다.";
  }
});
