import axios from 'axios';
<template>
  <div class="top-title">
    <h2>xxx的博客</h2>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"
        ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
      >
    </el-menu>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {

    };
  },
  mounted() {
    axios.get('/cart/getCartList').then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang="">
.top-title {
  height: 60px;
  width: 100%;
  background-color: #000;
}
h2 {
  color: #fff;
}
</style>
