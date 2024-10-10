'use srict';

{
  class Panel{

    constructor(){
      const section= document.createElement('section');
      section.classList.add('panel');

      this.img =document.createElement('img');
      this.img.src=this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop','inactive');
      this.stop.addEventListener('click',() =>{

        if(this.stop.classList.contains('inactive')){
          return;
        }

         this.stop.classList.add('inactive');

         clearTimeout(this.timeoutId);

         panelsLeft--;

         if(panelsLeft === 0){
          spin.classList.remove('inactive');
          panelsLeft=3;


          checkResult();

         }


      });

      section.appendChild(this.img);
      section.appendChild(this.stop);
      const main =document.querySelector('main');
      main.appendChild(section);

    }


    getRandomImage() {
      // 確率設定
      const probabilityTable = [
        { src: 'img/seven.png', probability: 0.4 }, // 10%の確率でseven
        { src: 'img/mimi.png', probability: 0.35 },  // 30%の確率でbell
        { src: 'img/mon.png', probability: 0.25 },   // 60%の確率でmon
      ];

      // 0から1の間のランダムな数値を生成
      const randomValue = Math.random();

      // 確率範囲に応じて画像を選択
      let cumulativeProbability = 0;
      for (const item of probabilityTable) {
        cumulativeProbability += item.probability;
        if (randomValue < cumulativeProbability) {
          return item.src;
        }
      }

      // すべての範囲に該当しない場合は最後の画像を返す
      return probabilityTable[probabilityTable.length - 1].src;
    }
    spin(){
      if(credit>=3){
      this.img.src=this.getRandomImage();
      this.timeoutId =setTimeout(() => {
      this.spin();
      },10);}
      else{
        this.img.src= 'img/mimi.png'


      }


    }


    isUnmatched(p1,p2){
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch(){
      this.img.classList.add('unmatched')
    }

    activate(){
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');

    }

    isMon() {
      return this.img.src.includes('mon.png');
    }
    isSeven(){
      return this.img.src.includes('seven.png');
    }
    isbell(){
      return this.img.src.includes('bell.png');
    }
    isMimi(){
      return this.img.src.includes('mimi.png');
    }
  }




  function checkResult(){

    if(panels[0].isUnmatched(panels[1],panels[2])){
     panels[0].unmatch();


    }

    if(panels[1].isUnmatched(panels[0],panels[2])){
     panels[1].unmatch();


    }

    if(panels[2].isUnmatched(panels[0],panels[1])){
     panels[2].unmatch();
    }
    if (panels[0].isMon() && panels[1].isMon() && panels[2].isMon()) {
      // 揃った場合、クレジットを増加させる
      credit += 1000; // 例: 10枚のクレジットを追加
      updateCreditDisplay(); // クレジット表示を更新
      playWinVideo();
    }
    if (panels[0].isSeven() && panels[1].isSeven() && panels[2].isSeven()) {
      // 揃った場合、クレジットを増加させる
      credit += 10; // 例: 10枚のクレジットを追加
      updateCreditDisplay(); // クレジット表示を更新
      alert("ジャンジャンバリバリ");
    }
    if (panels[0].isbell() && panels[1].isbell() && panels[2].isbell()) {
      // 揃った場合、クレジットを増加させる
      credit += 3; // 例: 10枚のクレジットを追加
      updateCreditDisplay(); // クレジット表示を更新
      alert("６６６人斬");
    }

    if (panels[0].isMimi() && panels[1].isMimi() && panels[2].isMimi()) {
      // 揃った場合、クレジットを増加させる
      credit -= 1000; // 例: 10枚のクレジットを追加
      updateCreditDisplay(); // クレジット表示を更新
      alert("店員さんを呼んでください");
    }




  }


    // 動画を再生し、再生終了後に元の画面に戻す関数

  function playWinVideo() {
    const winVideo = document.getElementById('winVideo');
    const winMusic = document.getElementById('winMusic');

    // スロット画面を隠し、動画を表示
    document.querySelector('main').style.display = 'none';
    spin.style.display = 'none';
    winVideo.style.display = 'block';

    // 動画を再生
    winVideo.play();

    // 動画の再生終了後にスロット画面に戻す処理
    winVideo.onended = () => {
      winVideo.style.display = 'none';
      document.querySelector('main').style.display = 'block';
      spin.style.display = 'block';
      winMusic.play();
    };
  }



  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),

  ];

  let panelsLeft = 3;

  let credit = 46; // 初期クレジット
    const creditDisplay = document.getElementById('credit');
    function updateCreditDisplay() {
      creditDisplay.textContent = credit;
    }
  const spin = document.getElementById('spin');
  spin.addEventListener('click',() =>{
    if (spin.classList.contains('inactive') || credit < 3) {
      return;
    }
    if (credit >= 3) {
      // 3枚のクレジットを消費
      credit -= 3;
      updateCreditDisplay(); // クレジット表示を更新
    }

    if(credit>=1000){

    }
    spin.classList.add('inactive');
    panels.forEach(panel =>{
    panel.activate();
    panel.spin();
    });
  });

  document.getElementById('changeableImage').addEventListener('click', function() {
    const ima = document.getElementById('changeableImage');

  if (ima.src.includes('rever1.png')) {
    ima.src = 'image.png';
  }


});
}
