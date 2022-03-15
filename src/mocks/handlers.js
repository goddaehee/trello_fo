import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://jsonplaceholder.typicode.com/posts/100",
    async (req, res, ctx) => {
      const data = await ctx.fetch(req);
      return res(
        ctx.json({
          ...data,
          title: "Title has been mocked",
        })
      );
    }
  ),
];
