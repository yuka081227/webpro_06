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
  let result;

  //猫の気分と行動がマッチすれば仲良くなれる
  if(
    (dos === 1 && feel === '撫でてほしい') ||
    (dos === 2 && feel === 'お腹空いた') ||
    (dos === 3 && feel === '遊んでほしい')
  ){
    result = '正解だった！'
    friend = '猫と仲良くなれた！'
    pet += 1;

  }else{
    result = '失敗だった．．．'
    friend = '猫に引っ掻かれてしまった．．．'
  }

  met += 1;

  const display = {
    feel: feel,
    result: result,
    friend: friend,
    pet:pet,
    met:met,
    select:select
  };

  res.render('cat', display);

});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
