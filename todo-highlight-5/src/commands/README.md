# goto-line.tsのカスタマイズ

## Sticky Scroll機能を考慮する

VS Code v1.70で、Sticky Scroll機能が追加されました。

関数名やクラス名、Markdownであれば見出しなどの行が、エディタの上部に固定表示され、今編集しているスコープやセクションを常に確認できる機能です。

![](https://raw.githubusercontent.com/codegrid/2023-vscode-extension/main/todo-highlight-4/doc/assets/sticky-scroll.png)

この機能が有効化されている場合、スクロールで先頭に表示したハイライト箇所が、Sticky Scroll固定ヘッダによって隠れてしまいます。

ハイライト箇所が隠れてしまうことを防ぎたい場合は、次のように数行分`moveLines`を減らすことで、ハイライト行を少し下にずらした位置にスクロールさせると良いでしょう。

```ts:src/commands/goto-line.ts
// Sticky Scrollで隠れてしまうことを防ぐため、
// エディタの上端から数行分は余裕を持たせる（お好みで）
const offsetTop = 3;

// 移動量
const moveLines = targetLine - visibleStartLine - offsetTop;
```

残念ながら、表示されているSticky Scroll固定ヘッダの行数を取得するAPIは提供されていません。

正確な行数分下にずらすことはできないため、お好みで`offsetTop`の値を調整してみてください。
