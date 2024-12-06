// JSON 데이터 로드
let jsonData;

fetch('승객_예상_데이터.json')
  .then(response => response.json())
  .then(data => {
    jsonData = data;
    console.log("JSON 데이터 로드 완료:", jsonData);
  })
  .catch(error => console.error("데이터 로드 실패:", error));

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
    button.classList.add('favorite-btn');
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
  const day = document.getElementById('day').value.trim();
  const hour = document.getElementById('hour').value.trim();

  if (!stationName || !day || !hour) {
    document.getElementById('result').textContent = "역 이름, 요일, 시간대를 모두 입력해주세요.";
    return;
  }

  if (!jsonData) {
    document.getElementById('result').textContent = "데이터가 아직 로드되지 않았습니다.";
    return;
  }

  const results = jsonData.filter(item =>
    item.역명 === stationName && item.요일 === day
  );

  if (results.length === 0) {
    document.getElementById('result').textContent = "해당 조건에 맞는 데이터가 없습니다.";
    return;
  }

  const output = results.map(item => ({
    유형: item.승객유형,
    인원수: item[hour] || "데이터 없음"
  }));

  let resultHtml = `<strong>${stationName}</strong> (${day}, ${hour}):<br>`;
  output.forEach(item => {
    resultHtml += `- ${item.유형}: ${item.인원수}<br>`;
  });
  document.getElementById('result').innerHTML = resultHtml;

  // 맞춤형 광고 표시
  const highestType = output.reduce((a, b) => (a.인원수 > b.인원수 ? a : b), {}).유형;
  const ads = {
    일반: "일반인을 위한 지하철 안전 캠페인 광고",
    어린이: "어린이를 위한 지하철 예절 광고",
    청소년: "청소년을 위한 특별 프로모션 광고"
  };
  document.getElementById('ad-content').textContent = ads[highestType] || "광고 데이터가 없습니다.";
});
