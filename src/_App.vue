<template>
  <Spinner v-show="is_waiting" />
  <h1>🔥 Weathernator5000 🔥</h1>
  <div>
    {{store.api_calls}}
    <input type="text" v-model="query" @keydown.enter="fetch_data"/>
    <button class="button" @click="fetch_data">Fetch!</button>
  </div>

  <WeatherCard
    v-for="(city, i) in cities" :key="i"

    :name="city.name"
    :coords="city.coord"
    :weather="city.weather"
    :main="city.main"
  />
</template>

<script>
import Spinner from './components/Spinner.vue';
import WeatherCard from './components/WeatherCard.vue';
import store from './store';

export default {
  components: {
    Spinner,
    WeatherCard
  },
  data() {
    return {
      api_key: '',
      api_url: 'https://api.openweathermap.org/data/2.5/weather?',
      cities: [],
      is_waiting: false,
      store,
      query: null,
    }
  },
  methods: {
    async fetch_data() {
      this.is_waiting = true;
      const queries = this.query.split(',');
      for (const query of queries) {
        if (this.cities.findIndex(item => item.name.toLowerCase() === query.toLowerCase()) > -1) continue;

        const succ = await this.$http.get(this.generate_url(query));
        if (succ instanceof Error) continue;
        this.cities.push(succ.data);
        this.query = null;
      }

      this.is_waiting = false;

    },
    generate_url(query) {
      return `${this.api_url}q=${query}&appid=${this.api_key}&units=metric`

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>