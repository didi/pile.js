# mobile端inputFile组件 {QR-code}

## 基本用法
```jsx harmony
render () {
  return (
    <div>
      <InputFiled placeholder='请输入姓名' value='小红' type='text' clearable={true} onFocus={(value)=>console.log("onFocus"+value)} onBlur={(value)=>console.log("onBlur"+value)}  onChange={(value)=>console.log("onChange"+value)} >姓名：</InputFiled>
      <InputFiled placeholder='请输入电话' type='phone'>电话：</InputFiled>
      <InputFiled placeholder='请输入密码' type='password'>密码：</InputFiled>
      <InputFiled placeholder='我要自动获取焦点' autoFocus={true} type='text'>自动对焦：</InputFiled>
    </div>
  )
}
```

## API

### props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| type  |  String  |  -      | input类型 |
| disabled  |  Boolean  |  -      | 禁用状态 |
| readonly  |  Boolean  |  -      | 只读状态 |
| placehodler  |  String  |  -      | 占位文本 |
| autofocus  |  Boolean  |  -      | 自动对焦 |
| clearable  |  Boolean  |  -      | 是否使用清空按钮 |
| onFocus  |  Function  |  -      | 获取焦点|
| onBlur  |  Function  |  -      | 失去焦点|
| onChange  |  Function  |  -      | 内容变化|








