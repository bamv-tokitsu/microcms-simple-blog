import { Metadata } from 'next';
import { getDetail, client } from '@/libs/microcms';
import Article from '@/components/Article';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    dk: string;
  }>;
};

export async function generateStaticParams() {
  const data = await client.getAllContentIds({
    endpoint: 'blog',
  })
  .catch(notFound);

  return data.map((item: string) => ({
    slug: item,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getDetail(params.slug, {
    draftKey: searchParams.dk,
  });

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
  const searchParams = await props.searchParams;
  const params = await props.params;
  const data = await getDetail(params.slug, {
    draftKey: searchParams.dk,
  });

  return <Article data={data} />;
}
