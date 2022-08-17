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
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item prop="userName">
          <label>邮箱</label>
          <el-input v-model="ruleForm.userName" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
            minlength="6"
            maxlength="15"
          />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input v-model="ruleForm.passwords" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary"
            @click="submitForm(ruleFormRef)"
            class="login-btn block"
          >
            {{ model === "login" ? "登录" : "注册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import * as ck from '../../utils/verification.js'
import link from '../../api/Link.js'
import apiUrl from '../../api/url.js'

onMounted(() => {
  console.log(process.env.VUE_APP_API)
})

const MenuData = reactive([
  {txt: "登录", current: true, type: "login"},
  {txt: "注册", current: false, type: "register"},
])

let model = ref('login')
let clickMenu = (item: any) => {
  MenuData.forEach((ele) => {
    ele.current = false
  })
  item.current = true
  model.value = item.type
}


const ruleFormRef = ref<FormInstance>()

const checkUserName = (rule: any, value: any, callback: any) => {
  
  if (!value) {
    return callback(new Error("邮箱不能为空"))
  } else if (ck.CheckEmail(value)) {
    return callback(new Error("邮箱格式有误"))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("密码不能为空"))
  } else if (ck.CheckPwd(value)) {
    return callback(new Error("密码应为6-15位的字母和数字"))
  } else {
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (model.value === "login") callback()
  if (value === '') {
    callback(new Error('重复密码不能为空'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次密码必须相同"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  userName: '',
  password: '',
  passwords: '',
})

const rules = reactive({
  userName: [{ validator: checkUserName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  passwords: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
      link(apiUrl.one).then((ok: any) => {
        console.log(ok)
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
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
  .demo-ruleForm {
    width: 30%;
    margin: 50px auto;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
    .block {
      display: block;
      width: 100%;
    }
    .login-btn {
      margin-top: 20px;
    }
  }
</style>
