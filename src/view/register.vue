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
        passwords : '',
        imageUrl: ''
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
        this.$http.post('/api/users/createUser', parms).then((response) => {
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
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
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