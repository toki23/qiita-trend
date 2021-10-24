import { Select } from "https://deno.land/x/cliffy/prompt/select.ts";
import { open } from "https://deno.land/x/opener/mod.ts";
const trendAPI = "https://qiita-api.netlify.app/.netlify/functions/trend";

const response: Response = await fetch(trendAPI);
const trend: Record<string, Record<string, string>>[] = await response.json();

const titleAndURLs = trend.map((article) => {
  return {
    name: article.node.title,
    value: article.node.linkUrl,
  };
});

const selectedArticleURL: string = await Select.prompt({
  message: "記事の一覧",
  options: titleAndURLs,
});

await open(selectedArticleURL);
