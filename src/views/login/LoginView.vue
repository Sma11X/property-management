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
          />
        </el-form-item>
        <el-form-item prop="passwords" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input v-model.number="ruleForm.passwords" type="password"/>
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
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

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

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
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
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
