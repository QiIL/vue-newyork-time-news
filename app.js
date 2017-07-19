const vm = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=4dfd6d88bc06460883571aef03350a5e")
    .then(response => { this.results = response.data.results })
  }
});