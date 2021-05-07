<template>
  <div class="mb">
    <head-nav title="图片详情"></head-nav>
    <div class="photoImgs">
      <img class="preview-img" v-for="(item, index) in photos" :src="item.pic" v-lazy="item" :key="index" @click="$preview.open(index, photos)">
<!--      <vue-preview :list="photos" :thumbImageStyle="{width: '100%', height: '100%'}" :tapToClose="true"></vue-preview>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "photo",
    data(){
      return {
        photos: []
      }
    },
    created() {
      const id = this.$route.query.id;
      this.axios.get(`photo/detail?id=${id}`)
      .then(res => {
        res.data.forEach(item => {
          item.src = item.pic;
          item.w = 640;
          item.h = 400;
        })

        this.photos = res.data;

      })
      .catch(err => err);
    },
    methods: {
      async handleClose(data){

      }
    }
  }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .photoImgs{
    padding:40/@rem 40/@rem 4/@rem;
    background: white;
    position: relative;
    img{
      display: block;
      width: 670/@rem;
      margin-bottom: 30/@rem;
      object-fit:cover;
    }
  }
</style>