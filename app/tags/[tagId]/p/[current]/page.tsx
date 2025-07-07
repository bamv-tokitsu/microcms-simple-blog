import { Metadata } from 'next';
import { getAllTagIds, getList, getTag } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: Promise<{
    tagId: string;
    current: string;
    name: string;
  }>;
};

export async function generateStaticParams() {
  const tagIds = await getAllTagIds()

  const params = await Promise.all(
    tagIds.map(async (contentId) => {
        const {totalCount} = await getList({
        limit: 0,
        filters: 'tags[contains]' + contentId,
      }) // 件数だけ取得

      const pageCount = Math.ceil(totalCount / LIMIT)

      const pageNumbers = Array.from({length: pageCount}, (_, i) => ((i + 1).toString()))

      return pageNumbers.map(current => ({
        tagId: contentId,
        current: current,
      }))
    })
  )

  return params.flat()
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { tagId } = params;
  const tag = await getTag(tagId);
  return {
    title: tag.name,
    openGraph: {
      title: tag.name,
    },
    alternates: {
      canonical: `/tags/${params.tagId}/p/${params.current}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const { tagId } = params;
  const current = parseInt(params.current as string, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
    filters: `tags[contains]${tagId}`,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} basePath={`/tags/${tagId}`} />
    </>
  );
}
