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
  

  app.get("/janken", (req, res) => {
    let hand = req.query.hand;
    let win = Number( req.query.win );
    let total = Number( req.query.total );
    console.log( {hand, win, total});
    const num = Math.floor( Math.random() * 3 + 1 );
    let cpu = '';
    if( num==1 ) cpu = 'グー';
    else if( num==2 ) cpu = 'チョキ';
    else cpu = 'パー';
    // ここに勝敗の判定を入れる
    // 今はダミーで人間の勝ちにしておく
    let judgement = '勝ち';
    win += 1;
    total += 1;
    const display = {
      your: hand,
      cpu: cpu,
      judgement: judgement,
      win: win,
      total: total
    }
    res.render( 'janken', display );
  });
  
  app.listen(8080, () => console.log("Example app listening on port 8080!"));
  