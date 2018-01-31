# 问卷组件

## 依赖

1. [@dxy/cascading-list-v3](http://npm.dxy.net/package/@dxy/cascading-list-v3)

## 使用示例

```javascript
import Survey from '@dxy/pure-components/dist/survey'
// or
// import { Survey } from '@dxy/pure-components'
import { getFormItem, submit } from '@/utils/api'

new Survey({
  container: '#survey',
  get: getFormItem,
  submit: submit
})
```

### 配置

- `container`: 选填，此组件的Dom容器选择器。example: `#survey`;
- `get`: 必填，获取问卷信息的请求API，必须为`promise`或者提供类似`promise`的方法，可以通过`then`接收返回数据。
- `submit`: 必填，上传问卷数据的请求API，必须为`promise`或者提供类似`promise`的方法，可以通过`then`接收返回数据。
- `username`: 选填，提交问卷信息的用户姓名；
- `needLogin`: 选填，默认:`false`。若开启此选项，则必须填写`username`信息才可以获取问卷数据。
