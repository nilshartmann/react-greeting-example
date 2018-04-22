import { Selector } from "testcafe";

fixture`DisplayPage`.page("localhost:8080/greet/7");

test("show an existing greeting", async t => {
  const s = Selector("h1");

  await t.expect(s.exists).ok;
});
