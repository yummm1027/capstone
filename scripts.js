<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>지하철 역 검색</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    .search-container {
      margin-bottom: 20px;
    }
    .result {
      margin-top: 10px;
      font-size: 1.2em;
    }
  </style>
</head>
<body>
  <div class="search-container">
    <label for="station-search">역 이름 검색:</label>
    <input type="text" id="station-search" placeholder="예: 강남역">
    <button id="search-button">검색</button>
  </div>
  <div class="result" id="result"></div>

  <!-- JavaScript 파일 경로 수정 -->
  <script src="scripts.js"></script>
</body>
</html>