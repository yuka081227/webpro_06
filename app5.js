const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

let win = 0;
let total = 0;
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  
  
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

let pet = 0; //仲良くなった猫の数
let met = 0; //出会った猫の数

app.get("/cat",(req,res) => {
  const dos = Number(req.query.cat);  //行動

  //選択内容を表示
  let select = '';
  if (dos === 1) select = '撫でる';
  else if (dos === 2) select = 'ご飯をあげる';
  else if (dos === 3) select = '猫じゃらしで遊ぶ';

  console.log({ dos, pet, met, select });

  //猫の気分をランダムに決定
  const num = Math.floor(Math.random() * 3 + 1);
  let feel = '';  //猫の気分
  if(num === 1) feel = 'お腹空いた';
  else if(num === 2) feel = '遊んでほしい';
  else feel = '撫でてほしい';

  let friend;

  //猫の気分と行動がマッチすれば仲良くなれる
  if(
    (dos === 1 && feel === '撫でてほしい') ||
    (dos === 2 && feel === 'お腹空いた') ||
    (dos === 3 && feel === '遊んでほしい')
  ){
    friend = '猫と仲良くなれた！'
    pet += 1;

  }else{
    friend = '猫に引っ掻かれてしまった．．．'
  }

  met += 1;

  const display = {
    feel: feel,
    friend: friend,
    pet:pet,
    met:met,
    select:select
  };

  res.render('cat', display);

});

let affection = 0; // 猫の現在の好感度
const maxAffection = 10; // 猫が完全に懐くための好感度
app.get("/catGame", (req, res) => {
  const dos = Number(req.query.action); // ユーザーの選択した行動
  let select = ''; // ユーザーの行動を表示用
  if (dos === 1) select = '撫でる';
  else if (dos === 2) select = 'ご飯をあげる';
  else if (dos === 3) select = '猫じゃらしで遊ぶ';

  console.log({ dos, affection });

  // 猫の好きな行動をランダムに決定
  const num = Math.floor(Math.random() * 3 + 1);
  let favorite = ''; // 猫の好きな行動
  if (num === 1) favorite = '撫でる';
  else if (num === 2) favorite = 'ご飯をあげる';
  else favorite = '猫じゃらしで遊ぶ';

  let result;
  let message;

  // ユーザーの行動が猫の好みと一致しているかを判定
  if (select === favorite) {
    result = '大成功！';
    message = '猫はとても喜んでいる！';
    affection += 1; // 好感度を上げる
  } else {
    result = '失敗．．．';
    message = '猫は少し不機嫌そう．．．';
  }

  // 猫が完全に懐いたかどうかを判定
  let gameStatus;
  if (affection >= maxAffection) {
    gameStatus = '猫は完全に懐きました！おめでとう！';
    affection = maxAffection; // 好感度を上限に固定
  } else {
    gameStatus = `あと${maxAffection - affection}回の成功で猫が懐きます！`;
  }

  // レンダリング用データ
  const display = {
    favorite: favorite,
    select: select,
    result: result,
    message: message,
    affection: affection,
    gameStatus: gameStatus,
  };

  res.render('catGame', display);
});




app.listen(8080, () => console.log("Example app listening on port 8080!"));
