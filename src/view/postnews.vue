<template>
  <div class="postnews">
      <h3>文章发布</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="文章作者">
            <el-input v-model="form.authors"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
            <vue-editor v-model="form.desc"></vue-editor>
            <!-- <el-input type="textarea" v-model="form.desc"></el-input> -->
        </el-form-item>
        <el-form-item>
            <el-button type="danger" @click="resets">重置</el-button>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
        </el-form-item>
    </el-form>

    <h3>文章列表</h3>
    <div class="lists">
        <ul>
            <li v-for="(item,index) in postLists" :key="item.number">
                {{index + 1}}:<router-link :to="{ name: 'postnewsDetails', params: { ids: item._id  }}"> {{item.name}}</router-link>
                <span class="dos">
                    <span><el-button type="success" size="mini" @click="delstesOne(item._id)">删除</el-button></span>
                </span>
            </li>
        </ul>    
    </div>
   

     <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pages"
            :page-size="perPage"
            layout="prev, pager, next, jumper"
            :total="totals">
        </el-pagination>
    </div>


  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
    components: {
        VueEditor
    },
    name: 'postnews',
  data () {
    return {
        form: {
          name: '',
          desc: '',
          authors:''
        },
        postLists:[],
        totals:0,
        perPage:3,
        pages:1
    }
  },
  
  mounted(){
      this.getlists();
  },

  methods: {
    //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.perPage = val;
        //this.postLists = [];
        this.getlists();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //this.postLists = [];
        this.page = val;
        this.getlists();
      },


    onSubmit() {
        var params = {
            name:this.form.name,
            desc:this.form.desc,
            authors:this.form.authors,
        }
        this.$http.post('/api/postnew', params).then((response) => {
            this.getlists();
            this.form = {
                name: '',
                desc: '',
                authors:''
            }
        })
    },

    resets(){
        this.form = {
            name: '',
            desc: '',
            authors:''
        }
    },

    getlists(){
        this.$http.get('/api/postnew/getlist?'+ "pages" + "=" + this.pages + "&" + "perPage" + "=" + this.perPage ).then((response) => {
            this.postLists = response.body.data;
            this.totals = response.body.results;
        })
    },

    delstesOne(ids){
        this.$http.delete('/api/postnew/deldetOne/'+ ids).then((response) => {
            this.getlists();
        })
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.lists ul li{list-style: none; border-bottom:1px solid #ccc; padding: 10px; }
.dos{float: right;}
.block{margin-bottom: 100px;}
</style>