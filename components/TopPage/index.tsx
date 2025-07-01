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
      <div className={styles.toparticle}>
        <ArticleList articles={data} />
      </div>

      <TagList tags={tags}/>
      
      <div className={styles.toptagarticle}>
        <ArticleList articles={tagData} />
      </div>
    </>
  )
};