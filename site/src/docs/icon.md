# mobile端Icon组件

## 基本用法

```jsx harmony
render () {
  return (
    <div>
      <Icon className='p10' type='arrow-left' />{' '}
      <Icon className='p10' type='arrow-right' />{' '}
      <Icon className='p10' type='check-circle' />{' '}
      <Icon className='p10' type='check-solid-circle' />{' '}
      <Icon className='p10' type='check' />{' '}
      <Icon className='p10' type='coin-rmb' />{' '}
      <Icon className='p10' type='delete' />{' '}
      <Icon className='p10' type='download' />{' '}
      <Icon className='p10' type='editor' />{' '}
      <Icon className='p10' type='error-circle' />{' '}
      <Icon className='p10' type='error-solid-circle' />{' '}
      <Icon className='p10' type='error' />{' '}
      <Icon className='p10' type='information' />{' '}
      <Icon className='p10' type='loading-snaker' />{' '}
      <Icon className='p10' type='loading' />{' '}
      <Icon className='p10' type='location' />{' '}
      <Icon className='p10' type='lock' />{' '}
      <Icon className='p10' type='message' />{' '}
      <Icon className='p10' type='minus-square' />{' '}
      <Icon className='p10' type='minus' />{' '}
      <Icon className='p10' type='phone' />{' '}
      <Icon className='p10' type='plus-square' />{' '}
      <Icon className='p10' type='plus' />{' '}
      <Icon className='p10' type='print' />{' '}
      <Icon className='p10' type='search' />{' '}
      <Icon className='p10' type='star' />{' '}
      <Icon className='p10' type='time' />{' '}
      <Icon className='p10' type='user' />{' '}
      <Icon className='p10' type='warnning-solid-circle' />{' '}
      <Icon className='p10' type='warnning' />{' '}
    </div>
  )
}
```

## size

```jsx harmony
render () {
  return (
    <div>
      <Icon type='check-circle' size='small' />{' '}
      <Icon type='check-circle' />{' '}
      <Icon type='check-circle' size='large' />{' '}
      <Icon type='check-circle' style={{fontSize: '40px'}} />{' '}
    </div>
  )
}
```


## API

### props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| type  |  string  |  -      | one of [arrow-left, arrow-right, ... , icon-warnning]  |
| size  |  string  |  -      | small/large，small: 12px，large: 24px; |
| prefixCls     | string     |  pile    | 组件的className前缀 |
