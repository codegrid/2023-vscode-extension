import * as vscode from "vscode";

export class HighlightCountView {
  private _statusBarItem: vscode.StatusBarItem;
  private _warningBackground: vscode.ThemeColor;

  // 必要なインスタンスは初期化時に生成
  constructor() {
    // ステータスバーアイテムをインスタンス化
    this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
    // 配色テーマからステータスバー用の警告背景色を取得
    this._warningBackground = new vscode.ThemeColor("statusBarItem.warningBackground");
  }

  // ステータスバーのハイライトカウント表示を更新するメソッド
  update(matches: RegExpMatchArray[]) {
    // ハイライト箇所が何箇所あるか
    const count = matches.length;

    // ステータスバーアイテムとして表示するテキスト
    // $(checklist)はアイコン
    const text = `$(checklist) FIXME: ${count}`;

    if (count > 0) {
      // 1件以上あれば背景を警告色にする
      this._statusBarItem.backgroundColor = this._warningBackground;
    } else {
      // 0件なら背景をデフォルトの色に戻す
      this._statusBarItem.backgroundColor = undefined;
    }

    // ステータスバーアイテムのテキストを設定
    this._statusBarItem.text = text;
    // ステータスバーアイテムを表示
    this._statusBarItem.show();
  }
}
