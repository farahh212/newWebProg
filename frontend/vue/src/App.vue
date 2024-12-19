<template>
  <div :class="gameStarted ? 'imgG' : 'img'">
    <div id="app">
      <!-- Show header only if game hasn't started -->
      <header v-if="!gameStarted">
        <h1>Welcome to Purble Pairs Game!</h1>
        <button @click="startGame">Start Game</button>

        <!-- Theme Selector -->
        <div class="theme-selector">
          <label for="season">Choose a color palette! </label>
          <select v-model="selectedSeason" @change="changeSeason" id="season">
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Fall">Fall</option>
          </select>
        </div>
      </header>

      <!-- Display GamePage only when game has started -->
      <GamePage v-if="gameStarted" :theme="selectedTheme" />
    </div>
  </div>
</template>


<script>
import GamePage from './components/GamePage.vue';

export default {
  name: 'App',
  components: {
    GamePage,
  },
  data() {
    return {
      gameStarted: false,
      seasonColors: {
        Winter: [
          '#161D6F', '#0B2F9F', '#98DED9', '#C7FFD8', '#1A3636', '#40534C', 
          '#677D6A', '#D6BD98', '#B8001F', '#FCFAEE'
        ],
        Spring: [
          '#94E3A8', '#f6b9ad', '#ee6f68', '#663399', '#f68f3c', '#5e8d5a', 
          '#C02942', '#528B8B', '#F7CA18', '#B266FF'
        ],
        Summer: [
          '#FF8A00', '#FFD700', '#FF6347', '#FF1493', '#00BFFF', '#00FA9A', 
          '#F0E68C', '#D2B48C', '#000099', '#ADFF2F'
        ],
        Fall: [
          '#04151f', '#183a37', '#efd6ac', '#c44900', '#432534', '#355070', 
          '#6d597a', '#b56576', '#e56b6f', '#84a98c'
        ]
      },
      selectedTheme: [], // Initial theme array (empty)
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
    },
    changeSeason() {
      this.selectedTheme = this.seasonColors[this.selectedSeason];
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  padding: 30px;
  font-family: 'Arial', sans-serif;
 /* background: linear-gradient(135deg, #666cd2, #3a29bc);*/
/*  background-image: url(./assets/img2.jpg);*/
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.img{
  background-image: url(./assets/img.jpg);
  background-size: cover; /* Ensure it covers the entire element */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent repeating */
  min-height: 100vh; /* Full height */
}

.imgG{
  background-image: url(./assets/imgG.jpg);
  background-size: cover; /* Ensure it covers the entire element */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent repeating */
  min-height: 100vh; /* Full height */
}

header {
  margin-bottom: 40px;
  padding: 20px;
  background-color: rgba(61, 46, 70, 0.8);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
label{
  font-size: medium;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  color:#f6f3f3;

}

h1 {
  font-size: 2.5em;
  color: #f8f3f3;
  margin-bottom: 20px;
  font-weight: 700;
}

button {
  padding: 12px 30px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  background-color: #cf9cf1;
  color: #fff;
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:hover {
  background-color: #6f1ba8;
  transform: scale(1.05);
}

button:active {
  background-color: #5d138b;
}

.theme-selector {
  margin-top: 20px;
}

select {
  padding: 12px 20px;
  font-size: 1.1em;
  border: 2px solid #161219;
  border-radius: 8px;
  background-color: #c9bff5;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

select:hover {
  background-color: #ba75d3;
}

select:focus {
  outline: none;
  border-color: #8e43c0;
}

@media (max-width: 768px) {
  #app {
    padding: 20px;
  }

  h1 {
    font-size: 2em;
  }

  button {
    font-size: 1em;
    padding: 10px 25px;
  }

  select {
    font-size: 1em;
    padding: 10px 15px;
  }
}
</style>
