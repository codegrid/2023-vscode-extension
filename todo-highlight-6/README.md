# todo-highlight

全6回の記事で実装したサンプル拡張機能の完成形です。

## 機能

この拡張機能は、Markdown, MDX, TypeScript, JavaScriptのファイルを開いたときに実行されます。

`todo:`や`TODO:`（※大文字と小文字は区別しない）など、特定のキーワードを含む行をハイライト表示します。
どんなキーワードをハイライトするかは、お好みで変えられます。

![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-6/doc/assets/highlight-todo.png)

また、ハイライトされている件数がエディタ下部のステータスバーに表示されるため、チェック漏れの防止に役立ちます。

ハイライト件数が1件以上ある場合、
- ハイライト件数表示の背景はエディタのテーマに応じた警告色になります。
- ハイライト件数表示をクリックすると、1件目のハイライト箇所までスクロールします。

![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-6/doc/assets/fixme-count-0.png)
![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-6/doc/assets/fixme-count-2.png)

## ユーザーが設定可能な項目

settings.jsonや設定画面で、以下の項目をカスタマイズすることができます。

- `todo-highlight.target-keyword`: ハイライトするキーワード（文字列、もしくは正規表現※）
- `todo-highlight.background-color`: ハイライト箇所の背景色
- `todo-highlight.foreground-color`: ハイライト箇所の文字色

※: `^`、`$`、改行などを含まない、単行の文字列を表す正規表現のみ可

デフォルト値は以下の通りです。

```json
{
  "todo-highlight.target-keyword": "todo:",
  "todo-highlight.background-color": "#ff0060",
  "todo-highlight.foreground-color": "#ffffff"
}
```

## 実行方法

VS Codeでこのディレクトリを**新規ウィンドウで**開き、まずは`npm install`で依存パッケージをインストールしてください。

F5キーを押し、ビルドタスクの選択を求められたら、`npm: watch`を選択してください。

すると、`[機能拡張開発ホスト]XXXXX`というタイトルを持つ新規ウィンドウが開かれるため、そのウィンドウで、Markdown, MDX, JavaScript, TypeScriptのいずれかのファイルを作成し、`todo:`などを含むテキストを入力してみてください。

## インストール方法

この拡張機能を常に有効化して使いたい場合は、次の手順でこの拡張機能をVS Codeにインストールすることができます。

1. VS Codeでこのディレクトリを**新規ウィンドウで**開く
2. `npm install`で依存パッケージをインストール
3. `npx vsce package`を実行
4. 質問に`y`で答えていくと、`.vsix`ファイルが作成される
5. VS Codeの「拡張機能」タブから右上の3点アイコンをクリック
6. 「VSIXからのインストール...」をクリックして、先ほど作成された`.vsix`ファイルを選択

![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-6/doc/assets/install-from-vsix.png)
