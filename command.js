/**
 * @description 命令模式
 * 
 1. 定义
用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系
命令（command）指的是一个执行某些特定事情的指令

2. 核心
命令中带有execute执行、undo撤销、redo重做等相关命令方法，建议显示地指示这些方法名

3. 实现
简单的命令模式实现可以直接使用对象字面量的形式定义一个命令
 */

 // 自增
function IncrementCommand() {
    // 当前值
    this.val = 0;
    // 命令栈
    this.stack = [];
    // 栈指针位置
    this.stackPosition = -1;
};

IncrementCommand.prototype = {
    constructor: IncrementCommand,

    // 执行
    execute: function() {
        this._clearRedo();
        
        // 定义执行的处理
        var command = function() {
            this.val += 2;
        }.bind(this);
        
        // 执行并缓存起来
        command();
        
        this.stack.push(command);

        this.stackPosition++;

        this.getValue();
    },
    
    canUndo: function() {
        return this.stackPosition >= 0;
    },
    
    canRedo: function() {
        return this.stackPosition < this.stack.length - 1;
    },

    // 撤销
    undo: function() {
        if (!this.canUndo()) {
            return;
        }
        
        this.stackPosition--;

        // 命令的撤销，与执行的处理相反
        var command = function() {
            this.val -= 2;
        }.bind(this);
        
        // 撤销后不需要缓存
        command();

        this.getValue();
    },
    
    // 重做
    redo: function() {
        if (!this.canRedo()) {
            return;
        }
        
        // 执行栈顶的命令
        this.stack[++this.stackPosition]();

        this.getValue();
    },
    
    // 在执行时，已经撤销的部分不能再重做
    _clearRedo: function() {
        this.stack = this.stack.slice(0, this.stackPosition + 1);
    },
    
    // 获取当前值
    getValue: function() {
        console.log(this.val);
    }
};




/* ---------------------------------------------------------------------------------- */




var MacroCommand = {
    commands: [],

    add: function(command) {
        this.commands.push(command);

        return this;
    },

    remove: function(command) {
        if (!command) {
            this.commands = [];
            return;
        }

        for (var i = 0; i < this.commands.length; ++i) {
            if (this.commands[i] === command) {
                this.commands.splice(i, 1);
            }
        }
    },

    execute: function() {
        for (var i = 0; i < this.commands.length; ++i) {
            this.commands[i].execute();
        }
    }
};

var showTime = {
    execute: function() {
        console.log('time');
    }
};

var showName = {
    execute: function() {
        console.log('name');
    }
};

var showAge = {
    execute: function() {
        console.log('age');
    }
};

MacroCommand.add(showTime).add(showName).add(showAge);

MacroCommand.remove(showName);

MacroCommand.execute(); // time age
