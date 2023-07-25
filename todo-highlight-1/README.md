# todo-highlight-1

第1回の記事で解説したところまでを実装したサンプル拡張機能です。

## 機能

この拡張機能は、Markdown, MDX, TypeScript, JavaScriptのファイルを開いたときに実行されます。

第1回の時点ではまだ動作する機能を実装できていないため、第2回以降で実装するハイライト更新を実行するタイミングで、ターミナルにログを残すようにしています。

![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-1/doc/assets/terminal-log.png)

## 実行方法

VS Codeでこのディレクトリを**新規ウィンドウで**開き、まずは`npm install`で依存パッケージをインストールしてください。

F5キーを押し、ビルドタスクの選択を求められたら、`npm: watch`を選択してください。

すると、新規ウィンドウが開かれるため、そのウィンドウで、Markdown, MDX, JavaScript, TypeScriptのいずれかのファイルを作成し、文字を打ってみたり、ファイルを保存したりしてみてください。
