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
        text: '核销管理',
        icon: 'el-icon-star-on',
        location: {name: 'list'},
        children: [
            {
                text: '核销管理',
                icon: 'el-icon-star-on',
                location: {name: 'list'}
            },
            {
                text: '核销员管理',
                icon: 'el-icon-star-on',
                location: {name: 'manager'}
            },

        ]
    }
]
