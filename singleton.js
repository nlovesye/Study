/**
 * @description 单例模式
 * @description 获取单例实例
 */
const getSingleton = function(fn) {
    var instance = null
    return function() {
        if (!instance) {
            instance = fn.apply(this, arguments)
        }
        return instance
    }
}

export default getSingleton
