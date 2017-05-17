import React , {Component}from 'react';
import Article from './Article';
import ArticleFoot from './ArticleFoot';
import PropTypes from 'prop-types';
import {fetchPost} from '../service/fetch';
// import
//加载单个文章
//通过redux 加载当前用户判断页面状态
export  default class LoadArticle extends Component {
  static propTypes = ({
    user:PropTypes.object,
    showFlashMessage:PropTypes.func,
    removeFlashMessage:PropTypes.func,
    redirect:PropTypes.func
  })
	  constructor(props){
			super(props);
			this.state={
				user:props.user,
        isCurrent:false,
        article:null
			}
		}
	  async componentDidMount(){
			  let {articleId} = this.props.match.params,
            {user} = this.props;
      let result = await fetchPost(articleId);
      console.log(result);
      if(result.code==1){
        if(user&&(user._id==result.post.article.auhor._id)){
          this.setState({
            article:result.post,
            comments:result.comments,
            isCurrent:true,
          })
        }else{
          this.setState({
            article:result.post,
            comments:result.comments,
          })
        }

      }else{

      }
		}
		render(){
   console.log(this.state.article);
   let {article,isCurrent,deleteArticle} = this.state;
			return (
				this.state.article?
      <div className="article_container">
        <section  className="article_wrap">
          <Article
            article={article}
          />
          <ArticleFoot
            articleId={article._id}
            articleId={article._id}
            isCurrent={isCurrent}
            visit={article.pv}
            time = {article.created_at}
            commentsCount={article.commentsCount}
          />
        </section>
        </div>
        :null
			)
		}
}