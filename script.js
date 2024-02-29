let balance = 5000; // 初始余额
let gameInterval;
let betAmount = 0;
let cashOutMultiplier = 0; // 用户点击结算时的乘数

document.getElementById('startBet').addEventListener('click', startGame);
// 在用户点击结算时更新结算金额
document.getElementById('cashOut').addEventListener('click', () => {
       if (!document.getElementById('cashOut').disabled) { // 如果结算按钮未被禁用
           cashOutMultiplier = parseFloat(document.getElementById('gameOutput').textContent);
           showSettledAmount(betAmount * cashOutMultiplier); // 显示结算金额
           document.getElementById('cashOut').disabled = true; // 禁用结算按钮，防止二次点击
       }
   });

   document.getElementById('setBalance').addEventListener('click', function() {
       let inputBalance = parseFloat(document.getElementById('initialBalance').value);
       if (isNaN(inputBalance) || inputBalance <= 0) {
           alert('请输入有效的余额值。');
       } else {
           balance = inputBalance; // 更新余额
           updateBalance();
       }
   });



   function showSettledAmount(amount) {
       document.getElementById('settledValue').textContent = amount.toFixed(2);
       document.getElementById('settledAmount').style.display = 'block'; // 显示结算金额元素
   }
   function startGame() {
       // 确保之前的游戏间隔被清除
       clearInterval(gameInterval);
   
       betAmount = parseFloat(document.getElementById('betAmount').value);
       if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
           alert('请输入有效的下注金额，且不能大于余额。');
           return;
       }
   
       balance -= betAmount;
       updateBalance();
   
       let target = generateRandomTarget(); // 使用新的随机数生成逻辑
       let current = 1.00;
       document.getElementById('gameOutput').textContent = current.toFixed(2);
       document.getElementById('startBet').disabled = true;
       document.getElementById('cashOut').disabled = false;
       document.getElementById('cashOut').textContent = '结算 (0 元)';
   
       let updateInterval = 100; // 初始间隔为0.1秒
       let increment = 0.01; // 初始每次增加0.01
   
       gameInterval = setInterval(() => {
           if (current >= target) {
               clearInterval(gameInterval);
               document.getElementById('gameOutput').textContent = cashOutMultiplier > 0 ? `结算成功，您赢得 ${(betAmount * cashOutMultiplier).toFixed(2)} 元` : `游戏结束，您输了 ${betAmount} 元`;
               resetGame(); // 游戏结束，重置游戏状态
           } else {
               current += (current > 2.00 && increment === 0.01) ? 0.1 : increment;
               document.getElementById('gameOutput').textContent = current.toFixed(2);
               let potentialWin = (betAmount * current).toFixed(2);
               document.getElementById('cashOut').textContent = `结算 (${potentialWin} 元)`;
           }
       }, updateInterval);
   }
   
   
function generateRandomTarget() {
       let rand = Math.random() * 100; // 产生0-100的随机数
   
       if (rand < 50) { // 50% 概率
           return (Math.random() * (1.99 - 1.00) + 1.00).toFixed(2);
       } else if (rand < 73) { // 23% 概率
           return (Math.random() * (2.99 - 2.00) + 2.00).toFixed(2);
       } else if (rand < 82) { // 9% 概率
           return (Math.random() * (4.99 - 3.00) + 3.00).toFixed(2);
       } else if (rand < 94) { // 12% 概率
           return (Math.random() * (10.00 - 5.00) + 5.00).toFixed(2);
       } else if (rand < 99) { // 5% 概率
           return (Math.random() * (100.00 - 10.00) + 10.00).toFixed(2);
       } else { // 1% 概率
           return (Math.random() * (1000.00 - 100.00) + 100.00).toFixed(2);
       }
   }

   // 在finalizeCashOut和resetGame函数中，确保在适当的时候隐藏结算金额元素
function finalizeCashOut(multiplier) {
       let winAmount = betAmount * multiplier;
       balance += winAmount;
       document.getElementById('gameOutput').textContent = `结算成功，您赢得 ${winAmount.toFixed(2)} 元`;
       updateBalance();
       hideSettledAmount(); // 隐藏结算金额元素
       resetGame();
   }

function updateBalance() {
    document.getElementById('balanceAmount').textContent = balance.toFixed(2);
}


// 更新resetGame函数，确保一轮结束后可以重新开始游戏
function resetGame() {
    document.getElementById('startBet').disabled = false; // 重新激活“开始下注”按钮
    document.getElementById('cashOut').disabled = true; // 禁用结算按钮
    cashOutMultiplier = 0; // 重置结算乘数
    hideSettledAmount(); // 隐藏结算金额元素
}
   
// 初始化余额
updateBalance();
