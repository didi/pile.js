# Field组件
> 专注于Form表单排版，与InputFiled组合效果更佳。

## 使用场景

* Form表单布局
* 列表页面展示

## 基本用法

```jsx harmony
render () {
  const icon = <div><Icon className='p10' type='coin-rmb' />100</div>
  return (
    <div>
      <FieldSet title="工作信息">
        <InputFiled placeholder="请输入工卡号" value="">工卡号：</InputFiled>
        <Field arrow
          value=""
          placeholder="请输入所在部门"
          onClick={(val, e)=>{ console.log('onClick:', val)}}
        >所在部门：</Field>
      </FieldSet>
      <FieldSet title="其他">
          <Field
            arrow
            align="right"
            value={icon}>金额：</Field>
          <Field align="right" extraAfter={<Switch />}>同路人信息可见：</Field>
      </FieldSet>
      <FieldSet title="省略label">
          <Field
            align="right"
            labelEllipsis
            value={icon}>可选水果列表：</Field>
          <Field
            align="right"
            valueEllipsis={false}
            value='水果，是指多汁且主要味觉为甜味和酸味，可食用的植物果实。水果不但含有丰富的营养，而且能够促进消化。'>水果：</Field>
      </FieldSet>
    </div>
  )
}
```

## API

### Field props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| prefixCls  | string  |  'pile-filed'   | 组件的css前缀 |
| children  |  any  |  -      | 表单两栏布局中，左边的label值  |
| placeholder  |  string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)  |  -      | 类似inputFiled的placehodler |
| value     | string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)     |  -    | 类似inputFiled的value |
| arrow     | boolean     |  false    | 展示右边的箭头，默认false |
| align     | 'left' \| 'right'     |  left   | value的水平对齐方式，默认left |
| onClick     | function     |  -   | 点击整条Filed的onClick事件。绑定了onClick事件，会有一个点击的效果 |
| extraAfter     | string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)     |  -    | 添加在后面的额外部分 |
| labelEllipsis  | boolean  |  false   | label文字过多时，是否启用省略状态 |
| valueEllipsis  | boolean  |  true   | value文字过多时，是否启用省略状态 |


### FieldSet props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| prefixCls  | string  |  'pile-filedset'   | 组件的css前缀 |
| children  |  string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)  |  -      | 展示的内容 |
| title  | string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)  |  -   | 展示的title |
