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

  private _command: GotoLineCommand;

  // 拡張機能のID [changed]
  private _id: string;

  // 初期化時に行う処理をここにまとめる
  constructor(id: string) {
    // 拡張機能のIDを保存 [changed]
    this._id = id;

    // ユーザ設定に基づいた正規表現オブジェクトと、スタイル定義オブジェクトを取得 [changed]
    const { target, decorationStyle } = this._getConfig();

    // 正規表現オブジェクトをハイライト対象として設定 [changed]
    this._target = target;

    // スタイル定義オブジェクトをもとに、ハイライト機能機能を初期化 [changed]
    this._decoration = new HighlightDecoration(decorationStyle);

    this._command = new GotoLineCommand(`${id}.goto-first-highlight`, "Go to first highlight");
    const get1stHighlightCharIdx = (matches: RegExpMatchArray[]) => [matches[0].index];

    // ハイライトカウント表示機能を初期化する
    this._countView = new HighlightCountView(this._command, get1stHighlightCharIdx);
  }

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

  // settings.jsonから設定を取得 [changed]
  private _getConfig() {
    // this._idをIDとする拡張機能に関するユーザー設定を取得
    // 今回の場合、this._id = 'todo-highlight'
    const config = vscode.workspace.getConfiguration(this._id);

    // todo-highlight.target-keywordの値を取得
    const keyword = config.get<string>("target-keyword");
    // todo-highlight.background-colorの値を取得
    const background = config.get<string>("background-color");
    // todo-highlight.foreground-colorの値を取得
    const foreground = config.get<string>("foreground-color");

    // ハイライト対象となる正規表現オブジェクトを生成
    const target = new RegExp(`(${keyword}.*)$`, "gmi");

    // ハイライト箇所のスタイルをオブジェクトとしてまとめる
    const decorationStyle = {
      backgroundColor: background,
      color: foreground
    };

    return { target, decorationStyle };
  }

  // settings.jsonの変更を拡張機能の動作に反映 [changed]
  updateConfig() {
    // ユーザー設定を再取得
    const { target, decorationStyle } = this._getConfig();

    // 新たなハイライト対象となる正規表現オブジェクトを設定
    this._target = target;
    // 新たなハイライト箇所のスタイルを設定
    this._decoration.setNewStyle(decorationStyle);
  }
}
