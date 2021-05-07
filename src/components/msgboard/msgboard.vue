<template>
  <div>
    <head-nav title="留言板"></head-nav>
    <div class="page-part">
      <mt-field label="姓名" placeholder="请输入名字" v-model="name" :attr="{ maxlength: 10 }"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" v-model="phone" :state="phonestate" @blur.native.capture="phonetips('请输入正确的手机号')" type="tel"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" v-model="emall" :state="emallstate" @blur.native.capture="emalltips('请输入正确的邮箱号')" type="email"></mt-field>
      <mt-field placeholder="留言内容" type="textarea" v-model="msg" ref="text" rows="6"></mt-field>
    </div>
    <div class="page-button-group">
      <mt-button type="primary" size="large" @click="submit">提交</mt-button>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  const Reg = {
    // 匹配手机号码
    tel: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    // 匹配Email地址
    email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  }
  export default {
    name: "msgboard",
    data(){
      return {
        name: '',
        phone: '',
        emall: '',
        msg: '',
        phonestate: '',
        emallstate: ''
      }
    },
    mounted() {
      this.$refs.text.$el.children[1].children[1].children[0].style.resize = 'none';
    },
    watch: {
      phone(newVal, oldVal){ // 验证用户手机号码
        const reg = Reg.tel.test(newVal);
        console.log(reg)
        if(reg === false && this.phone === ''){
          this.phonestate = '';
        }else if(reg === false && this.phone !== ''){
          this.phonestate = 'error';
        }else{
          this.phonestate = 'success';
        }
      },
      emall(newVal, oldVal){ // 验证用户邮箱号码
        const reg = Reg.email.test(newVal);
        if(reg === false && this.emall === ''){
          this.emallstate = '';
        }else if(reg === false && this.emall !== ''){
          this.emallstate = 'error';
        }else{
          this.emallstate = 'success';
        }
      }
    },
    methods: {
      phonetips(msg){
        setTimeout(() =>{
          if(this.phonestate === 'error' && this.phone !== ''){
            this.openToast(msg);
          }
        },100);
      },
      emalltips(msg){
        setTimeout(() => {
          if(this.emallstate === 'error' && this.emall !== ''){
            this.openToast(msg);
          }
        },100)
      },
      submit(){
        if(this.phonestate === 'error'){
          return this.openToast('请输入正确的手机号')
        }

        if(this.emallstate === 'error'){
          return this.openToast('请输入正确的邮箱号')
        }

        if(this.name === ''){
          return this.openToast('姓名不能为空');
        }
        if(this.phone === '' && this.emall === ''){
          return this.openToast('电话邮箱不能全为空');
        }
        if(this.msg === ''){
          return this.openToast('留言内容不能为空')
        }


        this.axios.post(`msg/board`, {name: this.name, phone: this.phone, emall: this.emall,msg: this.msg})
        .then(response => {
          this.openToastWithIcon(response.data.msg);
          this.name=this.phone=this.emall=this.msg= "";
        })
        .catch(err => err);
      },
      openToast(msg) {
        Toast(msg);
      },
      openToastWithIcon(msg) {
        Toast({
          message: msg,
          iconClass: 'mintui mintui-success'
        });
      }
    }
  }
</script>

<style scoped lang="less">
@rem: 750/10rem;

.page-button-group{
  margin-top: 100/@rem;
  padding: 0 15px;
}

</style>