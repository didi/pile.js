# mobile端Button组件

## 基本用法

```jsx harmony
render () {
  return (
    <div>
      <div className='doc-mt10'>
        <Button>Normal</Button>{' '}
        <Button loading>Loading</Button>{' '}
        <Button disabled>Disabled</Button>{' '}
      </div>
      <div className='doc-mt10'>
        <Button type='primary'>Normal</Button>{' '}
        <Button type='primary' loading>Loading</Button>{' '}
        <Button type='primary' disabled>Disabled</Button>{' '}
      </div>
      <div className='doc-mt10'>
        <Button type='float'>Normal</Button>{' '}
        <Button type='float' loading>Loading</Button>{' '}
        <Button type='float' disabled>Disabled</Button>{' '}
      </div>
    </div>
  )
}
```

## size

```jsx harmony
render () {
  return (
    <div>
      <Button size='small'>Small</Button>{' '}
      <Button>Normal</Button>{' '}
    </div>
  )
}
```

## block

```jsx harmony
render () {
  return (
    <div>
      <Button className='doc-mt10' className='doc-mt10' type='primary' block >Primary</Button>{' '}
      <Button block >Secondary</Button>{' '}
    </div>
  )
}
```

## disabled

```jsx harmony
render () {
  return (
    <div>
      <Button className='doc-mt10' type='primary' disabled block >Primary</Button>{' '}
      <Button disabled block >Secondary</Button>{' '}
    </div>
  )
}
```

## icon

```jsx harmony
render () {
  return (
    <div>
      <Button className='doc-mt10' type='primary' icon='check' block >Primary</Button>{' '}
      <Button icon={<Icon type='editor' />}>Editor</Button>{' '}
      <Button icon='check' disabled >Secondary</Button>{' '}
      <Button size='small' icon='check' >Secondary</Button>{' '}
    </div>
  )
}
```

## loading

```jsx harmony
render () {
  return (
    <div>
      <Button className='doc-mt10' type='primary' icon='check' loading block >Primary</Button>{' '}
      <Button loading >Secondary</Button>{' '}
      <Button size='small' loading disabled >Secondary</Button>{' '}
    </div>
  )
}
```


## href

```jsx harmony
render () {
  return (
    <div>
      <Button href='https://github.com/trending'>Normal</Button>{' '}
      <Button type='primary' href='https://github.com/trending'>Primary</Button>{' '}
    </div>
  )
}
```


## circle

```jsx harmony
render () {
  return (
    <div>
      <Button icon='message' type='primary' size='small' circle />{' '}
      <Button icon='message' type='primary' circle />{' '}
    </div>
  )
}
```

## Button.ButtonGroup

```jsx harmony
render () {
  return (
    <div>
      <Button.ButtonGroup className='doc-mt10'>
        <Button>Secondary</Button>
        <Button type='primary'>Primary</Button>
      </Button.ButtonGroup>
      <Button.ButtonGroup divide className='doc-mt10'>
        <Button>Apple</Button>
        <Button>Banana</Button>
        <Button>Pear</Button>
      </Button.ButtonGroup>
      <Button.ButtonGroup block>
        <Button>Apple</Button>
        <Button>Banana</Button>
        <Button>Pear</Button>
      </Button.ButtonGroup>
      <Button.ButtonGroup divide borderColor='#ccc' style={{marginTop: '10px', width: '300px'}}>
        <Button>取消</Button>
        <Button type='primary'>确定</Button>
      </Button.ButtonGroup>
    </div>
  )
}
```

## API

### button props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| type  |  string  |  -      | secondary/primary/float |
| size |  `small`  |  -    | 组件的大小，目前只有small值，其他暂缺失 |
| prefixCls     | string     |  pile    | 组件的className前缀 |
| block | boolean  |  false  | 块状的形式占满父级元素 |
| icon | `string` \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node) | - | 图标类 |
| loading  | boolean | false  | loading效果 |
| href  | string | -  | 以`a`标签渲染组件   |
| disabled     | boolean     |  false    | 按钮的禁用状态 |
| circle     | boolean     |  true    | 圆形按钮 |


### buttonGroup props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| block     | boolean     |  false    | 块状的形式占满父级元素 |
| divide     | boolean     |  false    | 平分父级元素 |
| vertical     | boolean     |  false    | 垂直排列 |
| borderColor     | string     |  -    | 统一button边框颜色，例如`#ccc` |
| prefixCls     | string     |  pile    | 组件的className前缀 |



