import React from 'react'
import TreeGraph from '@/component/TreeGraph'

const data = {
  id: '1',
  label: '全国',
  children: [{
    id: '1-1',
    label: '福建省',
    children: [{
      id: '1-1-1',
      label: '福州市'
    }, {
      id: '1-1-2',
      label: '泉州市'
    }, {
      id: '1-1-3',
      label: '厦门市'
    }, {
      id: '1-1-4',
      label: '漳州市'
    }]
  }, {
    id: '1-2',
    label: '湖南省'
  }, {
    id: '1-3',
    label: '台湾省'
  }, {
    id: '1-4',
    label: '上海市'
  }, {
    id: '1-5',
    label: '北京市'
  }, {
    id: '1-6',
    label: '广东省'
  }]
}

// 全部展开
export default function expand() {
  const handleNodeClick = ({
    model, // 元素的数据模型
    item, // 元素实例
    isLeaf // 是否叶子节点
  }) => {
    console.log('expand', model, item, isLeaf)
    if (isLeaf) {
      // eslint-disable-next-line no-alert
      alert(`我是叶子节点：${model.label}`)
    }
  }

  return (
    <div className="demo">
      <h4>1. 不显示结束端箭头：showEndArrow = false</h4>
      <h4>2. messageContent 为空时, 可自定义点击叶子节点后的提示行为</h4>
      <TreeGraph
        data={data}
        collapse={false}
        onNodeClick={handleNodeClick}
        showEndArrow={false}
        messageContent={null}
      />
    </div>
  )
}
