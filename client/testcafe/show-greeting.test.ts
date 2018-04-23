import { Selector } from "testcafe";
import { ReactSelector } from "testcafe-react-selectors";

fixture`DisplayPage`.page("http://localhost:8080/greet/7");

test("show an existing greeting", async t => {
  const greetingDisplay = ReactSelector("GreetingDisplay h1");
  await t.expect(greetingDisplay.textContent).eql("Happy Birthday");
});
