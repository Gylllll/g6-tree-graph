// 定义数据源
// export const data = {
//   // 点集
//   nodes: [{
//     id: 'node1',
//     x: 100,
//     y: 200
//   }, {
//     id: 'node2',
//     x: 300,
//     y: 200
//   }],
//   // 边集
//   edges: [
//     // 表示一条从 node1 节点连接到 node2 节点的边
//     {
//       source: 'node1',
//       target: 'node2'
//     }
//   ]
// }

// 定义数据源
export const data = {
  id: 'root',
  children: [
    {
      id: 'subTree1',
      // expandNextLevel: false,
      children: [{
        id: '11111'
      }, {
        id: '22222'
      }, {
        id: '99999999'
      }]
    },
    {
      id: 'subTree2',
      children: [{
        id: '33333'
      }, {
        id: '4444444',
        isAsync: true, // 异步节点
        children: []
      }]
    }
  ]
}
