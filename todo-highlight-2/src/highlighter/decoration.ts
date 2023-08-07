import * as vscode from "vscode";

export class HighlightDecoration {
  // 装飾スタイル
  private _style: vscode.TextEditorDecorationType;

  // 初期化時に行う処理をここにまとめる
  constructor(options: vscode.DecorationRenderOptions) {
    this._style = this._createStyle(options);
  }

  // 装飾スタイルを表すTextEditorDecorationTypeインスタンスを生成するメソッド
  private _createStyle(options: vscode.DecorationRenderOptions) {
    return vscode.window.createTextEditorDecorationType(options);
  }

  // ハイライト表示を更新するメソッド
  update(editor: vscode.TextEditor, matches: RegExpMatchArray[]) {
    // ハイライト範囲全件を格納する配列
    const ranges: vscode.Range[] = [];

    // マッチしたすべてのテキストを走査
    for (const match of matches) {
      if (match.index === undefined) {
        continue;
      }

      // ハイライトする範囲を求める
      const start = editor.document.positionAt(match.index);
      const end = editor.document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(start, end);

      // ハイライト範囲を配列に追加
      ranges.push(range);
    }

    // すべての箇所にハイライトを適用
    editor.setDecorations(this._style, ranges);
  }
}
