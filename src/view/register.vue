<template>
  <div class="hello">
   <h3>登录注册示例</h3>
    <input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">
    <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">
    <button type="submit" class="btn btn-default" @click="login">注 册</button>
    
    <p>
        <input placeholder="请输入账号" v-model="accounts">
        <input type="password"  placeholder="请输入密码" v-model="passwords">
        <button type="submit"  @click="logins">登录</button>
    </p>

    <h3>上传图片示例</h3>
    
    <el-upload
        class="avatar-uploader"
        action="/api/users/avatars"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <h3>socket示例</h3>
    
    <div>此处的值是socket发送过来的:<span style='color: red'> {{testSocketValue}}</span></div>
    <p>此处还牵扯到一个问题，后端发送的数据，dom不能立即更新，这时候就用上了Vue.nextTick();还有一点需要注意的是，一般使用soket做图表的数据传递，都会遇到这个问题! </p>

  </div>
</template>

<script>
var socket = io.connect('http://localhost:3030');
export default {
  name: 'register',
  data () {
    return {
        account : '',
        password : '',
        accounts : '',
        passwords : '',
        imageUrl: '',
        testSocketValue: ''
    }
  },
  
  mounted(){
    this.testSocket();
  },

  methods: {
    // 测试socket
    testSocket() {
      var _this = this;
      socket.on('news', function(data) {
        _this.$nextTick(function(){
          this.testSocketValue = data.hello;
        })
        socket.emit('my other event', {my : 'data'});
      })
    },
    //注册
    login() {
        var params = {
            account:this.account,
            password:this.password,
        }
        this.$http.post('/api/users/createUser', params).then((response) => {
            console.log(response.body);
        })
    },
    //登录
    logins(){
        var params = {
            account:this.accounts,
            password:this.passwords,
        }
        this.$http.post('/api/users/logins', params).then((response) => {
            console.log(response.body);
            this.$router.push({path:'/postnews'});
        })
    },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.$message({
          message: '恭喜你，图片上传成功',
          type: 'success'
        });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式或者PNG!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped>

</style>