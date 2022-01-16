import Head from "next/head";

function HtmlHead({ title, description }) {
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
}

export default HtmlHead;
