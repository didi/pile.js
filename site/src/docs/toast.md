# mobile端toast组件

## 基本用法

```jsx harmony
componentWillMount () {
  //this.setState({content : "hi,jasmine"})
  Toast.show({content : "hi,xixi",iconType : "success",duration: 0})
  setTimeout(() => {
        //this.setState({content : "hei,potato",iconType : "warn"})
        Toast.hide();
  }, 1 * 1000);
}
render () {
  return (
    <div>
      111
    </div>
  )
}
```
## API

### parameter

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| content  |  string  |   ''  | toast显示的文字  |
| iconType  |  string  |   ''   | one of ['success', 'fail', 'load', 'warn', '' |
| duration  |  number  |    3s  |  默认展示3s后关闭，也可以自己传入数值，传入0时，toast不再自己关闭|