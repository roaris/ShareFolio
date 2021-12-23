# ShareFolio

[![test](https://github.com/roaris/ShareFolio/actions/workflows/test.yml/badge.svg)](https://github.com/roaris/ShareFolio/actions/workflows/test.yml)
[![lint](https://github.com/roaris/ShareFolio/actions/workflows/lint.yml/badge.svg)](https://github.com/roaris/ShareFolio/actions/workflows/lint.yml)

https://sh4r3f0110.herokuapp.com/ のソースコードです。  
Webエンジニアを目指す人が気軽に自分の制作物を投稿して、他の人からコメントをもらえたらいいなと思って作りました。

## バージョン
- npm 6.14.14
- Rails 6.1.4.1

## 使用技術
- React, Ruby on Rails, Heroku
- MaterialUI(UIライブラリ)
- Firebase Authentication(認証・認可)
- Mailgun(メール送信)
- S3(画像ストレージ)
- RSpec(APIテスト、モデルテスト)
- Prettier, ESLint, RuboCop(リンター、フォーマッター)
- bullet(N+1検出)

## 機能一覧
- 新規登録・ログイン(GitHub, Google, Twitter)
- 投稿の作成、編集、削除
- 投稿一覧の閲覧、投稿詳細の閲覧
- ユーザー情報の更新、アイコン画像の更新
- 投稿へのいいね機能
- 投稿へのコメント機能 & メール通知
- 投稿へのタグ付け機能 & タグ検索

## ER図
https://github.com/roaris/ShareFolio/blob/master/erd.pdf

## エンドポイント一覧
| パス | HTTPメソッド | 概要 | トークン保護
|:--|:--|:--|:--
|/api/v1/users/:id|GET|ユーザー情報を返す|No
|/api/v1/users|POST|ユーザーの新規作成|No
|/api/v1/users/me|GET|ログイン中のユーザー情報を返す|Yes
|/api/v1/users/me|PATCH|ログイン中のユーザー情報を更新|Yes
|/api/v1/users/:id/posts|GET|ユーザーの投稿一覧を返す|No
|/api/v1/posts|GET|投稿一覧をページネーションで返す|No
|/api/v1/posts/recent|GET|直近数件の投稿を取得|No
|/api/v1/posts/:id|GET|投稿詳細を返す|No
|/api/v1/posts|POST|投稿の新規作成|Yes
|/api/v1/posts/:id|PATCH|投稿の更新|Yes
|/api/v1/posts/:id|DELETE|投稿の削除|Yes
|/api/v1/posts/:id/comments|POST|コメントの投稿|Yes
|/api/v1/posts/:id/likes|POST|投稿にいいねする|Yes
|/api/v1/posts/:id/likes|DELETE|いいね取り消し|Yes
|/api/v1/posts/:id/taggings|PATCH|投稿へのタグ付け|Yes
|/api/v1/tags|GET|タグ一覧を返す|No

## 工夫した点
### フロントエンド
- アプリの説明文をマークダウンエディタで記述できるようにした(issue: [#51](https://github.com/roaris/ShareFolio/pull/51) PR: [#74](https://github.com/roaris/ShareFolio/pull/74))
- APIリクエストが終わるまでスピナーの表示(issue: [#116](https://github.com/roaris/ShareFolio/issues/116) PR: [#117](https://github.com/roaris/ShareFolio/pull/117))
- 画面で特定の操作をした時のフラッシュメッセージの表示(issue: [#59](https://github.com/roaris/ShareFolio/issues/59) PR: [#123](https://github.com/roaris/ShareFolio/pull/123))

### バックエンド
- Firebase認証・認可(issue: [#114](https://github.com/roaris/ShareFolio/issues/114) PR: [#134](https://github.com/roaris/ShareFolio/pull/134))
- メール送信(issue: [#105](https://github.com/roaris/ShareFolio/issues/105) PR: [#108](https://github.com/roaris/ShareFolio/pull/108))
- いいね機能(issue: [#156](https://github.com/roaris/ShareFolio/issues/156) PR: [#157](https://github.com/roaris/ShareFolio/pull/157),[#160](https://github.com/roaris/ShareFolio/pull/160))
- タグ付け機能(issue: [#185](https://github.com/roaris/ShareFolio/issues/185) PR: [#187](https://github.com/roaris/ShareFolio/pull/187), [#189](https://github.com/roaris/ShareFolio/pull/189))
- パフォーマンス改善(issue: [#179](https://github.com/roaris/ShareFolio/issues/179), [#195](https://github.com/roaris/ShareFolio/issues/195) PR: [#180](https://github.com/roaris/ShareFolio/pull/180), [#182](https://github.com/roaris/ShareFolio/issues/182), [#196](https://github.com/roaris/ShareFolio/pull/196))
