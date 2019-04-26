# form的validator(校验器)

## 使用场景
表单提交时，需要校验数据的场景，例如登录，注册等模块


## 基本用法

```jsx harmony
state = {
  showError1:false,
  showError2: false,
  showError3: false,
  nickname: '',
  phone: '',
  email: ''
}

onSubmit = () => {
  const {nickname, phone, email} = this.state;

  if (!this.v1.checker(nickname).valid) {
    this.setState({showError1: true})
  }
  if (!this.v2.checker(phone).valid) {
    this.setState({showError2: true})
  }
  if (!this.v3.checker(email).valid) {
    this.setState({showError3: true})
  }

  console.log('onSubmit:', this.v1)
}

render () {
  console.log('doc showError2:', this.state.showError2)
  return (
    <div>
      <Validator
        ref={(v)=> this.v1 = v}
        showError={this.state.showError1}
        onChange={(nickname, {valid})=> this.setState({nickname, showError1: !valid}) }
        rules={[
          {pattern: /^[0-9a-zA-Z_]{4,8}$/, message: '请输入有效的昵称', nativeAttrs:{maxLength: 8}}
        ]}
      >
      {
        ({value, setValue, ...bind})=> <InputFiled {...bind} value={value} placeholder='4~8位数字、下划线、字母组合' onChange={(v)=> setValue(v)}>昵称：</InputFiled>
      }
      </Validator>
      <Validator
        ref={(v)=> this.v2 = v}
        showError={this.state.showError2}
        onChange={(phone, {valid})=> this.setState({phone,showError2: !valid}) }
        rules={[{type: 'phone', message: '请填写合法的手机号'}]}
      >
      {
        ({value, setValue, ...bind})=> <InputFiled {...bind} value={value} placeholder='请输入电话' onChange={(v)=> setValue(v)}>电话：</InputFiled>
      }
      </Validator>
      <Validator
        ref={(v)=> this.v3 = v}
        showError={this.state.showError3}
        onChange={(email, {valid})=> this.setState({email, showError3: !valid}) }
        rules={[{type: 'email', message: '请填写合法的邮箱'}]}
      >
      {
        ({value, setValue, ...bind})=> <InputFiled {...bind} value={value} placeholder='请输入邮箱' onChange={(v)=> setValue(v)}>邮箱：</InputFiled>
      }
      </Validator>
      <Button onClick={this.onSubmit} className='doc-mt10' type='primary'>验证</Button>
    </div>
  )
}
```


## API

### props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| showError  |  bool  |  false      | show Error info  |
| children  |  function  |  -      | ({value, setValue, ...bind})=> {} |
| rules     | array     |  []    | more info, look Rule Props |
| initial     | any     |  ''    | initial value |
| onChange     | function     |  noop   | value change, callback function |

### children props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| value  |  any  |  ''      | Your `value` state value  |
| setValue  |  function  |  -      | Arbitrary set a value to `value` state |
| bind     | object     |  {}    | Bind to the property on the dom native tag  |

### rule props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| type  |  string  |  -      | Built-in types, one of `phone` \| `email` \| `number`  |
| isRequired  |  boolean  |  -      | Required or not |
| range     | array     |  -    | 设置范围区间值，也可以单个设置 |
| length     | number     |  -    | 限定匹配的个数 |
| pattern     | regexp     |  -   | 匹配的模式，有效的正则表达式，例如：{pattern: /[0-9a-zA-Z_]{4,10}/, message: '名称由4~10位数字、字母或下划线组成'} |
| message     | reactElement \| string     |  -    | 展示的消息信息 |
| validator     | function     |  -    | 自定义的验证器,例如：{validator: (value, rules)=>{ if (this.state.password !== value) { return '密码不一致，请重新输入'}}} |
| nativeAttrs     | object     |  -    | 自定义的原生dom属性，透传给bind对象的，例如：{maxLength: 8}，表示最大长度为8 |


