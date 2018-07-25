<template>
  <div class="hello">
    <input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
    <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
    <button type="submit" class="btn btn-default" @click="login">注 册</button>
    
    <p>
        <input placeholder="请输入账号" v-model="accounts">
        <input type="password"  placeholder="请输入密码" v-model="passwords">
        <button type="submit"  @click="logins">登录</button>
    </p>
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        account : '',
        password : '',
        accounts : '',
        passwords : ''
    }
  },
  
  mounted(){
    
  },

  methods: {
    //注册
    login() {
        var params = {
            account:this.account,
            password:this.password,
        }
        this.$http.post('/api/users/createUser', params).then((response) => {
            console.log(response.body)
        })
    },
    //登录
    logins(){
        var params = {
            account:this.accounts,
            password:this.passwords,
        }
        this.$http.post('/api/users/logins', params).then((response) => {
            console.log(response.body)
        })
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>