export async function selectText(wordToSelect, page) {
  const boundingBox = await page.evaluate((wordToSelect) => {
    const range = document.createRange();
    const selection = window.getSelection();

    const textNodes = document.evaluate(
      "//text()[contains(., '" + wordToSelect + "')]",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    for (let i = 0; i < textNodes.snapshotLength; i++) {
      const textNode = textNodes.snapshotItem(i);
      const nodeText = textNode.textContent;
      const startOffset = nodeText.indexOf(wordToSelect);
      const endOffset = startOffset + wordToSelect.length;

      range.setStart(textNode, startOffset);
      range.setEnd(textNode, endOffset);

      selection.removeAllRanges();
      selection.addRange(range);

      const rect = range.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        };
      }
    }
    return null;
  }, wordToSelect);

  if (boundingBox) {
    const startX = boundingBox.x;
    const startY = boundingBox.y;
    const endX = startX + boundingBox.width;
    const endY = startY + boundingBox.height;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(endX, endY);
    await page.mouse.up();
  } else {
    console.log("Word not found on the page.");
  }
}

export function slowLocator(
  page,
  delay
) {
  const locatorMethod = page.locator.bind(page);

  return (locatorArgs) => {
    const locator = locatorMethod(locatorArgs);

    locator.click = async (args) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return locatorMethod(locatorArgs).click(args);
    };

    locator.fill = async (args) => {
      const text = args.toString();
      for (const char of text) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        await locatorMethod(locatorArgs).type(char);
      }
    };

    return locator;
  };
}