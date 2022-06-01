
const num_bth = document.querySelectorAll('.num_bth');
let output_sub = document.getElementById('output_sub');//合計
let output_total = document.getElementById('output_total');//過程
let total = 0;//初期
let state = 'start';//最初の状態
let mode = 'intarget_mode';//整数モード=>小数点モードをdecimalで定義


//1-9ボタン
const one_nine = document.querySelectorAll('.one_nine');
  one_nine.forEach(index => {
    index.addEventListener('click' , () => {
      if(state === 'start') {
        total = index.dataset.indexId;
      }else if(state === 'finish') {
        reset();
        total = index.dataset.indexId;
      }else if(state === 'calculation' || state === 'calBtn'){
        total += index.dataset.indexId;
      }
      
      output_sub.textContent = total;
      state = 'calculation';
      changeOutput();
    });
  });
  
//0ボタン
const zero = document.getElementById('zero');
   zero.addEventListener('click' , () => {
     
     if(state === 'start' || state === 'finish' || state === 'calBtn'){
       if(output_sub.textContent.slice(-1) === '0'){
         return;
       }
     }
     
     if(state === 'start'){
       total = zero.dataset.indexId;
     }else{
       total += zero.dataset.indexId;
     }
     
     output_sub.textContent = total;
     changeOutput();
   });

//小数点
const point = document.getElementById('point');
  point.addEventListener('click' , () => {
    console.log(point.dataset.indexId);
    if(mode === 'decimal_mode') {
      return;
    }
    
    if(state === 'start' || state === 'finish') {
      total = 0;
    }else if(state === 'calBtn'){
      if(output_sub.text.content.slice(-1)!== '0'){
        total += 0;
      }
    }
    total = point.dataset.indexId;
    
    output_sub.textContent = total;
    state = 'caliculation';
    mode = 'decimal_mode';
    changeOutput();
  });
  
//四則演算ボタン
const cal = document.querySelectorAll('.cal');
  cal.forEach(index => {
    index.addEventListener('click' , () => {
      if(state === 'start') {
        return;
      }else if (state === 'calculation') {
        total += index.dataset.indexId;
      }else if (state === 'finish') {
        total = output_total.textContent;
        total += index.dataset.indexId;
        output_total.textContent = 0;
        
      }else if(state === 'calBtn'){
        //演算記号を入力してある状態でさらに押すと、最後の文字を削除＋新しく押された記号を代入
        total = total.slice(0, -1);
        total += index.dataset.indexId;
      }
      console.log(index.dataset.indexId);
      output_sub.textContent = total;
      state = 'calBtn';
      mode = 'intarget_mode';
      changeOutput();
    });
  });
 
//=ボタン
const equal_btn = document.getElementById('equal_btn');

equal_btn.addEventListener('click',() =>{
    console.log(eval(total));
    output_total.textContent = digitNum(eval(total));
    state = 'finish';
    mode = 'intarget_mode';
    changeOutput();
});

//ACボタン
const clear = document.getElementById('clear');
  clear.addEventListener('click', () => {
    reset();
  });

 //リセットボタン
  function reset() {
   total = 0; 
   output_sub.textContent = 0;
   output_total.textContent = 0;
   mode = 'intarget_mode';
   state = 'start';
   changeOutput();
  }
  
  //BSボタン
  const bs = document.getElementById('bs');
  bs.addEventListener('click', () => {
    console.log('BS');
    if(state ==="finish") {
      return;//計算後は、bsを押せなくする
    }
      total = output_sub.textContent.slice(0, -1);
      output_sub.textContent = total;
    
    let lastWord = output_sub.textContent.slice(-1);
      if(lastWord==='+'||lastWord==='-'||lastWord==='*'||lastWord==='/') {
        state = 'calBtn';
      }else if(lastWord === '') {
        state = 'start';
      }
  });
  
  
  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }
  
  function changeOutput(){
    if(state === 'finish'){
      output_total.classList.add('active');
      output_sub.classList.remove('active');
    }else{
      output_sub.classList.add('active');
      output_total.classList.remove('active');
    }
  }