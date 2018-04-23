import { Selector } from "testcafe";
import { ReactSelector } from "testcafe-react-selectors";

fixture`AdminPage`.page("http://localhost:8080");

test("add new greeting", async t => {
  const greetingList = ReactSelector("GreetingList");
  const chart = ReactSelector("Chart svg");
  const addButton = Selector("button").withText("Add");

  // make sure greeting list exists with greetings
  await t.expect(greetingList.find("tr").count).gte(1);

  // make sure chart exists
  await t.expect(chart.exists).ok();

  await t.click(addButton);

  // now greeting composer is open...
  await t.expect(greetingList.exists).notOk();
  const greetingComposer = ReactSelector("GreetingComposer");
  await t.expect(greetingComposer.exists).ok();

  const nameInput = greetingComposer.find("[name=name]");
  const greetingInput = greetingComposer.find("[name=greeting]");

  const uniqueFakeName = "klaus" + Date.now();

  await t.typeText(nameInput, uniqueFakeName);
  await t.typeText(greetingInput, "Hello, " + uniqueFakeName);

  const saveButton = greetingComposer.find("button").withText("Save");
  await t.click(saveButton);

  // ... back on admin page nwo ...
  await t.expect(greetingList.exists).ok();
  // our new greeting should have been added
  await t.expect(greetingList.find("td").withExactText(uniqueFakeName).count).eql(1);
});
