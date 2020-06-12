/**
 * @description 观察者模式
 */

function Observer() {
    var tasks = {};
    var action = {
        fire: function (type) {
            if (!tasks[type]) return
            for (let i = 0; i < tasks[type].length; i++) {
                var event = {
                    type,
                    args: arguments
                }
                tasks[type][i].call(this, event)
            }
        },
        regist: function (type, fn) {
            if (!(typeof type === 'string') || !fn) {
                console.warn('别特么乱注册', type)
                return
            }
            if (!tasks[type]) {
                tasks[type] = [fn]
            } else {
                tasks[type].push(fn)
            }
        },
        remove: function(type, fn) {
            if (!tasks[type]) return
            for (let i = 0; i < tasks[type].length; ++i) {
                if (fn === tasks[type][i]) {
                    tasks[type].splice(i, 1)
                }
            }
        }
    }
    return action
}

export default Observer
