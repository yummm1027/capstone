console.log("JavaScript 파일이 잘 연결되었습니다!");

document.getElementById('search-button').addEventListener('click', () => {
  console.log("검색 버튼이 클릭되었습니다!");

  const stationName = document.getElementById('station-search').value.trim();
  console.log(`검색된 역 이름: ${stationName}`);

  if (!stationName) {
    document.getElementById('result').textContent = "역 이름을 입력해주세요.";
    return;
  }

  document.getElementById('result').textContent = `${stationName} 검색됨!`;
});
