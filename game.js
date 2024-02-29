document.getElementById('setBalance').addEventListener('click', function() {
       var balanceInput = document.getElementById('balanceInput').value;
       document.getElementById('currentBalance').innerText = balanceInput;
   });
   
   function placeBet(betOn) {
       var betAmount = parseInt(document.getElementById('betAmount').value);
       var currentBalance = parseInt(document.getElementById('currentBalance').innerText);
       var betHistory = document.getElementById('betHistory');
   
       if (betAmount > currentBalance) {
           alert("下注金额不能超过当前余额。");
           return;
       }
   
       var result = Math.random() < 0.5 ? 'banker' : 'player';
       var gameResult = document.getElementById('gameResult');
       var resultText = '';
   
       if (result === betOn) {
           currentBalance += betAmount;
           resultText = `赢了! 下注 ${betAmount} 在 ${betOn}`;
       } else {
           currentBalance -= betAmount;
           resultText = `输了。下注 ${betAmount} 在 ${betOn}`;
       }
   
       document.getElementById('currentBalance').innerText = currentBalance;
       gameResult.innerText = `您${resultText}`;
   
       // 在列表的开始位置添加下注详情
       var listItem = document.createElement('li');
       listItem.innerText = `下注金额: ${betAmount}, 选择: ${betOn}, 结果: ${result === betOn ? '赢' : '输'}`;
       betHistory.prepend(listItem); // 使用prepend而不是appendChild
   }
   