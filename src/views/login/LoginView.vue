<template>
  <div class="login">
    <div class="login-con">
      <ul class="menu-tab">
        <li 
          v-for="v in MenuData" 
          :class="{current: v.current}" 
          :key="v.type" 
          @click="clickMenu(v)"
        >
          {{ v.txt }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const MenuData = reactive([
  {txt: "登录", current: true, type: "login"},
  {txt: "注册", current: false, type: "register"},
])
let clickMenu = (item: any) => {
  MenuData.forEach((ele) => {
    ele.current = false
  })
  item.current = true
}
</script>

<style lang="scss">
  .login {
    background-color: blue;
    height: 100%;
  }
  html,body,#app {
    height: 100%;
  }
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(255,255,255,.5);
    }
  }
</style>
