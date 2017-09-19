const _=require('lodash')
//
// for(var i=0;i<1000;i++) {
//     console.log(luck())
// }


console.log(luck())


function luck() {
    let goods = [
        {'name': 'A', 'stock': 100, 'total': 30},
        {'name': 'B', 'stock': 100, 'total': 50},
        {'name': 'C', 'stock': 100, 'total': 140}
        ];

    let threshold = 0.8; // 总中奖概率

    let tal = 0


    _.forEach(goods, function (n, key) {
        tal += n.stock
    });


    let num = tal / threshold; // 随机数范围 = 礼品总数 / 总中奖率

    let random =211;// Math.round(Math.random() * 100);
// 随机数发生在没中奖的范围

    if (random >= num) {
        return -1;

    } else {
        let cur = 0;
        for (let j = 0; j < goods.length; j++) {
            let next = cur + goods[j].stock;
            console.log([cur,random,next])
            // 随机数落在奖品的区间
            if (cur <= random && random < next) {
                // 所落的区间，礼品没库存了
                // if(goods[j].stock <= 0){
                //     console.log('【没库存】第'+i+'次中奖: '+goods[j].name+', 随机数是'+random);
                //     lucks[3].luck += 1; // 库存没了,不中奖
                //     break;
                // }
                // // 中奖
                // console.log('第'+i+'次中奖: '+goods[j].name+', 随机数是'+random);
                // goods[j].stock -= 1; // 中奖减库存
                // lucks[j].luck += 1;
                return j;
                break;
            }
            cur = next;
        }
    }
}