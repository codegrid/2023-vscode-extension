import * as vscode from "vscode";
import { Highlighter } from "./highlighter";

const EXTENSION_ID = "todo-highlight";

// 機能を実行する対象ファイル
const TARGET_LANGS = ["markdown", "javascript", "typescript", "mdx"];
// 対象ファイルかどうかを判定するメソッド
const isTargetFile = (editor: vscode.TextEditor) => TARGET_LANGS.includes(editor.document.languageId);

// activationEventsとして登録したタイミングで実行
export function activate(context: vscode.ExtensionContext) {
  // todo-highlight拡張機能の全機能を初期化する
  const highlighter = new Highlighter(EXTENSION_ID);

  // 現在エディタで編集中のファイルを取得
  const activeEditor = vscode.window.activeTextEditor;

  // 拡張機能が有効化された時点で実行対象ファイルを開いていれば
  if (activeEditor && isTargetFile(activeEditor)) {
    // ハイライトなどの表示を更新
    highlighter.updateView(activeEditor);
  }

  context.subscriptions.push(
    // コマンド登録
    highlighter.registerCommand(),

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
      // ハイライトなどの表示を更新
      highlighter.updateView(activeEditor);
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
        // ハイライトなどの表示を更新
        highlighter.updateView(activeEditor);
      }
    })
  );

  // ユーザー設定が変更されたら [changed]
  vscode.workspace.onDidChangeConfiguration((event) => {
    // 変更されたのがtodo-highlight拡張機能に関する設定であれば
    if (event.affectsConfiguration(EXTENSION_ID)) {
      // 拡張機能の動作に新たな設定を反映
      highlighter.updateConfig();
    }
  });
}

// - VS Codeがシャットダウンしているとき
// - 拡張機能が無効またはアンインストールされているとき
export function deactivate() {}
