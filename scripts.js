// 역별, 요일별, 시간별 데이터를 저장하는 객체
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
  const day = days[now.getDay()]; // 오늘의 요일
  const time = now.getHours().toString().padStart(2, '0') + ":00"; // 현재 시간
  return { day, time };
}

// 검색 버튼 클릭 이벤트
document.getElementById('search-button').addEventListener('click', () => {
  const stationName = document.getElementById('station-search').value.trim(); // 검색된 역 이름
  console.log(`검색된 역 이름: ${stationName}`);

  if (!stationName) {
    document.getElementById('result').textContent = "역 이름을 입력해주세요.";
    return;
  }

  const { day, time } = getCurrentDayAndTime(); // 현재 요일과 시간 가져오기

  if (mockData[stationName]) {
    const prediction = mockData[stationName][day]?.[time] || "데이터 없음"; // 예측값
    document.getElementById('result').textContent = 
      `${stationName} (${day} ${time}) - 예상 상태: ${prediction}`;
  } else {
    document.getElementById('result').textContent = "그런 역은 존재하지 않습니다.";
  }
});

// 즐겨찾기 데이터를 저장할 배열 (최대 3개)
let favorites = [];

// 즐겨찾기를 업데이트하는 함수
function updateFavorites() {
  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.innerHTML = `<h3>즐겨찾기</h3>`;
  
  favorites.forEach((station, index) => {
    const buttonWrapper = document.createElement('div'); // 버튼과 삭제 버튼을 감싸는 div
    buttonWrapper.style.marginBottom = '10px'; // 버튼 그룹 사이 간격

    const button = document.createElement('button');
    button.textContent = station;
    button.classList.add('favorite-btn');
    button.addEventListener('click', () => {
      document.getElementById('station-search').value = station;
      document.getElementById('search-button').click();
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = '❌';
    removeButton.addEventListener('click', () => {
      favorites.splice(index, 1); // 즐겨찾기에서 제거
      updateFavorites(); // UI 업데이트
    });

    // 버튼들을 감싸는 div에 추가
    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(removeButton);

    // 컨테이너에 추가
    favoritesContainer.appendChild(buttonWrapper);
  });
}

// 즐겨찾기 추가 버튼 클릭 이벤트
document.getElementById('add-favorite-button').addEventListener('click', () => {
  const stationName = document.getElementById('station-search').value.trim();
  
  if (!stationName) {
    alert('역 이름을 입력해주세요!');
    return;
  }

  if (favorites.includes(stationName)) {
    alert('이미 즐겨찾기에 추가된 역입니다!');
    return;
  }

  if (favorites.length >= 3) {
    alert('즐겨찾기는 최대 3개까지만 추가할 수 있습니다.');
    return;
  }

  favorites.push(stationName); // 즐겨찾기 추가
  updateFavorites(); // UI 업데이트
});
