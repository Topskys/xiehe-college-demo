<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item placement="top" :timestamp="userInfo.lastActiveTime">
        <el-card>
          <h4>9月1日</h4>
          <!-- <p>{{ userInfo.realName + "在校考系统中最后活动了" }}</p> -->
          <p style="line-height:1.5;">
            信息技术学院9月1日：同学，你有几门课程即将临近考试，请注意管理时间，多加温习，祝你考出满意的成绩。
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item placement="top" :timestamp="userInfo.lastActiveTime">
        <el-card>
          <h4>8月6日</h4>
          <!-- <p>{{ userInfo.realName + "在校考系统中最后活动了" }}</p> -->
          <p style="line-height:1.5;">
            省教厅8月6日紧急提示：
            8月1日以来，海南省三亚市疫情快速发展，已发生广泛社区传播，疫情外溢风险较大。
            这边再画几个重点：
            1、请7月23日以来有海南省三亚市以及海南省其他有疫情地市风险区域的返回人员主动上报目前所在地社区/村/学校，落实3天内2次核酸检测，及时排查风险。（有属于这种情况并且返校的马上联系我）
            2、非必要不赴海南省三亚市等有疫情发生的地方旅游、探亲等。
            3、严禁未经返校申请和审批私自返校。事关学校在校师生员工安全和学校疫情防控，请大家自觉主动遵守，若存在未经返校申请和审批私自返校的，一经发现按疫情防控有关办法给予从严处理。
            @全体成员
          </p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item placement="top" :timestamp="userInfo.createTime">
        <el-card>
          <h4>6月25日</h4>
          <!-- <p>{{ userInfo.realName+'加入了校考系统' }}</p> -->
          <p style="line-height:1.5;">
            各位：近期提醒事情如下
            1、赶紧去评教，然后查看成绩，挂科两门以上的还是老规矩哈
            2、疫情多点爆发，宁德疫情严重，请大家做好防护，及时关注疫情动态
            3、有申请留校的同学要返校请持48小时核酸进校，并告知我和班级点名负责人
            4、有离校的同学也一定要qq说下
            5、如果其他人有事需要返校的，一定经由我申请同意，不得私自返校！
            6、近期还有线上宣讲，请大家关注，回去一周左右也差不多父母看腻了，所以找个工作是锻炼锻炼提升自己哈
            7、还有请大家坚持每日打卡，一旦被隔离被确诊一定第一时间告知我
            8、天气炎热，一定不能到江湖海河非正规的地方游泳，安全第一！
            最后，暑假快乐！平平安安过暑假@全体成员
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: () => {
        return {
          realName: "",
          lastActiveTime: "",
          createTime: "",
        };
      },
    },
  },
};
</script>
