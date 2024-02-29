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

   function showSettledAmount(amount) {
       document.getElementById('settledValue').textContent = amount.toFixed(2);
       document.getElementById('settledAmount').style.display = 'block'; // 显示结算金额元素
   }
   function startGame() {
       betAmount = parseFloat(document.getElementById('betAmount').value);
       if (isNaN(betAmount) || betAmount <= 0 || betAmount > balance) {
           alert('请输入有效的下注金额，且不能大于余额。');
           return;
       }
   
       balance -= betAmount;
       updateBalance();
   
       let target = generateRandomTarget();
       let current = 1.00;
       document.getElementById('gameOutput').textContent = current.toFixed(2);
       document.getElementById('startBet').disabled = true;
       document.getElementById('cashOut').disabled = false;
       document.getElementById('cashOut').textContent = '结算 (0 元)';
   
       // 更新增长逻辑
       let updateInterval = 100; // 初始间隔为0.1秒
       let increment = 0.01; // 初始每次增加0.01
   
       gameInterval = setInterval(() => {
           if (current >= target) {
               clearInterval(gameInterval);
               if (cashOutMultiplier > 0) {
                   finalizeCashOut(cashOutMultiplier);
               } else {
                   document.getElementById('gameOutput').textContent = `游戏结束，您输了 ${betAmount} 元`;
                   resetGame();
               }
           } else {
               current += increment;
               document.getElementById('gameOutput').textContent = current.toFixed(2);
               
               // 当数字超过2.00时，改为每0.1秒自增0.1
               if (current > 2.00 && increment === 0.01) {
                   increment = 0.05; // 更新每次增加的值
               }
   
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


// 然后在resetGame函数中重新启用结算按钮：
function resetGame() {
       document.getElementById('startBet').disabled = false;
       document.getElementById('cashOut').disabled = true; // 这里已经禁用，为了清晰，我们保持这行不变
       cashOutMultiplier = 0; // 重置结算乘数
       hideSettledAmount(); // 隐藏结算金额元素
   }
   
// 初始化余额
updateBalance();
