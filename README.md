# ShareFolio

[![test](https://github.com/roaris/ShareFolio/actions/workflows/test.yml/badge.svg)](https://github.com/roaris/ShareFolio/actions/workflows/test.yml)
[![lint](https://github.com/roaris/ShareFolio/actions/workflows/lint.yml/badge.svg)](https://github.com/roaris/ShareFolio/actions/workflows/lint.yml)

https://sh4r3f0110.herokuapp.com/ のソースコードです。  
Webエンジニアを目指す人が気軽に自分の制作物を投稿して、他の人にレビューしてもらえることを狙いとしています。


## Requirements
- npm 6.14.14
- Rails 6.1.4.1

## 使用技術
- フロントエンド  
React, Material UI
- バックエンド  
Rails(APIモード), Mailgun
- CI  
Prettier, ESLint, RuboCop, RSpec, GitHubActions
- サーバー  
Heroku

## 環境構築
```
git clone https://github.com/roaris/ShareFolio
```

### フロント
```
cd frontend
npm install
yarn start
```

### サーバー
```
bundle
rails s
```

## CIツール
### Prettier & ESLint
```
cd frontend
npm run fix
```

### RuboCop
```
rubocop -A
```

### RSpec
```
bundle exec rspec
```
