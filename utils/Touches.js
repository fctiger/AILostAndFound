class Touches {
    dataList = []
    startClientX = null
    operationWrapperWidth = null
  
    /**
     * 初始化相关数据
     * @param {array} dataList 列表数据
     * @param {number} operationWrapperWidth 左滑出现的操作块宽度
     */
    initData({ datalist, operationWrapperWidth }) {
        this.operationWrapperWidth = Math.abs(operationWrapperWidth)
        this.dataList = datalist instanceof Array
            ? datalist.concat()
            : [datalist]
    }
  
    /**
     * 手指触摸动作开始
     * 1. 重置数据
     * 2. 获取触摸起始位置x
     * @return {array} 被初始化的列表数据
     */
    touchStart(e) {
        this._resetData()
        this.startClientX = this._getClientX(e)
        return this.dataList
    }
  
    /**
     * 手指触摸后移动
     * @return {object} 当前被操作的item
     */
    touchMove(e) {
        let moveWidth = this._getMoveWidth(e)
        if (moveWidth > 0) return
    
        this.dataList[this.getItemIndex(e)].left = Math.abs(moveWidth) > this.operationWrapperWidth
            ? -this.operationWrapperWidth
            : moveWidth
    
        return this.dataList[this.getItemIndex(e)]
    }
  
    /**
     * 手指触摸动作结束
     * @return {object} 当前被操作的item
     */
    touchEnd(e) {
        let moveWidth = this._getMoveWidth(e)
        let left = 0
    
        // 向左滑动 且 滑动的距离不等于0
        if (moveWidth < 0 && Math.abs(moveWidth) !=0) {
            left = -this.operationWrapperWidth
        }
    
        this.dataList[this.getItemIndex(e)].left = left
        return this.dataList[this.getItemIndex(e)]
    }
  
    // 获取滑动列表的下标值
    getItemIndex(e) {
        return e.currentTarget.dataset.index
    }
  
    // 获取当前滑动手势下 距离页面可显示区域的 横坐标
    _getClientX(e) {
        let touch = e.changedTouches
        if (touch.length === 1) return touch[0].clientX
    }
  
    // 获取滑动过程中 滑动的宽度
    _getMoveWidth(e) {
        return this._getClientX(e) - this.startClientX
    }
  
    _resetData() {
        this.startClientX = null
        this.dataList.forEach(v => { v.left = 0 })
    }
  }
  
  export default Touches