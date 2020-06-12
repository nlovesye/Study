/**
 * @description javascript event 事件对象处理工具
 */
var EventUtil = {
    // 绑定元素事件监听
    addHandler: function(ele, type, handler) {
        if (ele.addEventListener) {
            ele.addEventListener(type, handler, false)
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + type, handler)
        } else {
            ele['on' + type] = handler
        }
    },
    // 移除元素事件监听
    removeHandler: function(ele, type, handler) {
        if (ele.removeEventListener) {
            ele.removeEventListener(type, handler, false)
        } else if (ele.detachEvent) {
            ele.detachEvent('on' + type, handler)
        } else {
            ele['on' + type] = null
        }
    },
    // 获取事件对象
    getEvent: function(event) {
        return event ? event : window.event
    },
    // 获取触发事件的taget
    getTarget: function(event) {
        return event.target || event.srcElement
    },
    // 阻止事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },
    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    },
    // 获取mouseover和mouseout相关元素
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget
        } else if (event.toElement) {
            return event.toElement
        } else if (event.fromElement) {
            return event.fromElement
        } else {
            return null
        }
    },
    // 获取键盘键码
    getCharCode: function(event) {
        if (typeof event.charCode == 'number') {
            return event.charCode
        } else {
            return event.keyCode
        }
    },
    // 获取mousedown和mouseup事件鼠标按键
    getButton: function(event) {
        if (document.implementation.hasFeature('MouseEvents', '2.0')) {
            return event.button
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0
                case 2:
                case 6:
                    return 2
                case 4:
                    return 1
            }
        }
    },
    // 获取鼠标滚轮增量值
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
        } else {
            return -event.detail * 40
        }
    },
    // 获取剪切板内容
    getClipboardText: function(event) {
        var clipboardData = (event.clipboardData || window.clipboardData)
        return clipboardData.getData('text')
    },
    // 设置剪切板内容
    setClipboardText: function(event, value) {
        if (event.clipboardData) {
            return event.clipboardData.setData('text/plain', value)
        } else if (window.clipboardData) {
            return window.clipboardData.setData('text', value)
        }
    }
}

export default EventUtil
