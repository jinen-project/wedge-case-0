# wedge-case-0

AIを使った処理では、「止めるべきもの」と「条件が整えば進められるもの」を
同じように扱うと、運用が粗くなります。

絶対に進めてはいけないものは STOP する。
一方で、何かを変えれば進められるものは HOLD する。

HOLD では、
なぜ止まったのか、
何を変えれば再開できるのかを、
人間が読める形で表示します。

そう分けておくと、
条件を扱いやすくなり、
理由を出しやすくなり、
記録にも残しやすくなるのではないか。

wedge-case-0 は、その考えを4ファイルで試した小さなデモです。

**30秒で動きます。登録不要・ネットワーク不要・依存なし。**

## 3つの結果を見る

```bash
node demo.mjs                          # → ⏸ HOLD（既定）
node demo.mjs --case pass              # → ✅ PASS
node demo.mjs --case hold              # → ⏸ HOLD
node demo.mjs --case hold --continue   # → ✅ RESUMED（条件を満たした後）
node demo.mjs --case stop              # → ⛔ STOP
```

`--play` を付けると、間を取って表示します。

```
   ⏸  HOLD
       Reason             :  credential detected in outbound message
       Resume condition   :  remove the credential
       Human check        :  required before resume
       Record             :  hold_id=hold-001
```

## これは既にある仕組みでは？

はい、隣接する考え方はすでにあります——
アクセス制御、ポリシーエンジン、承認ワークフロー、ワークフローエンジン、
human-in-the-loop、エージェントの事前認可など。

wedge-case-0 は、それらを置き換えようとはしません。

分けているのは、運用上の一点だけです：

- **STOP**：その操作は進めてはいけない
- **HOLD**：条件が変われば進められる

このデモは、その区別を一箇所で見えるようにします——
理由・再開条件・人の確認・記録。

## これはスケッチであって、製品ではない

シナリオはハードコード、チェックは意図的にごく単純な placeholder です。
SDK も、ポリシーエンジンも、ランタイムもありません。エージェントや LLM も繋いでいません。
本番環境の防御ではありません。STOP/HOLD を分けると何が楽になるかを見るためのスケッチです。

---

*MIT ライセンスのスケッチ。4ファイル。依存なし。*
