let pet = 0; // 仲良くなった猫の数
let met = 0; // 出会った猫の数

app.get("/cat", (req, res) => {
  const dos = Number(req.query.cat);  // ユーザーの行動

  // 選択内容を表示
  let select = '';
  if (dos === 1) select = '撫でる';
  else if (dos === 2) select = 'ご飯をあげる';
  else if (dos === 3) select = '猫じゃらしで遊ぶ';

  // デバッグ用に選択情報を出力
  console.log({ dos, pet, met, select });

  const num = Math.floor(Math.random() * 3 + 1);
  let feel = '';  // 猫の気分
  if (num === 1) feel = 'お腹空いた';
  else if (num === 2) feel = '遊んでほしい';
  else feel = '撫でてほしい';

  let friend;
  let result;

  // 猫の気分と行動が一致する場合に仲良くなれる
  if (
    (dos === 1 && feel === '撫でてほしい') ||
    (dos === 2 && feel === 'お腹空いた') ||
    (dos === 3 && feel === '遊んでほしい')
  ) {
    result = '正解だった！';
    friend = '猫と仲良くなれた！';
    pet += 1;
  } else {
    result = '失敗だった．．．';
    friend = '猫に引っ掻かれてしまった．．．';
  }

  met += 1;

  // 表示するデータをテンプレートに渡す
  const display = {
    feel: feel,
    result: result,
    friend: friend,
    pet: pet,
    met: met,
    select: select
  };

  res.render('cat', display);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));

  
  
  app.listen(8080, () => console.log("Example app listening on port 8080!"));

  app.get("/cat", (req, res) => {
    const dos = Number(req.query.cat);  // ユーザーの選択した行動
    let pet = Number(req.query.pet);    // 仲良くなった猫の数
    let met = Number(req.query.met);    // 出会った猫の数
  
    console.log({ dos, pet, met });
  
    const num = Math.floor(Math.random() * 3 + 1);
    let feel = '';                      // 猫の気分
    if (num === 1) feel = 'お腹空いた';
    else if (num === 2) feel = '遊んでほしい';
    else feel = '撫でてほしい';
  
    let friend;
    let result;
    // 行動に応じた選択内容の表示
    let selectedAction = '';
    if (dos === 1) selectedAction = '撫でる';
    else if (dos === 2) selectedAction = 'ご飯をあげる';
    else if (dos === 3) selectedAction = '猫じゃらしで遊ぶ';
  
    // 行動と気分が一致すれば成功と判断
    if (
      (dos === 1 && feel === '撫でてほしい') ||
      (dos === 2 && feel === 'お腹空いた') ||
      (dos === 3 && feel === '遊んでほしい')
    ) {
      result = '正解だった！';
      friend = '猫と仲良くなれた！';
      pet += 1;
    } else {
      result = '失敗だった．．．';
      friend = '猫に引っ掻かれてしまった．．．';
    }
  
    met += 1;
  
    const display = {
      feel: feel,
      result: result,
      friend: friend,
      selectedAction: selectedAction  // 選択内容をテンプレートに渡す
    };
  
    res.render('cat', display);
  });
  
  