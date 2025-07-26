const CACHE_NAME = 'quiz-app-cache-v1';
const urlsToCache = [
  './',
  './資格テスト各キャリア取り纏めテスト3.html',
  './manifest.json',
  './icon-512x512.png'
  // CSSや他のJSファイルがある場合はここに追加
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時にキャッシュから返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにあればそれを返す
        if (response) {
          return response;
        }
        // なければネットワークから取得
        return fetch(event.request);
      }
    )
  );
});