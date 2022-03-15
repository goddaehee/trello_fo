import { rest } from "msw";

const MswTest = () => {
  rest.get("https://api.server.com/user", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1234,
        id: 101,
        title: "Hello MSW!",
        body: "This is mocked response by handlers.ts",
        jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      })
    );
  });
};

export default MswTest;
