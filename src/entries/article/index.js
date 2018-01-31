import '@/css/dxy-article.less'
import '@/css/article.less'
import Article from '@dxy/pure-components/dist/article'
import Comment from '@dxy/pure-components/dist/comment'

import API from '@/utils/api'

const articleId = document.querySelector('.dxy-article-container').getAttribute('data-id')

new Article({
  container: '.dxy-article-container',
  handleLike: API.likeArticle,
  shareConfig: {}
})

new Comment({
  articleId: Number(articleId),
  container: '.dxy-article-container',
  getCommentList: API.getCommentList,
  postComment: API.postComment,
  bury: API.bury,
  isLogged: true
})
