import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'
import { getStorage, setStorage } from '@/utils/index.js'

Vue.use(Router)

const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index'),
    meta: { title: '登录' }
  },

  {
    path: '/',
    component: Layout,
    // name: 'RouterPage',
    redirect: '/router',
    // meta: {
    //   title: '主页',
    //   icon: 'message'
    // },
    hidden: true,
    alwaysShow: true,
    children: [
      {
        path: 'router',
        component: () => import('@/views/router/list.vue'),
        name: 'RouterListPage',
        meta: { title: '主页', icon: 'home', affix: true, }
        // ,hidden: true,//noCache: true
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    // redirect: '/dashboard',
    alwaysShow: true,

    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '评估报告', },//  icon: 'home', affix: true
        hidden: true,
      }
    ]
  }, {
    path: '/major',
    component: Layout,
    name: 'MajorPage',
    meta: {
      title: '专业管理',
      icon: 'users'
    },
    hidden: true,
    children: [
      {
        path: 'paper/list',
        component: () => import('@/views/major/list'),
        name: 'ExamPaperPageList',
        meta: { title: '专业列表', noCache: true }
      },
      {
        path: 'paper/edit',
        component: () => import('@/views/major/edit'),
        name: 'ExamPaperEdit',
        meta: { title: '专业管理-编辑', noCache: true, activeMenu: '/major/paper/list' },
        hidden: true
      },]
  },
  {
    path: '/exam',
    component: Layout,
    name: 'UserPage',
    meta: {
      title: '考试',
      icon: 'exam'
    },
    hidden: true,
    children: [
      {
        path: 'student/list',
        component: () => import('@/views/user/student/list'),
        name: 'UserStudentPageList',
        meta: { title: '考试列表', noCache: true }
      },
      {
        path: 'student/ready',
        component: () => import('@/views/user/student/edit'),
        name: 'UserStudentEdit',
        meta: { title: '准备考试', noCache: true, activeMenu: '/exam/student/list' },
        hidden: true
      },
      {
        path: 'student/test',
        component: () => import('@/views/user/student/test'),
        name: 'UserStudentTest',
        meta: { title: '考试中', noCache: true, activeMenu: '/exam/student/list' },
        hidden: true
      }
    ]
  },
  //    训练管理 监考中心
  // {
  //   path: '/exam',
  //   component: Layout,
  //   name: 'ExamPage',
  //   meta: {
  //     title: '评估报告',
  //     icon: 'exam'
  //   },
  //   children: [
  //     {
  //       path: 'paper/list',
  //       component: () => import('@/views/exam/paper/list'),
  //       name: 'ExamPaperPageList',
  //       meta: { title: '评估报告', noCache: true }
  //     },
  //     {
  //       path: 'paper/edit',
  //       component: () => import('@/views/exam/paper/edit'),
  //       name: 'ExamPaperEdit',
  //       meta: { title: '试卷编辑', noCache: true, activeMenu: '/exam/paper/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'question/list',
  //       component: () => import('@/views/exam/question/list'),
  //       name: 'ExamQuestionPageList',
  //       meta: { title: '题目列表', noCache: true }
  //     },
  //     {
  //       path: 'question/edit/singleChoice',
  //       component: () => import('@/views/exam/question/edit/single-choice'),
  //       name: 'singleChoicePage',
  //       meta: { title: '单选题编辑', noCache: true, activeMenu: '/exam/question/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'question/edit/multipleChoice',
  //       component: () => import('@/views/exam/question/edit/multiple-choice'),
  //       name: 'multipleChoicePage',
  //       meta: { title: '多选题编辑', noCache: true, activeMenu: '/exam/question/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'question/edit/trueFalse',
  //       component: () => import('@/views/exam/question/edit/true-false'),
  //       name: 'trueFalsePage',
  //       meta: { title: '判断题编辑', noCache: true, activeMenu: '/exam/question/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'question/edit/gapFilling',
  //       component: () => import('@/views/exam/question/edit/gap-filling'),
  //       name: 'gapFillingPage',
  //       meta: { title: '填空题编辑', noCache: true, activeMenu: '/exam/question/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'question/edit/shortAnswer',
  //       component: () => import('@/views/exam/question/edit/short-answer'),
  //       name: 'shortAnswerPage',
  //       meta: { title: '简答题编辑', noCache: true, activeMenu: '/exam/question/list' },
  //       hidden: true
  //     }
  //   ]
  // },
  {
    path: '/task',
    component: Layout,
    name: 'TaskPage',
    meta: {
      title: '错题集',
      icon: 'task'
    },

    alwaysShow: true, hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/task/list'),
        name: 'TaskListPage',
        meta: { title: '错题集', noCache: true }
      },
      {
        path: 're_do',
        component: () => import('@/views/task/re_do'),
        name: 'TaskReDoPage',
        meta: { title: '重做', noCache: true, activeMenu: '/task/list' },
        hidden: true
      },
      // {
      //   path: 'edit',
      //   component: () => import('@/views/task/edit'),
      //   name: 'TaskEditPage',
      //   meta: { title: '任务创建', noCache: true }
      // }
    ]
  },
  {
    path: '/education',
    component: Layout,
    name: 'EducationPage',
    meta: {
      title: '考试管理',
      icon: 'education'
    },

    alwaysShow: true, hidden: true,
    children: [
      {
        path: 'subject/list',
        component: () => import('@/views/education/subject/list'),
        name: 'EducationSubjectPage',
        meta: { title: '考试管理', noCache: true }
      },
      {
        path: 'subject/edit',
        component: () => import('@/views/education/subject/edit'),
        name: 'EducationSubjectEditPage',
        meta: { title: '考试管理-新增', noCache: true, activeMenu: '/education/subject/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/topic',
    component: Layout,
    name: 'TopicPage',
    meta: {
      title: '题目管理',
      icon: 'answer'
    },


    alwaysShow: true, hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/answer/list'),
        name: 'AnswerPageList',
        meta: { title: '理论题管理', noCache: true }
      },
      {
        path: 'theory/edit',
        component: () => import('@/views/answer/edit'),
        name: 'UserStudentEdit',
        meta: { title: '理论题-新增', noCache: true, activeMenu: '/topic/list' },
        hidden: true
      },
      {
        path: 'operate/list',
        component: () => import('@/views/message/list'),
        name: 'AnswerPageList',
        meta: { title: '操作题管理', noCache: true }
      },
      {
        path: 'operate/edit',
        component: () => import('@/views/message/edit'),
        name: 'UserStudentEdit',
        meta: { title: '操作题-新增', noCache: true, activeMenu: '/topic/operate/list' },
        hidden: true
      },
      {
        path: 'program/list',
        component: () => import('@/views/log/list'),
        name: 'AnswerPageList',
        meta: { title: '编程题管理', noCache: true }
      },
      {
        path: 'program/edit',
        component: () => import('@/views/log/edit'),
        name: 'UserStudentEdit',
        meta: { title: '编程题-新增', noCache: true, activeMenu: '/topic/program/list' },
        hidden: true
      },
    ]
  },
  {
    path: '/train',
    component: Layout,
    name: 'TrainPage',
    meta: {
      title: '训练管理',
      icon: 'message'
    },
    alwaysShow: true,
    hidden: true,

    children: [
      {
        path: 'list',
        component: () => import('@/views/train/list'),
        name: 'MessageListPage',
        meta: { title: '训练列表', noCache: true }
      },
      {
        path: 'list/edit',
        component: () => import('@/views/train/edit'),
        name: 'UserStudentEdit',
        meta: { title: '训练列表-新增', noCache: true, activeMenu: '/train/list' },
        hidden: true
      },
    ]
  },
  {
    path: '/monitor',
    component: Layout,
    name: 'MonitorPage',
    meta: {
      title: '监控中心',
      icon: 'log'
    },
    alwaysShow: true,
    hidden: true,

    children: [
      {
        path: 'list',
        component: () => import('@/views/monitor/list'),
        name: 'MonitorListPage',
        meta: { title: '监控列表', noCache: true }
      },
    ]
  },

  // {
  //   path: '/message',
  //   component: Layout,
  //   name: 'MessagePage',
  //   meta: {
  //     title: '消息中心',
  //     icon: 'message'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'list',
  //       component: () => import('@/views/message/list'),
  //       name: 'MessageListPage',
  //       meta: { title: '消息列表', noCache: true }
  //     },
  //     {
  //       path: 'send',
  //       component: () => import('@/views/message/send'),
  //       name: 'MessageSendPage',
  //       meta: { title: '消息发送', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/log',
  //   component: Layout,
  //   name: 'LogPage',
  //   meta: {
  //     title: '日志中心',
  //     icon: 'log'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'user/list',
  //       component: () => import('@/views/log/list'),
  //       name: 'LogUserPage',
  //       meta: { title: '用户日志', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '个人简介', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '*',
    hidden: true,
    component: () => import('@/views/error-page/404'),
    meta: { title: '404', noCache: true }
  }
]

const router = new Router({
  routes: constantRoutes
})





export {
  constantRoutes,
  router
}
