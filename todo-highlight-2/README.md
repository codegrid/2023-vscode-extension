# todo-highlight-2

第2回の記事で解説したところまでを実装したサンプル拡張機能です。

## 機能

この拡張機能は、Markdown, MDX, TypeScript, JavaScriptのファイルを開いたときに実行されます。

`todo:`や`TODO:`（※大文字と小文字は区別しない）を含む行をハイライト表示します。

## 実行方法

VS Codeでこのディレクトリを**新規ウィンドウで**開き、まずは`npm install`で依存パッケージをインストールしてください。

F5キーを押し、ビルドタスクの選択を求められたら、`npm: watch`を選択してください。

すると、`[機能拡張開発ホスト]XXXXX`というタイトルを持つ新規ウィンドウが開かれるため、そのウィンドウで、Markdown, MDX, JavaScript, TypeScriptのいずれかのファイルを作成し、`todo:`などを含むテキストを入力してみてください。

## 実行結果

![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-2/doc/assets/highlight-todo.png)
