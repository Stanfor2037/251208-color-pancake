// 從開始畫面進入遊戲
function startGame() {
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.style.display = 'none'; // 隱藏開始畫面
    }
    initGame(); // 真正開始遊戲（載入題目＋啟動計時）
}

// 遊戲數據
const questions = [
    { char: '黃', color: '#FF0000', answers: ['紅', '黃', '藍'], correct: 0 },
    { char: '藍', color: '#FF00FF', answers: ['綠', '紫', '藍'], correct: 1 },
    { char: '紅', color: '#FFFF00', answers: ['紅', '黃', '橙'], correct: 1 },
    { char: '綠', color: '#FF0000', answers: ['綠', '紅', '黃'], correct: 1 },
    { char: '紫', color: '#00FF00', answers: ['紫', '綠', '藍'], correct: 1 },
    { char: '橙', color: '#0000FF', answers: ['橙', '藍', '紅'], correct: 1 },
    { char: '白', color: '#000000', answers: ['白', '黑', '灰'], correct: 1 }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let isPaused = false;

// 初始化遊戲
function initGame() {
    loadQuestion();
    startTimer();
}

// 載入題目
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const q = questions[currentQuestion];
    const charDisplay = document.getElementById('character');
    charDisplay.textContent = q.char;
    charDisplay.style.color = q.color;

    // 生成答案按鈕
    const buttonsContainer = document.getElementById('answerButtons');
    buttonsContainer.innerHTML = '';
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(index);
        buttonsContainer.appendChild(btn);
    });
}

// 檢查答案
function checkAnswer(selected) {
    const q = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');

    // 禁用所有按鈕
    buttons.forEach(btn => btn.disabled = true);

    if (selected === q.correct) {
        score++;
        document.getElementById('score').textContent = score.toString().padStart(2, '0');
        buttons[selected].classList.add('correct');
    } else {
        buttons[selected].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestion++;
        loadQuestion();
    }, 1000);
}

// 計時器
function startTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent =
                `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            if (timeLeft <= 0) {
                endGame();
            }
        }
    }, 1000);
}

// 🔥 結束遊戲
function endGame() {
    clearInterval(timerInterval);

    const playerName = document.getElementById('playerName').textContent;
    alert(`遊戲結束！\n${playerName} 的最終分數：${score}/${questions.length}`);

    // 顯示結束畫面
    const endScreen = document.getElementById('endScreen');
    if (endScreen) {
        endScreen.classList.add('active');

        // 點擊 end.png 重新開始
        const endImage = endScreen.querySelector('.end-image');
        if (endImage) {
            endImage.onclick = function () {
                endScreen.classList.remove('active');
                resetGame(); // ⚠️ 這裡不處理選單
            };
        }
    }
}

// 💡 重新開始不會自動跑出選單
function resetGame() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    document.getElementById('score').textContent = '00';
    document.getElementById('timer').textContent = '01:00';
    clearInterval(timerInterval);
    isPaused = false;
    initGame();

    // ⭐ 只有當選單本來是開的時候才關掉
    const menuPanel = document.getElementById('menuPanel');
    if (menuPanel && menuPanel.classList.contains('active')) {
        toggleMenu();
    }
}

// 選單功能
function toggleMenu() {
    document.getElementById('menuPanel').classList.toggle('active');
}

function pauseGame() {
    isPaused = !isPaused;
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems[1].textContent = isPaused ? 'Play' : 'Pause';
    toggleMenu();
}

function changePlayer() {
    const newName = prompt('請輸入玩家名字：', document.getElementById('playerName').textContent);
    if (newName && newName.trim() !== '') {
        document.getElementById('playerName').textContent = newName.trim();
    }
    toggleMenu();
}

// 啟動遊戲
window.onload = function () {
   
};
