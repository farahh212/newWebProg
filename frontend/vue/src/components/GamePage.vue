<template>

  <audio id="flip-swish" src="../assets/card-sounds.mp3" preload="auto"></audio>
  <audio id="win-sound" src="path/to/win-sound.mp3" preload="auto"></audio>
  <audio id="lose-sound" src="path/to/lose-sound.mp3" preload="auto"></audio>


      <div class="leaderboard">
        <h2>Leaderboard</h2>
        <div class="leaderboard-grid">
          <div class="grid-row header">
            <div class="grid-cell">Position</div>
            <div class="grid-cell">Username</div>
            <div class="grid-cell">Top Score</div>
          </div>
          <div v-for="(entry, index) in topScores" :key="index" class="grid-row">
            <div class="grid-cell">
              <span v-if="index === 0">🥇</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else-if="index === 2">🥉</span>
              <span v-else>#{{ index + 1 }}</span>
            </div>
            <div class="grid-cell">{{ entry.username }}</div>
            <div class="grid-cell">{{ entry.topScore }}</div>
          </div>
        </div>
      </div>
      <div class="game-container">
        <h1>Purble Pairs Game</h1>
        <div v-if="gameStatus === 'playing'">
          <div class="score-board">
            <p>Score: {{ score }}</p>
            <p>Level: {{ level }}</p>
          </div>
          <div class="timer-container">
            <div class="timer-bar-wrapper">
              <div class="timer-bar" :style="timerBarStyle"></div>
            </div>
            <div class="timer-number">{{ timeLeft }}</div>
          </div>
          <div class="grid" ref="grid">
            <div
              v-for="(card, index) in shuffledCards"
              :key="index"
              class="card"
              :class="{'flipped': card.flipped, 'matched': card.matched}"
              @click="flipCard(card, index)"
              :style="{ backgroundColor: card.flipped || card.matched ? card.value : '#ccc' }"
            ></div>
          </div>
        </div>
        <div v-else-if="gameStatus === 'won' && level === 3" class="end-screen">
          <h2>Congratulations! You Won the Game!</h2>
          <p>Your Score: {{ score }}</p>
          <button @click="restartGame">Play Again</button>
        </div>
        <div v-else-if="gameStatus === 'won'" class="end-screen">
          <h2>Level {{ level }} Complete!</h2>
          <p>Proceeding to Level {{ level + 1 }}</p>
        </div>
        <div v-else-if="gameStatus === 'lost'" class="end-screen">
          <h2>Game Over</h2>
          <p>Your Score: {{ score }}</p>
          <button @click="restartGame">Play Again</button>
        </div>
        <div v-if="gameStatus === 'playing'" class="actions">
          <button @click="saveScore">Save Score</button>
        </div>
      </div>
    </template>
    
    <script>
  export default {
    name: 'GamePage',
  props: {
    theme: {
      type: Array,
      required: true
    }
  },
    data() {
      return {
        originalCards: [],
        colors: [],
        flippedCards: [],
        savedTheme: [],
        topScores: [
          // Example data
          { username: 'Player1', topScore: 100 },
          // Uncomment to test different scenarios
           { username: 'Player2', topScore: 80 },
           { username: 'Player3', topScore: 60 },
        ],
        score: 0,
        timeLeft: 0,
        timer: null,
        level: 1,
        remainingTime: 0,
        timeLossPerIncorrectGuess: 5,
        gameStatus: 'playing',
      };
    },
    computed: {
      timerBarStyle() {
        const width = (this.timeLeft / this.maxTime) * 100;
        const color = this.getTimerColor(); // Use the dynamic color function here
        return {
          width: `${width}%`,
          backgroundColor: color, // Apply the dynamic background color
          height: '8px',
          borderRadius: '4px',
          transition: 'width 1s linear',
        };
      },
      maxTime() {
        const baseTimeByLevel = {
          1: 120,
          2: 105,
          3: 90,
        };
        return baseTimeByLevel[this.level] || 120;
      },
      shuffledCards() {
        return [...this.originalCards].sort(() => Math.random() - 0.5);
      },
    },
    methods: {
  
     /* async fetchTopScores() {
        try {
          const response = await axios.get('/api/leaderboard');
          this.topScores = response.data;
        } catch (error) {
          console.error("Error fetching leaderboard data:", error);
        }
      },
    },
  */
  
      startGame() {
        this.gameStatus = 'playing';
        this.initializeCards();
        this.timeLeft = this.maxTime + this.remainingTime;
        this.startTimer();
      /*  this.fetchTopScores();*/
      },
      initializeCards() {
        const gridSizes = {
          1: { rows: 3, cols: 4 },
          2: { rows: 4, cols: 4 },
          3: { rows: 5, cols: 4 },
        };
        const { rows, cols } = gridSizes[this.level];
        const totalCards = rows * cols;
        const pairs = totalCards / 2;
        //const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'brown', 'gray'];
        const selectedColors = this.theme.slice(0, pairs);
  

        this.originalCards = [...selectedColors, ...selectedColors].map(value => ({
          value,
          flipped: false,
          matched: false
        }));
  
        if (this.$refs.grid) {
          this.$refs.grid.style.gridTemplateColumns = '';
          this.$refs.grid.style.gridTemplateRows = '';
        }
  
        this.$nextTick(() => {
          this.$refs.grid.style.gridTemplateColumns = `repeat(${cols}, 100px)`;
          this.$refs.grid.style.gridTemplateRows = `repeat(${rows}, 100px)`;
        });
      },
      flipCard(card, index) {
     if (this.flippedCards.length === 2 || card.flipped || card.matched) return;
     card.flipped = true;
     this.flippedCards.push({ card, index });
  //    document.getElementById('flip-swish').play();  // Play flip sound
     
     if (this.flippedCards.length === 2) {
        this.checkMatch();
     }
  },
      checkMatch() {
        const [first, second] = this.flippedCards;
        if (first.card.value === second.card.value) {
          this.score += 50;
          setTimeout(() => {
            first.card.matched = true;
            second.card.matched = true;
          }, 500);
          setTimeout(() => {
            this.flippedCards = [];
            this.checkWin();
          }, 500);
        } else {
          this.timeLeft -= this.timeLossPerIncorrectGuess;
          setTimeout(() => {
            first.card.flipped = false;
            second.card.flipped = false;
            this.flippedCards = [];
          }, 1200);
        }
      },
      checkWin() {
        const allMatched = this.originalCards.every(card => card.matched);
        if (allMatched) {
          this.remainingTime = this.timeLeft;
          if (this.level < 3) {
            this.levelUp();
          } else {
            this.gameStatus = 'won';
            clearInterval(this.timer);
          }
        }
      },
      levelUp() {
        this.gameStatus = 'won';
        clearInterval(this.timer);
        setTimeout(() => {
          this.level += 1;
          this.startGame();
        }, 1000);
      },
      startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.timeLeft > 0) {
            this.timeLeft--;
          } else {
            clearInterval(this.timer);
            this.endGame();
          }
        }, 1000);
      },
      getTimerColor() {
        const percentage = this.timeLeft / this.maxTime;
        if (percentage > 0.5) {
          return "green";
        } else if (percentage > 0.2) {
          return "yellow";
        } else {
          return "red";
        }
      },
      endGame() {
        this.gameStatus = 'lost';
      },
      saveScore() { /*where to save, still in db oin ms3 right*/
        console.log('Saving score:', this.score);
      },
      restartGame() {
        this.score = 0;
        this.level = 1;
        this.remainingTime = 0;
        this.startGame();
      },
    },
    mounted() {
      this.startGame();
    },
  };
  </script>
  
    
  <style scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%; /* Ensure the body takes up the full height */
  }

  body {
    font-family: 'Comic Sans MS', 'Arial', sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Align content to the top */
    align-items: center; /* Center everything horizontally */
    overflow: hidden; /* Prevent scrolling */
    margin: 0; /* Remove default margin */
    height: 100%; /* Make sure body fills the height */
  }

  .custom-bg {
    background-size: cover;
    background-position: center;
  }

  .timer-container {
    width: 100%;
    height: 30px;
    margin-bottom: 10px;
    background: linear-gradient(135deg, #d1e8e2, #c1d3e1);
    border-radius: 15px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .timer-bar-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .timer-bar {
    height: 100%;
    border-radius: 15px;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #ffcc99, #99ccff);
    transition: width 1s linear, background-color 0.5s ease;
    max-width: 100%;
  }

  .timer-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-weight: bold;
    color: #050505;
  }

  .score-container, .purple-pairs-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: bold;
    color: #050505;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  }

  .game-container {
    text-align: center;
    padding: 20px;
    background: linear-gradient(135deg, #825bb1, #351e61);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 600px;
    height: 600px;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    position: relative;
    margin: 0 auto;
  }

  .leaderboard {
    position: absolute;
    top: 20px;
    left: 20px;
    background-blend-mode: color;
    background-color: #b192d6;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .leaderboard h2 {
    font-size: 22px;
    margin-bottom: 10px;
    color: #2c2930;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
    background-color: #825bb1;
    padding: 5px;
    border-radius: 8px;
  }

  .leaderboard-grid {
    display: grid;
    gap: 10px;
  }

  .header {
    font-weight: bold;
    color: #bfcdd8;
  }

  .grid-row {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #243848;
  }

  .grid-cell {
    flex: 1;
    text-align: center;
    font-size: 18px;
    color: #45414b;
  }

  .score-board {
    margin-bottom: 10px;
    font-size: 22px;
    color: #050505;
  }

  .grid {
    display: grid;
    gap: 15px;
    margin-top: 20px;
    justify-content: center;
    animation: fadeInGrid 1.5s ease-out;
  }

  @keyframes fadeInGrid {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .card {
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 24px;
    border-radius: 10px;
    transition: transform 0.5s, box-shadow 0.3s, opacity 0.6s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .card:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  .card.flipped {
    background-color: #ffddc1;
    color: #fff;
    transform: rotateY(180deg);
    transition: transform 0.5s ease-out;
  }

  .card.matched {
    background-color: #ffddc1;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.8);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  button {
    padding: 12px 24px;
    font-size: 18px;
    background: linear-gradient(135deg, #6a8e79, #7593df);
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  button:hover {
    background: linear-gradient(135deg, #7593df, #585bc3);
    transform: scale(1.05);
  }

  .end-screen h2 {
    font-size: 28px;
    color: #4a4a4a;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
    animation: confetti 2s forwards;
  }

  @keyframes confetti {
    0% { transform: translateY(0); }
    100% { transform: translateY(-300px); }
  }

  .actions {
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: repeat(3, 100px);
      grid-template-rows: repeat(3, 100px);
    }

    .card {
      width: 80px;
      height: 80px;
    }

    .game-container {
      width: 80%;
      height: auto;
    }

    .timer-container {
      margin-bottom: 15px;
    }

    .score-container, .purple-pairs-container {
      font-size: 18px;
    }
  }
</style>


