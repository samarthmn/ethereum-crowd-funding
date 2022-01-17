import Head from "next/head";

type Props = {
  title?: string;
  description?: string;
};

const HtmlHead: React.FC<Props> = ({ title, description }) => {
  return (
    <Head>
      <title>Fund Labs {title && `| ${title}`}</title>
      <meta
        name="description"
        content={description ? description : "Future of crowd funding"}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HtmlHead;
