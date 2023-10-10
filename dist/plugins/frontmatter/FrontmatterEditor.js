import * as Dialog from "@radix-ui/react-dialog";
import classNames from "classnames";
import YamlParser from "js-yaml";
import React__default from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { frontmatterPluginHooks } from "./index.js";
import CloseIcon from "../../icons/close.svg.js";
import DeleteIcon from "../../icons/delete.svg.js";
import styles from "../../styles/ui.module.css.js";
import { corePluginHooks } from "../core/index.js";
const FrontmatterEditor = ({ yaml, onChange }) => {
  const [readOnly, editorRootElementRef] = corePluginHooks.useEmitterValues("readOnly", "editorRootElementRef");
  const [frontmatterDialogOpen] = frontmatterPluginHooks.useEmitterValues("frontmatterDialogOpen");
  const setFrontmatterDialogOpen = frontmatterPluginHooks.usePublisher("frontmatterDialogOpen");
  const removeFrontmatter = frontmatterPluginHooks.usePublisher("removeFrontmatter");
  const yamlConfig = React__default.useMemo(() => {
    if (!yaml) {
      return [];
    }
    return Object.entries(YamlParser.load(yaml)).map(([key, value]) => ({ key, value }));
  }, [yaml]);
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      yamlConfig
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "yamlConfig"
  });
  const onSubmit = React__default.useCallback(
    ({ yamlConfig: yamlConfig2 }) => {
      if (yamlConfig2.length === 0) {
        removeFrontmatter(true);
        setFrontmatterDialogOpen(false);
        return;
      }
      const yaml2 = yamlConfig2.reduce((acc, { key, value }) => {
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {});
      onChange(YamlParser.dump(yaml2).trim());
      setFrontmatterDialogOpen(false);
    },
    [onChange, setFrontmatterDialogOpen, removeFrontmatter]
  );
  return /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(Dialog.Root, { open: frontmatterDialogOpen, onOpenChange: (open) => setFrontmatterDialogOpen(open) }, /* @__PURE__ */ React__default.createElement(Dialog.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(Dialog.Overlay, { className: styles.dialogOverlay }), /* @__PURE__ */ React__default.createElement(Dialog.Content, { className: styles.largeDialogContent, "data-editor-type": "frontmatter" }, /* @__PURE__ */ React__default.createElement(Dialog.Title, { className: styles.dialogTitle }, "Edit document frontmatter"), /* @__PURE__ */ React__default.createElement(
    "form",
    {
      onSubmit: (e) => {
        void handleSubmit(onSubmit)(e);
        e.stopPropagation();
      },
      onReset: () => setFrontmatterDialogOpen(false)
    },
    /* @__PURE__ */ React__default.createElement("table", { className: styles.propertyEditorTable }, /* @__PURE__ */ React__default.createElement("colgroup", null, /* @__PURE__ */ React__default.createElement("col", null), /* @__PURE__ */ React__default.createElement("col", null), /* @__PURE__ */ React__default.createElement("col", null)), /* @__PURE__ */ React__default.createElement("thead", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("th", null, "Key"), /* @__PURE__ */ React__default.createElement("th", null, "Value"), /* @__PURE__ */ React__default.createElement("th", null))), /* @__PURE__ */ React__default.createElement("tbody", null, fields.map((item, index) => {
      return /* @__PURE__ */ React__default.createElement("tr", { key: item.id }, /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement(TableInput, { ...register(`yamlConfig.${index}.key`, { required: true }), autofocusIfEmpty: true, readOnly })), /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement(TableInput, { ...register(`yamlConfig.${index}.value`, { required: true }), readOnly })), /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement("button", { type: "button", onClick: () => remove(index), className: styles.iconButton, disabled: readOnly }, /* @__PURE__ */ React__default.createElement(DeleteIcon, null))));
    })), /* @__PURE__ */ React__default.createElement("tfoot", null, /* @__PURE__ */ React__default.createElement("tr", null, /* @__PURE__ */ React__default.createElement("td", null, /* @__PURE__ */ React__default.createElement(
      "button",
      {
        disabled: readOnly,
        className: classNames(styles.primaryButton, styles.smallButton),
        type: "button",
        onClick: () => {
          append({ key: "", value: "" });
        }
      },
      "Add entry"
    ))))),
    /* @__PURE__ */ React__default.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: "var(--spacing-2)" } }, /* @__PURE__ */ React__default.createElement("button", { type: "submit", className: styles.primaryButton }, "Save"), /* @__PURE__ */ React__default.createElement("button", { type: "reset", className: styles.secondaryButton }, "Cancel"))
  ), /* @__PURE__ */ React__default.createElement(Dialog.Close, { asChild: true }, /* @__PURE__ */ React__default.createElement("button", { className: styles.dialogCloseButton, "aria-label": "Close" }, /* @__PURE__ */ React__default.createElement(CloseIcon, null)))))));
};
const TableInput = React__default.forwardRef(({ className, autofocusIfEmpty: _, ...props }, ref) => {
  return /* @__PURE__ */ React__default.createElement("input", { className: classNames(styles.propertyEditorInput, className), ...props, ref });
});
export {
  FrontmatterEditor
};
