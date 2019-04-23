# `@pile-ui/field`

> focus on Form layout, better combination with InputField

## Usage

```
import Field,{FieldSet} from '@pile-ui/field';
import InputFiled from '@pile-ui/inputfiled';

<FieldSet title="工作信息">
    <InputFiled placeholder="请输入工卡号" value="D03240">工卡号：</InputFiled>
    <Field arrow="right" value="企业级事业部" placeholder="请输入所在部门">所在部门：</Field>
</FieldSet>
<WhiteSpace />
<FieldSet title="其他">
    <Field align="right" extraAfter={<Switch />}>同路人信息可见：</Field>
</FieldSet>
```

## API

### Field props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| prefixCls  | string  |  'pile-field'   | 组件的css前缀 |
| children  |  any  |  -      | 表单两栏布局中，左边的label值  |
| placeholder  |  string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)  |  -      | 类似inputField的placehodler |
| value     | string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)     |  -    | 类似inputField的value |
| arrow     | boolean     |  false    | 展示右边的箭头，默认false |
| align     | 'left' \| 'right'     |  left   | value的水平对齐方式，默认left |
| onClick     | function     |  -   | 点击整条Field的onClick事件。绑定了onClick事件，会有一个点击的效果 |
| extraAfter     | string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)     |  -    | 添加在后面的额外部分 |
| labelEllipsis  | boolean  |  false   | label文字过多时，是否启用省略状态 |
| valueEllipsis  | boolean  |  true   | value文字过多时，是否启用省略状态 |

### FieldSet props

|   参数    |   类型   |   默认  |   说明     |
|-----------|----------|------------|-------------------|
| prefixCls  | string  |  'pile-fieldset'   | 组件的css前缀 |
| children  |  string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)  |  -      | 展示的内容 |
| title  | string \| [React.Node](https://flow.org/en/docs/react/types/#toc-react-node)  |  -   | 展示的title |
