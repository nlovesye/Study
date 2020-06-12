/**
 * @description 策略模式
 * 
1. 定义
定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

2. 核心
将算法的使用和算法的实现分离开来。
一个基于策略模式的程序至少由两部分组成：
第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context 中要维持对某个策略对象的引用

3. 实现
策略模式可以用于组合一系列算法，也可用于组合一系列业务规则
假设需要通过成绩等级来计算学生的最终得分，每个成绩等级有对应的加权值。我们可以利用对象字面量的形式直接定义这个组策略
 */

 // 加权映射关系
var levelMap = {
    S: 10,
    A: 8,
    B: 6,
    C: 4
};

// 组策略
var scoreLevel = {
    basicScore: 80,

    S: function() {
        return this.basicScore + levelMap['S']; 
    },

    A: function() {
        return this.basicScore + levelMap['A']; 
    },

    B: function() {
        return this.basicScore + levelMap['B']; 
    },

    C: function() {
        return this.basicScore + levelMap['C']; 
    }
}

// 调用
function getScore(level) {
    return scoreLevel[level] ? scoreLevel[level]() : 0;
}

console.log(
    getScore('S'),
    getScore('A'),
    getScore('B'),
    getScore('C'),
    getScore('D')
); // 90 88 86 84 0
