# mobile端Radio组件

## Radio 基本用法

```jsx harmony
state = {
  value: 0
}
onChange = (v) => {
  this.setState({
    value:v
  })
  console.log('onChange===>', v)
}
render () {
  return (
    <div>
      <Radio name='onlyR' value='1' checked={1 == this.state.value} onChange={this.onChange}>选项1</Radio>
    </div>
  )
}
```


## RadioGroup 基本用法

```jsx harmony
render () {
	var onChange = (v) => console.log('onChange===>', v)
  return (
    <div>
      <Radio.RadioGroup name='nooptR' disabled={false} defaultValue={2} onChange={onChange} >
      	<Radio value='1' disabled>选项1</Radio>
      	<Radio value='2'>选项2</Radio>
      	<Radio value='3'>选项3</Radio>
      </Radio.RadioGroup>
    </div>
  )
}
```


## 配置options用法, vertical属性设置垂直布局

```jsx harmony
render () {
	var options = [
	{value: 1, label: '选项1'}, 
	{value: 2, label: '选项2'},
	{value: 3, label: '选项3'}, ]
	var onChange = (v) => console.log('options---onChange===>', v)
  return (
    <div style={{width: '300px'}}>
      <Radio.RadioGroup vertical={true} name='optR' options={options} disabled={false} defaultValue={1} onChange={onChange} >
      </Radio.RadioGroup>
    </div>
  )
}
```

## API

### Radio

#### props


|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| name  |  string  |  -      | 必填，同原生input标签的name |
| checked  |  boolean  |  false      | 是否选中 |
| value  |  string，number  |  -      | 选中之后的值 |
| disabled     | boolean |  false    | 是否禁用 |
| vertical     | boolean |  false    | 是否开启垂直布局 |
| onChange     | function |  -    | 选中回调函数，参数为选中radio的value值 |


### RadioGroup

#### props


|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| name  |  string  |  -      | 必填，同原生input标签的name，会给RadioGroup包裹的每个Radio都加同一个name |
| options  |  object  |  -      | 需要配置的radio。value：radio值；label：radio文案；disabled: 是否禁用 |
| defaultValue  |  string，number  |  -      | 默认选中的radio值 |
| disabled     | boolean |  false    | 是否禁用全部radio |
| vertical     | boolean |  false    | 是否开启垂直布局 |
| onChange     | function |  -    | 选中回调函数，参数为选中radio的value值 |

