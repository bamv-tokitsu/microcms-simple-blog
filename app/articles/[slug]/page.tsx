import { Metadata } from 'next';
import { getDetail, getBlogIds } from '@/libs/microcms';
import Article from '@/components/Article';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const contentIds = await getBlogIds();

  return contentIds.map((id: string) => ({ slug: id }));
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const data = await getDetail(params.slug);

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [data?.thumbnail?.url || ''],
    },
    alternates: {
      canonical: `/articles/${params.slug}`,
    },
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const data = await getDetail(params.slug);

  return <Article data={data} />;
}
