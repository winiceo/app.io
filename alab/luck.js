const _=require('lodash')

let goods = [{'name':'A','stock': 10, 'total': 10},
    {'name':'B','stock': 50, 'total': 50},
    {'name':'C','stock': 140, 'total': 140}];

// 每个礼品的中奖情况
let lucks = [{'name':'A', 'luck': 0},
    {'name':'B', 'luck': 0},
    {'name':'C', 'luck': 0},
    {'name':'没中', 'luck': 0}]

let threshold = 50; // 总中奖概率

let tal = 200;  // 礼品总数
let num = tal/threshold; // 随机数范围 = 礼品总数 / 总中奖率

let random = Math.round(Math.random() * 100);
// 随机数发生在没中奖的范围

if (random >= threshold){
    console.log('第次没中奖, 随机数是'+random);
    lucks[3].luck += 1; // 不中奖

}else{
    let cur = 0;
    for (let j=0; j<goods.length; j++){
        let next = cur + goods[j].total;
        // 随机数落在奖品的区间
        if(cur <= random && random < next){
            // 所落的区间，礼品没库存了
            if(goods[j].stock <= 0){
                console.log('【没库存】第'+i+'次中奖: '+goods[j].name+', 随机数是'+random);
                lucks[3].luck += 1; // 库存没了,不中奖
                break;
            }
            // 中奖
            console.log('第'+i+'次中奖: '+goods[j].name+', 随机数是'+random);
            goods[j].stock -= 1; // 中奖减库存
            lucks[j].luck += 1;
            break;
        }
        cur = next;
    }

}
console.log(random)
console.log(num)