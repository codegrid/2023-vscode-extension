import * as vscode from "vscode";
import { HighlightDecoration } from "./decoration";

export class Highlighter {
  // ハイライト対象を表す正規表現
  private _target: RegExp;
  // ハイライト表示処理を担うクラスのインスタンス
  private _decoration: HighlightDecoration;

  // 初期化時に行う処理をここにまとめる
  constructor() {
    // 「todo:」で始まる行をハイライト対象とする
    const keyword = "todo:";
    // 正規表現オブジェクトも初期化時に生成し、使い回すことにする
    this._target = new RegExp(`(${keyword}.*)$`, "gmi");

    // ハイライト表示機能を初期化する
    this._decoration = new HighlightDecoration({
      backgroundColor: "#ff0060",
      color: "#ffffff"
    });
  }

  // ハイライト対象を取得するメソッド
  private _search(editor: vscode.TextEditor): RegExpMatchArray[] {
    // ファイルのテキストを取得
    const text = editor.document.getText();
    // 正規表現にマッチする部分を取得
    const matches = text.matchAll(this._target);
    // 配列として返す
    return [...matches];
  }

  // ハイライト、カウントなどの表示をまとめて更新するメソッド
  updateView(editor: vscode.TextEditor) {
    // ハイライト対象を取得
    const matches = this._search(editor);
    // ハイライト表示を更新
    this._decoration.update(editor, matches);
  }
}
