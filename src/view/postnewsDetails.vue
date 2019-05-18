<template>
  <div class="postnewsDetails">
    <h2>{{detials.name}}</h2>
    <p>作者：{{ detials.authors}} 日期：{{ detials.date}}</p>
    <p v-html="detials.desc"></p>
     <div>
       <el-row>
          <el-col :span="24"> <el-button type="danger"  @click="tapZan()"> 给个赞吧！ ({{detials.__v}})</el-button></el-col>
       </el-row>
    </div>
    <h3>用户评论</h3>
    <div class="areasHua">
        <el-form ref="forms" :model="forms" label-width="80px">
            <el-form-item label="输入评论">
                <el-input v-model="forms.contents"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmits()">评论</el-button>
            </el-form-item>
        </el-form>
    </div>
   
    <h3>评论列表</h3>
    <div class = "lists">
        <ul>
            <li v-for="itmes in detailsList" :key="itmes.number">
              <p><b>评论用户:</b>{{itmes.commentuUsername}}</p>
              <p class="conts"><b>评论内容:</b>{{itmes.commentCont}}</p>
              <p><b>评论时间:</b>{{itmes.commentDate}}</p>
            </li>
        </ul>  
    </div>
  </div>
</template>

<script>
export default {
  name: 'postnewsDetails',
  data () {
    return {
       detials:{},
       forms:{
         contents:''
       },
       detailsList:[],
       statusZan:true
    }
  },
  
  mounted(){
    this.getListDetails();
    this.getCommentList();
  },

  methods: {
    getListDetails(){
        var ids = this.$route.params.ids;
        this.$http.get('/api/postnew/getOne/'+ ids).then((response) => {
            this.detials = response.body.data;
            console.log(this.detials)
        })
    },
    
    onSubmits(){
        var params = {
          contents:this.forms.contents
        };
        this.$http.post('/api/comment', params).then((response) => {
            //console.log(response.body)
        })
        this.getCommentList();
    },

    //赞
    tapZan(){
        var ids = this.$route.params.ids;
        this.$http.put('/api/postnew/zan/'+ ids).then((response) => {
            //console.log(response.body)
        })
        this.getListDetails();
    },

    //根据文章id获取对应的文章评论
    getCommentList(){
       var ids = this.$route.params.ids;
        this.$http.get('/api/comment/details/'+ ids).then((response) => {
            this.detailsList = response.body.data;
            //console.log(this.detailsList);
        })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.areasHua{margin: 10px; }
.lists ul li{list-style: none; border-bottom:1px solid #ccc; padding: 10px;}
.lists ul li{text-align: left;}
.conts{color: #67C23A}
</style>