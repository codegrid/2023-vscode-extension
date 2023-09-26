import * as vscode from "vscode";
import { HighlightDecoration } from "./decoration";
import { HighlightCountView } from "./count-view";
import { GotoLineCommand } from "../commands/goto-line";

export class Highlighter {
  // ハイライト対象を表す正規表現
  private _target: RegExp;
  // ハイライト表示処理を担うクラスのインスタンス
  private _decoration: HighlightDecoration;
  // ハイライトカウント表示処理を担うクラスのインスタンス
  private _countView: HighlightCountView;
  // [changed]
  private _command: GotoLineCommand;

  // 初期化時に行う処理をここにまとめる [changed]
  constructor(id: string) {
    // 「todo:」で始まる行をハイライト対象とする
    const keyword = "todo:";
    // 正規表現オブジェクトも初期化時に生成し、使い回すことにする
    this._target = new RegExp(`(${keyword}.*)$`, "gmi");

    // ハイライト表示機能を初期化する
    this._decoration = new HighlightDecoration({
      backgroundColor: "#ff0060",
      color: "#ffffff"
    });

    // [changed]
    this._command = new GotoLineCommand(`${id}.goto-first-highlight`, "Go to first highlight");
    const get1stHighlightCharIdx = (matches: RegExpMatchArray[]) => [matches[0].index];

    // ハイライトカウント表示機能を初期化する [changed]
    this._countView = new HighlightCountView(this._command, get1stHighlightCharIdx);
  }

  // [changed]
  registerCommand(): vscode.Disposable {
    const { command, execute } = this._command;
    return vscode.commands.registerCommand(command, execute);
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
    // ステータスバーのハイライトカウントを更新
    this._countView.update(matches);
  }
}
