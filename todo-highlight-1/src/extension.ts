import * as vscode from "vscode";

// 機能を実行する対象ファイル
const TARGET_LANGS = ["markdown", "javascript", "typescript", "mdx"];
// 対象ファイルかどうかを判定するメソッド
const isTargetFile = (editor: vscode.TextEditor) => TARGET_LANGS.includes(editor.document.languageId);

// for debug: 渡された文字列に現在時刻を添えて返す
const withTimestamp = (message: string) => `[${new Date()}] ${message}`;

// activationEventsとして登録したタイミングで実行
export function activate(context: vscode.ExtensionContext) {
  // for debug: ターミナルにログを出力する準備
  const log = vscode.window.createOutputChannel("debug todo-highlight");
  log.show();

  // 現在エディタで編集中のファイルを取得
  const activeEditor = vscode.window.activeTextEditor;

  // 拡張機能が有効化された時点で実行対象ファイルを開いていれば
  if (activeEditor && isTargetFile(activeEditor)) {
    // todo: ハイライトを更新（今は代わりにターミナルにログを残す）
    log.appendLine(withTimestamp("ハイライト更新 in activate: " + activeEditor.document.fileName));
  }

  context.subscriptions.push(
    // 別なファイルを編集し始めたら or 編集中のファイルを閉じたら
    vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
      // 編集中のファイルを閉じた場合は何もしない
      if (!activeEditor) {
        return;
      }
      // 実行対象ファイルでなければ何もしない
      if (!isTargetFile(activeEditor)) {
        return;
      }
      // todo: ハイライトを更新（今は代わりにターミナルにログを残す）
      log.appendLine(withTimestamp("ハイライト更新 in onDidChangeActiveTextEditor: " + activeEditor.document.fileName));
    }),
    // ファイルのテキストが変更されたら
    vscode.workspace.onDidChangeTextDocument((event) => {
      // 現在エディタで編集中のファイルを取得
      const activeEditor = vscode.window.activeTextEditor;

      // エディタでファイルを開いていなかった場合は何もしない
      if (!activeEditor) {
        return;
      }

      // 実行対象ファイルでなければ何もしない
      if (!isTargetFile(activeEditor)) {
        return;
      }

      // 変更イベントが発生したファイルが現在編集中のファイルであれば
      if (event.document.uri === activeEditor.document.uri) {
        // todo: ハイライトを更新（今は代わりにターミナルにログを残す）
        log.appendLine(withTimestamp("ハイライト更新 in onDidChangeTextDocument: " + activeEditor.document.fileName));
      }
    })
  );
}

// - VS Codeがシャットダウンしているとき
// - 拡張機能が無効またはアンインストールされているとき
export function deactivate() {}
