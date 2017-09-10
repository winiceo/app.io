export default [
  {
    text: '营销活动',
    icon: 'el-icon-star-on',
    location: {name: 'activity-dzp'},
    children: [
      {
        text: '幸运大转盘',
        icon: 'el-icon-picture',
        location: {name: 'activity-dzp'}
      },
      {
        text: '砸金蛋',
        icon: 'el-icon-time',
        location: {name: 'activity-zjd'}
      }
    ]
  },
  {
    text: '个人中心',
    icon: 'el-icon-star-on',
    location: {name: 'settings-demo'},
    children: [
      {
        text: '导航 2-1',
        icon: 'el-icon-star-on',
        location: {name: 'settings-demo'}
      },
      {
        text: '导航 2-2',
        icon: 'el-icon-star-off',
        location: {name: 'settings-demo2'}
      }
    ]
  }
]
