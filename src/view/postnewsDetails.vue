<template>
  <div class="postnewsDetails">
    <h2>{{detials.name}}</h2>
    <p>作者：{{ detials.authors}} 日期：{{ detials.date}}</p>
    <p v-html="detials.desc"></p>
  </div>
</template>

<script>
export default {
  name: 'postnewsDetails',
  data () {
    return {
       detials:{},
    }
  },
  
  mounted(){
    this. getListDetails();
  },

  methods: {
    getListDetails(){
        var ids = this.$route.params.ids;
        this.$http.get('/api/postnew/getOne/'+ ids).then((response) => {
            this.detials = response.body.data;
        })
    },

    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>