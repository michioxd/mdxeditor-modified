import * as RadixPopover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import React__default from "react";
import { createCommand } from "lexical";
import CheckIcon from "../../icons/check.svg.js";
import CopyIcon from "../../icons/content_copy.svg.js";
import EditIcon from "../../icons/edit.svg.js";
import LinkOffIcon from "../../icons/link_off.svg.js";
import OpenInNewIcon from "../../icons/open_in_new.svg.js";
import classNames from "classnames";
import styles from "../../styles/ui.module.css.js";
import { corePluginHooks } from "../core/index.js";
import { linkDialogPluginHooks } from "./index.js";
import { useForm } from "react-hook-form";
import { DownshiftAutoComplete } from "../core/ui/DownshiftAutoComplete.js";
createCommand();
function LinkEditForm({ url, title, onSubmit, onCancel, linkAutocompleteSuggestions }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset: _
  } = useForm({
    values: {
      url,
      title
    }
  });
  return /* @__PURE__ */ React__default.createElement(
    "form",
    {
      onSubmit: (e) => {
        void handleSubmit(onSubmit)(e);
        e.stopPropagation();
        e.preventDefault();
      },
      onReset: onCancel,
      className: classNames(styles.multiFieldForm, styles.linkDialogEditForm)
    },
    /* @__PURE__ */ React__default.createElement("div", { className: styles.formField }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: "link-url" }, "URL"), /* @__PURE__ */ React__default.createElement(
      DownshiftAutoComplete,
      {
        initialInputValue: url,
        inputName: "url",
        suggestions: linkAutocompleteSuggestions,
        setValue,
        control,
        placeholder: "Chọn hoặc dán liên kết URL",
        autofocus: true
      }
    )),
    /* @__PURE__ */ React__default.createElement("div", { className: styles.formField }, /* @__PURE__ */ React__default.createElement("label", { htmlFor: "link-title" }, "Tiêu đề"), /* @__PURE__ */ React__default.createElement("input", { id: "link-title", className: styles.textInput, size: 40, ...register("title") })),
    /* @__PURE__ */ React__default.createElement("div", { style: { display: "flex", justifyContent: "flex-end", gap: "var(--spacing-2)" } }, /* @__PURE__ */ React__default.createElement("button", { type: "submit", title: "Set URL", "aria-label": "Set URL", className: classNames(styles.primaryButton) }, "Lưu lại"), /* @__PURE__ */ React__default.createElement("button", { type: "reset", title: "Cancel change", "aria-label": "Cancel change", className: classNames(styles.secondaryButton) }, "Huỷ"))
  );
}
const LinkDialog = () => {
  const [editorRootElementRef] = corePluginHooks.useEmitterValues("editorRootElementRef");
  const publishWindowChange = linkDialogPluginHooks.usePublisher("onWindowChange");
  const [activeEditor] = corePluginHooks.useEmitterValues("activeEditor");
  const [linkDialogState, linkAutocompleteSuggestions] = linkDialogPluginHooks.useEmitterValues(
    "linkDialogState",
    "linkAutocompleteSuggestions"
  );
  const updateLink = linkDialogPluginHooks.usePublisher("updateLink");
  const cancelLinkEdit = linkDialogPluginHooks.usePublisher("cancelLinkEdit");
  const switchFromPreviewToLinkEdit = linkDialogPluginHooks.usePublisher("switchFromPreviewToLinkEdit");
  const removeLink = linkDialogPluginHooks.usePublisher("removeLink");
  React__default.useEffect(() => {
    const update = () => {
      activeEditor == null ? void 0 : activeEditor.getEditorState().read(() => {
        publishWindowChange(true);
      });
    };
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [activeEditor, publishWindowChange]);
  const [copyUrlTooltipOpen, setCopyUrlTooltipOpen] = React__default.useState(false);
  const theRect = linkDialogState == null ? void 0 : linkDialogState.rectangle;
  const urlIsExternal = linkDialogState.type === "preview" && linkDialogState.url.startsWith("http");
  return /* @__PURE__ */ React__default.createElement(RadixPopover.Root, { open: linkDialogState.type !== "inactive" }, /* @__PURE__ */ React__default.createElement(
    RadixPopover.Anchor,
    {
      "data-visible": linkDialogState.type === "edit",
      className: styles.linkDialogAnchor,
      style: {
        top: theRect == null ? void 0 : theRect.top,
        left: theRect == null ? void 0 : theRect.left,
        width: theRect == null ? void 0 : theRect.width,
        height: theRect == null ? void 0 : theRect.height
      }
    }
  ), /* @__PURE__ */ React__default.createElement(RadixPopover.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(
    RadixPopover.Content,
    {
      className: classNames(styles.linkDialogPopoverContent),
      sideOffset: 5,
      onOpenAutoFocus: (e) => e.preventDefault(),
      key: linkDialogState.linkNodeKey
    },
    linkDialogState.type === "edit" && /* @__PURE__ */ React__default.createElement(
      LinkEditForm,
      {
        url: linkDialogState.url,
        title: linkDialogState.title,
        onSubmit: updateLink,
        onCancel: cancelLinkEdit.bind(null, true),
        linkAutocompleteSuggestions
      }
    ),
    linkDialogState.type === "preview" && /* @__PURE__ */ React__default.createElement(React__default.Fragment, null, /* @__PURE__ */ React__default.createElement(
      "a",
      {
        className: styles.linkDialogPreviewAnchor,
        href: linkDialogState.url,
        ...urlIsExternal ? { target: "_blank", rel: "noreferrer" } : {},
        title: urlIsExternal ? `Open ${linkDialogState.url} in new window` : linkDialogState.url
      },
      /* @__PURE__ */ React__default.createElement("span", null, linkDialogState.url),
      urlIsExternal && /* @__PURE__ */ React__default.createElement(OpenInNewIcon, null)
    ), /* @__PURE__ */ React__default.createElement(ActionButton, { onClick: () => switchFromPreviewToLinkEdit(true), title: "Edit link URL", "aria-label": "Edit link URL" }, /* @__PURE__ */ React__default.createElement(EditIcon, null)), /* @__PURE__ */ React__default.createElement(Tooltip.Provider, null, /* @__PURE__ */ React__default.createElement(Tooltip.Root, { open: copyUrlTooltipOpen }, /* @__PURE__ */ React__default.createElement(Tooltip.Trigger, { asChild: true }, /* @__PURE__ */ React__default.createElement(
      ActionButton,
      {
        title: "Sao chép URL",
        "aria-label": "Sao chép URL",
        onClick: () => {
          void window.navigator.clipboard.writeText(linkDialogState.url).then(() => {
            setCopyUrlTooltipOpen(true);
            setTimeout(() => setCopyUrlTooltipOpen(false), 1e3);
          });
        }
      },
      copyUrlTooltipOpen ? /* @__PURE__ */ React__default.createElement(CheckIcon, null) : /* @__PURE__ */ React__default.createElement(CopyIcon, null)
    )), /* @__PURE__ */ React__default.createElement(Tooltip.Portal, { container: editorRootElementRef == null ? void 0 : editorRootElementRef.current }, /* @__PURE__ */ React__default.createElement(Tooltip.Content, { className: classNames(styles.tooltipContent), sideOffset: 5 }, "Đã sao chép!", /* @__PURE__ */ React__default.createElement(Tooltip.Arrow, null))))), /* @__PURE__ */ React__default.createElement(ActionButton, { title: "Xoá liên kết", "aria-label": "Xoá liên kết", onClick: () => removeLink(true) }, /* @__PURE__ */ React__default.createElement(LinkOffIcon, null)))
  )));
};
const ActionButton = React__default.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ React__default.createElement("button", { className: classNames(styles.actionButton, className), ref, ...props });
});
export {
  LinkDialog,
  LinkEditForm
};
