![](public/WorldWeatherTop.png)

## :sun_with_face:URL

どなたでも登録なしでご利用できます<br>
[World-Weather](https://world-weather-zeta.vercel.app/world)

## :crescent_moon:概要

「World-Weather」は、世界中の都市の天気情報をリアルタイムで確認できる便利なウェブサイトです。<br>
Next.js、OpenWeatherAPI、GoogleMapsAPIを活用し、シンプルで使いやすいデザインに仕上げ、ユーザーが様々なデバイスで必要な気象情報を取得できるようにしました。

## :umbrella_with_rain_drops:開発への想いや動機

このサイトの開発においては、ユーザーが簡単かつ迅速に目的の情報を得られることを最優先に考えました。旅行やビジネスにおいて天気情報が与える影響を考慮し、ユーザーがどこにいても、どんなデバイスを使っても快適に利用できるようなサービスを目指しました。<br>
現在は特定の都市のみですが、ユーザーの任意の都市の気象情報を取得できるように、機能の実現を目指しています。

## :high_voltage:画面と機能

| <h3 style="text-align:center;">都市選択</h3> | <h3 style="text-align:center;">都市詳細</h3> |
|---|---|
| ![](public/WorldWeatherWorld.png) | ![](public/WorldWeatherCity.png) |
| 地図上のアイコンをクリックすると、その都市の現在の天気と気温を見ることが出来ます。DETAIL から詳細画面へ遷移します。 | 現地時刻や詳細地図、1~5日後の天気予報まで見ることが出来ます。 |

## :rainbow:使用技術

### フロントエンド

- Next.js 14.0.3
- JavaScript
- TailWindCSS 3.3.6
- Prettier
- ESLint


### API

- OpenWeather<br>
  天気情報を取得する API として採用しています。<br>
  都市選択画面では現在の天気情報、都市詳細画面では天気予報情報を、それぞれ別のエンドポイントから呼び出しています。<br>
  また、Next.jsのAPI Routesを経由することによって、セキュリティを強化しています。

- Google Maps JavaScript
  <br>
  地図を取得する API として採用しています。Next.js上で使う為、ライブラリとして@googlemaps/react-wrapper を使用しています。<br>地図の中央位置、ズーム倍率などの初期設定、ピンを画像に変更など、見やすく分かりやすいデザインにするためにカスタムしています。

### サーバー

- Vercel
  <br>
  デプロイはすべて Vercel 上で行っています。github にプッシュすれば自動でデプロイされ、Vercel のサーバーにて公開されます。
