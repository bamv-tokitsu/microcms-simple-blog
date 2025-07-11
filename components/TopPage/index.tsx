import ArticleList from '@/components/ArticleList';
import TagList from '@/components/TagList';
import { Article, Tag } from '@/libs/microcms';
import styles from './index.module.css';

type Props = {
  data?: Article[];
  tags?: Tag[];
  tagData?: Article[];
};

export default function TopPage({ data, tags, tagData } : Props){
  return (
    <>
      <a href={`/articles/`}>記事一覧</a>
      <div className={styles.toparticle}>
        <ArticleList articles={data} />
      </div>
      <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScnP7q8qWi1o2h9c9WBjP46J4W1c-7hmdYEG0_dbCS0Jecg_w/viewform?embedded=true" width="640" height="652" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
      <TagList tags={tags}/>
      
      <div className={styles.toptagarticle}>
        <ArticleList articles={tagData} />
      </div>
    </>
  )
};