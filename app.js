const NYTBaseurl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = "4dfd6d88bc06460883571aef03350a5e"

function buildUrl (url) {
  return NYTBaseurl + url + ".json?api-key=" + ApiKey
}

var vm = new Vue({
  el : '#app',
  data :{
      results : []
  },
  mounted () {
    this.getPosts('home')
  },
  methods: {
    getPosts (section) {
      let url = buildUrl(section);
      axios.get(url).then(response => {
         this.results = response.data.results;
      }).catch( error => { console.log(error); })
    }
  },
  computed: {
    processedPosts() {
      let posts = this.results;

      // Add image_url attribute
      posts.map(post => {
        let imgObj = post.multimedia.find(media => media.format === "superJumbo");
        post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
      });

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i,i+chunk);
      }
      return chunkedArray;
    }
  }
});