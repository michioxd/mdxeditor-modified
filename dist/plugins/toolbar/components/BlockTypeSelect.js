import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $createParagraphNode } from "lexical";
import React__default from "react";
import { corePluginHooks } from "../../core/index.js";
import { Select } from "../primitives/select.js";
import { headingsPluginHooks } from "../../headings/index.js";
import { useHasPlugin } from "../../../gurx/react.js";
const BlockTypeSelect = () => {
  const convertSelectionToNode = corePluginHooks.usePublisher("convertSelectionToNode");
  const [currentBlockType] = corePluginHooks.useEmitterValues("currentBlockType");
  const hasQuote = useHasPlugin("quote");
  const hasHeadings = useHasPlugin("headings");
  if (!hasQuote && !hasHeadings) {
    return null;
  }
  const items = [{ label: "Đoạn văn", value: "paragraph" }];
  if (hasQuote) {
    items.push({ label: "Trích dẫn", value: "quote" });
  }
  if (hasHeadings) {
    const [allowedHeadingLevels] = headingsPluginHooks.useEmitterValues("allowedHeadingLevels");
    items.push(...allowedHeadingLevels.map((n) => ({ label: `Tiêu đề ${n}`, value: `h${n}` })));
  }
  return /* @__PURE__ */ React__default.createElement(
    Select,
    {
      value: currentBlockType,
      onChange: (blockType) => {
        switch (blockType) {
          case "quote":
            convertSelectionToNode(() => $createQuoteNode());
            break;
          case "paragraph":
            convertSelectionToNode(() => $createParagraphNode());
            break;
          default:
            if (blockType == "")
              ;
            else if (blockType.startsWith("h")) {
              convertSelectionToNode(() => $createHeadingNode(blockType));
            } else {
              throw new Error(`Unknown block type: ${blockType}`);
            }
        }
      },
      triggerTitle: "Chọn kiểu chữ",
      placeholder: "Kiểu chữ",
      items
    }
  );
};
export {
  BlockTypeSelect
};
