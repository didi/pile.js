# mobile端switch组件

## 基本用法
普通情况2

```jsx harmony
render () {
  return (
    <div>
      <Switch />
    </div>
  )
}
```

checked
```jsx harmony
render () {
  return (
    <div>
      <Switch checked/>
    </div>
  )
}
```

disabled and checked
```jsx harmony
render () {
  return (
    <div>
      <Switch disabled checked/>
    </div>
  )
}
```

width、height、onChange
```jsx harmony
render () {
  return (
    <div>
      <Switch onChange={(a) => console.log(a)} width="30px" height="20px" color="red" checkedColor="green" name="switch"/>
    </div>
  )
}
```

## API

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| checked   |  bool  |     false     | 是否默认选中 |
| disabled  |  bool  |  false    | 是否不可修改	|
| onChange  | function(checked: bool) | 无 | switch改变时的回调 |
| width     |  string|     50px     | 总宽 |
| height    |  string  |     30px     | 总高度 |
| color   |  string  |     #ccc     | 未选中的背景颜色 |
| checkedColor   |  string  |   #343c5c   | 选中的背景颜色 |
| name   |  string  |   无   | switch的name |
