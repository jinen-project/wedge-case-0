# wedge-case-0

AIワークフローの結果を PASS / HOLD / STOP に分けて表示する4ファイルのデモです。
ここでは「何を止めるべきか」のルール作りではなく、まず止まった状態を見えるようにすることだけを扱います。

## すぐ動かす

```bash
node demo.mjs                          # ⏸ HOLD（既定）
node demo.mjs --case pass              # ✅ PASS
node demo.mjs --case hold --continue   # ✅ RESUMED（解除条件を満たした後）
node demo.mjs --case stop              # ⛔ STOP
```

インストール不要。登録・ネットワーク・依存なし——Node.js だけ。`--play` で間を取って表示。

## 見えるもの

```
   ⏸  HOLD

       Reason            :  credential detected in outbound message
       Resume condition  :  remove the credential
       Human check       :  required before resume
       Record            :  hold_id=hold-001
```

```
   ⛔  STOP

       Reason            :  blocked destination or irreversible unsafe action
       Resume condition  :  none in this workflow
       Next step         :  create a new request — the rule lives outside this demo
       Record            :  stop_id=stop-001
```

- **STOP** — 進めてはいけない（この流れでは再開しない）
- **HOLD** — 条件が変われば進められる。だから理由・解除条件・人の確認・記録を持つ
- **PASS** — どの条件にも当たらない（そのまま進む）

## このデモの範囲

シナリオはハードコードで、チェックも単純な placeholder です。このデモは STOP/HOLD を分けることだけを扱い、
理由・再開条件・人の確認・記録に置き場所を与えます。

## 動かしてみたら

Issue を開いて、一文だけ残してください。

---

*MIT ライセンス。4ファイル。依存なし。*
