import Survey from '@/components/survey'
import API from '@/utils/api'
new Survey({
  container: '#servey',
  get: () => API.getFormItem({
    sid: 103783
  }),
  submit: API.submit
})
import '@/css/free-exp.less'

