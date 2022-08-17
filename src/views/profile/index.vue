<template>
  <div class="app-container">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <!-- <user-card  :userInfo="userInfo" /> -->
          <user-card  :student="student" />
          
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs active-name="timeline">
              <el-tab-pane label="通知" name="timeline">
                <timeline :userInfo="userInfo" />
              </el-tab-pane>
              <el-tab-pane label="账号" name="account">
                <account :userInfo="userInfo"  />
              </el-tab-pane>
            </el-tabs>
            
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import UserCard from './components/UserCard'
import Timeline from './components/Timeline'
import Account from './components/Account'
import userApi from '@/api/user'

export default {
  name: 'Profile',
  data () {
    return {
      userInfo: {
        realName: '',
        phone: '',
        lastActiveTime: '',
        createTime: '',
        role: '1',
        imagePath: null
      },
      student:{
        name:"罗伯特",
        id:"3192020910",
        class:"计算机科学与技术1班",
        college:"信息技术学院",
        imgUrl:null
      }
    }
  },
  components: { UserCard, Timeline, Account },
  created () {
    let _this = this
    // userApi.getCurrentUser().then(re => {
    //   _this.userInfo = re.response
    // })
  }
}
</script>
