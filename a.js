app.get("/janken", (req, res) => {
    let hand = req.query.hand;
    let win = Number(req.query.win);
    let total = Number(req.query.total);
    
    console.log({ hand, win, total });

    const num = Math.floor(Math.random() * 3) + 1;
    let cpu = '';
    if (num === 1) cpu = 'グー';
    else if (num === 2) cpu = 'チョキ';
    else cpu = 'パー';

    let judgement;
    if (hand === cpu) {
      judgement = '引き分け';
    } else if (
      (hand === 'グー' && cpu === 'チョキ') ||
      (hand === 'チョキ' && cpu === 'パー') ||
      (hand === 'パー' && cpu === 'グー')
    ) {
      judgement = '勝ち';
      win += 1;
    } else {
      judgement = '負け';
    }
  
    total += 1;
  
    const display = {
      your: hand,
      cpu: cpu,
      judgement: judgement,
      win: win,
      total: total
    };

    res.render('janken', display);
  });
  
  app.listen(8080, () => console.log("Example app listening on port 8080!"));
  

  app.get("/cat", (req, res) => {
    const value = Number(req.query.cat);  //行動
    let pet = Number(req.query.pet);  //仲良くなった猫の数
    let met = Number(req.query.met);  //出会った猫の数
  
    console.log({ value, pet, met });
  
    const num = Math.floor(Math.random() * 3 + 1);
    let feel = '';  //猫の気分
    if (num === 1) feel = 'お腹空いた';
    else if (num === 2) feel = '遊んでほしい';
    else feel = '撫でてほしい';
  
    let friend;
    let result;
    //猫の気分と行動がマッチすれば仲良くなれる
    if (
      (value === 1 && feel === '撫でてほしい') ||
      (value === 2 && feel === 'お腹空いた') ||
      (value === 3 && feel === '遊んでほしい')
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
    };
  
    res.render('cat', display);
  });
  
  
  
  app.listen(8080, () => console.log("Example app listening on port 8080!"));
  