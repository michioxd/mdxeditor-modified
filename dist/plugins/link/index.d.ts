import type { Options } from 'mdast-util-to-markdown';
import type { Config } from 'mdast-util-from-markdown/lib';
import type { Extension } from 'micromark-util-types';
import type { Content } from 'mdast';
import type { MdastImportVisitor, LexicalVisitor } from '../..';
import type { EditorSubscription, EditorInFocus, BlockType } from '../core';
import type { InitialEditorStateType } from '@lexical/react/LexicalComposer';
import type { JsxComponentDescriptor } from '../jsx';
import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin';
import type { LexicalEditor, RangeSelection, Klass, LexicalNode, TextFormatType, ElementNode, DecoratorNode } from 'lexical';
import type { PluginConstructor, SystemSpec, Realm, RealmNode } from '../../gurx';
import React from 'react';
import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin.js';
/**
 * The parameters used to configure the link plugin
 */
interface LinkPluginParams {
    /**
     * An optional function to validate the URL of a link.
     * By default, no validation is performed.
     */
    validateUrl?: React.ComponentProps<typeof LexicalLinkPlugin>['validateUrl'];
    /**
     * Whether to disable the auto-linking of URLs and email addresses.
     * @default false
     */
    disableAutoLink?: boolean;
}
/**
 * @internal
 */
export declare const linkPlugin: PluginConstructor<SystemSpec<[SystemSpec<[], (r: Realm) => {
    activeEditor: RealmNode<LexicalEditor | null>;
    inFocus: RealmNode<boolean>;
    historyState: RealmNode<HistoryState>;
    currentSelection: RealmNode<RangeSelection | null>;
    jsxIsAvailable: RealmNode<boolean>;
    jsxComponentDescriptors: RealmNode<JsxComponentDescriptor[]>;
    initialRootEditorState: RealmNode<InitialEditorStateType>;
    rootEditor: RealmNode<LexicalEditor | null>;
    createRootEditorSubscription: RealmNode<EditorSubscription>;
    createActiveEditorSubscription: RealmNode<EditorSubscription>;
    importVisitors: RealmNode<MdastImportVisitor<Content>[]>;
    syntaxExtensions: RealmNode<Extension[]>;
    mdastExtensions: RealmNode<(Partial<Config> | Partial<Config>[])[] | null | undefined>;
    usedLexicalNodes: RealmNode<Klass<LexicalNode>[]>;
    addImportVisitor: RealmNode<MdastImportVisitor<Content>>;
    addLexicalNode: RealmNode<Klass<LexicalNode>>;
    addSyntaxExtension: RealmNode<Extension>;
    addMdastExtension: RealmNode<Partial<Config> | Partial<Config>[]>;
    toMarkdownExtensions: RealmNode<Options[]>;
    toMarkdownOptions: RealmNode<Options>;
    addToMarkdownExtension: RealmNode<Options>;
    addExportVisitor: RealmNode<LexicalVisitor>;
    exportVisitors: RealmNode<LexicalVisitor[]>;
    initialMarkdown: RealmNode<string>;
    setMarkdown: RealmNode<string>;
    markdown: RealmNode<string>;
    editorRootElementRef: RealmNode<React.RefObject<HTMLDivElement> | null>;
    contentEditableClassName: RealmNode<string>;
    placeholder: RealmNode<React.ReactNode>;
    autoFocus: RealmNode<boolean | {
        defaultSelection?: "rootStart" | "rootEnd" | undefined;
        preventScroll?: boolean | undefined;
    }>;
    readOnly: RealmNode<boolean>;
    composerChildren: RealmNode<React.ComponentType<{}>[]>;
    addComposerChild: RealmNode<React.ComponentType<{}>>;
    topAreaChildren: RealmNode<React.ComponentType<{}>[]>;
    addTopAreaChild: RealmNode<React.ComponentType<{}>>;
    nestedEditorChildren: RealmNode<React.ComponentType<{}>[]>;
    addNestedEditorChild: RealmNode<React.ComponentType<{}>>;
    editorWrappers: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>[]>;
    addEditorWrapper: RealmNode<React.ComponentType<{
        children: React.ReactNode;
    }>>;
    currentFormat: RealmNode<number>;
    editorInFocus: RealmNode<EditorInFocus | null>;
    applyFormat: RealmNode<TextFormatType>;
    currentBlockType: RealmNode<BlockType>;
    applyBlockType: RealmNode<BlockType>;
    convertSelectionToNode: RealmNode<() => ElementNode>;
    insertDecoratorNode: RealmNode<() => DecoratorNode<unknown>>;
    onBlur: RealmNode<FocusEvent>;
}>], (r: Realm) => {
    disableAutoLink: RealmNode<boolean>;
}>, LinkPluginParams>;
export {};
