# mobile端alert组件

## 基本用法
alert
包含无按钮, 确认框

```jsx harmony
constructor(props) {
  super(props);
  this.state = {}
}
onClick = () => {
      Alert.show({
      title: '这是一个测试弹框',
      // content: '内容内容123',
      btnText:'你好了',
      showIcon:true,
      type:'warnning',// success, warnning
      callBack: function() {
        console.log('关闭了...');
      }
    });
}

onClick2 = () => {
  this.setState(()=> ({show: true}))
}

render () {
  const {show} = this.state;
  return (
    <div>
      <Button type='primary' onClick={this.onClick}>alert全局式</Button>{' '}
      <Button type='primary' onClick={this.onClick2}>alert组件式</Button>{' '}
      <Alert show={show} btnText='确定' callBack={()=>{}} >内容</Alert>
    </div>
  )
}
```

## API

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| title      |  String 或 React.Element  |      无     | 标题 |
| content   |  String 或 React.Element  |  无    | 提示信息	|
| btnText   |  String  |  无    | 按钮文案	|
| type   |  String  |  无    | 按钮类型	|
| showIcon   |  bool  |  false    | icon是否显示	|
| callBack    | function | 无 |   按钮回调函数    |
