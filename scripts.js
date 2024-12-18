// JSON 데이터 로드
let jsonData;

fetch('./승객_예상_데이터.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    jsonData = data;
    console.log("JSON 데이터 로드 성공:", jsonData);
  })
  .catch(error => console.error("JSON 데이터 로드 실패:", error));

// 현재 요일과 시간대 계산 함수
function getCurrentDayAndTimeSlot() {
  const now = new Date();
  const days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const day = days[now.getDay()];
  const hour = now.getHours();
  const timeSlot = `${hour.toString().padStart(2, '0')}-${(hour + 1).toString().padStart(2, '0')}시간대`;
  return { day, timeSlot };
}

// 즐겨찾기 데이터
let favorites = [];

// 즐겨찾기 업데이트 함수
function updateFavorites() {
  const favoritesContainer = document.getElementById('favorites-container');
  favoritesContainer.innerHTML = '<h3>즐겨찾기</h3>';

  favorites.forEach((station, index) => {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.style.marginBottom = '10px';

    const button = document.createElement('button');
    button.textContent = station;
    button.addEventListener('click', () => {
      document.getElementById('station-search').value = station;
      document.getElementById('search-button').click();
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = '❌';
    removeButton.addEventListener('click', () => {
      favorites.splice(index, 1);
      updateFavorites();
    });

    buttonWrapper.appendChild(button);
    buttonWrapper.appendChild(removeButton);
    favoritesContainer.appendChild(buttonWrapper);
  });
}

// 즐겨찾기 추가 버튼 이벤트
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

  favorites.push(stationName);
  updateFavorites();
});

// 검색 버튼 클릭 이벤트
document.getElementById('search-button').addEventListener('click', () => {
  const stationName = document.getElementById('station-search').value.trim();

  if (!stationName) {
    document.getElementById('result').textContent = "역 이름을 입력해주세요.";
    return;
  }

  if (!jsonData) {
    document.getElementById('result').textContent = "JSON 데이터가 아직 로드되지 않았습니다.";
    return;
  }

  // 현재 요일과 시간대 계산
  const { day, timeSlot } = getCurrentDayAndTimeSlot();

  // JSON 데이터 필터링
  const results = jsonData.filter(item =>
    item.역명 === stationName && item.요일 === day
  );

  if (results.length === 0) {
    document.getElementById('result').textContent = "해당 조건에 맞는 데이터가 없습니다.";
    return;
  }

  // 시간대 데이터 추출
  const output = results.map(item => ({
    유형: item.승객유형,
    인원수: item[timeSlot] || "데이터 없음"
  }));

  // 결과 표시
  let resultHtml = `<strong>${stationName}</strong> (${day}, ${timeSlot}):<br>`;
  output.forEach(item => {
    resultHtml += `- ${item.유형}: ${item.인원수}<br>`;
  });
  document.getElementById('result').innerHTML = resultHtml;

  // 맞춤형 광고 표시
  const highestType = output.reduce((a, b) => {
    if (a && b) return a.인원수 > b.인원수 ? a : b;
    return b;
  }, null)?.유형;

  const ads = {
    일반: "일반인을 위한 지하철 안전 캠페인 광고",
    어린이: "어린이를 위한 지하철 예절 광고",
    청소년: "청소년을 위한 특별 프로모션 광고"
  };

  document.getElementById('ad-content').textContent = ads[highestType] || "광고 데이터가 없습니다.";
});
