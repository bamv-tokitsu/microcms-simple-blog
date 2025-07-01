import { getList, getTagList } from '@/libs/microcms';
import { TOP_LIMIT, TOP_TAG_LIMIT } from '@/constants';
import TopPage from '@/components/TopPage';

export default async function Page() {
  const data = await getList({
    limit: TOP_LIMIT,
    orders: '-publishedAt',
  });
  const tags = await getTagList();
  const tagData = await getList({
    limit: TOP_TAG_LIMIT,
    filters: 'tags[contains]ujk20bwojib',
    orders: '-publishedAt',
  });
  return (
    <>
      <TopPage 
        data={data.contents}
        tags={tags.contents}
        tagData={tagData.contents}
      />
    </>
  );
}
