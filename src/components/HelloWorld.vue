<template>
  <div id="box">
    <div class="left">
      <el-col :span="12" style="width: 100%; height: 100%">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2" @click="changeItem1">
            <i class="el-icon-menu"></i>
            <span slot="title">博客管理</span>
          </el-menu-item>
          <el-menu-item index="3" @click="changeItem2">
            <i class="el-icon-document"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="4" @click="changeItem3">
            <i class="el-icon-setting"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'A',
      tableData: []
    };
  },
  methods: {
    changeItem1() {
      this.$router.push({ path: '/blogs' });
    },
    changeItem2() {
      this.$router.push({ path: '/category' });
    },
    changeItem3() {
      this.$router.push({ path: '/comment' });
    },
    handleClick(row) {
      console.log(row);
    },
    create() {
      this.$router.push({ path: '/create' });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  display: flex;
}
#box {
  height: 100%;
  display: flex;
}
.left {
  height: 100%;
  width: 200px;
}
.right {
  margin-left: 100px;
  flex: 1;
  margin-top: 40px;
  height: 100%;
}
</style>
