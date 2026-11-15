import {foldNodeProp, foldInside, indentNodeProp} from "@codemirror/language"
import {parser} from "./parser.grammar"
import {styleTags, tags as t} from "@lezer/highlight"
import {LRLanguage} from "@codemirror/language"
import {completeFromList} from "@codemirror/autocomplete"

let parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Identifier: t.variableName,
      Boolean: t.bool,
      String: t.string,
      LineComment: t.lineComment,
      "( )": t.paren
    }),
    indentNodeProp.add({
      Application: context => context.column(context.node.from) + context.unit
    }),
    foldNodeProp.add({
      Application: foldInside
    })
  ]
})

export const glsl = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: {line: "//", block: { open: "/*", close: "*/" } }
  }
})

export const glslCompletion = glsl.data.of({
  autocomplete: completeFromList([
    {label: "precision", type: "keyword"},
    {label: "const", type: "keyword"},
    {label: "uniform", type: "keyword"},
    {label: "in", type: "keyword"},
    {label: "out", type: "keyword"},
    {label: "attribute", type: "keyword"},
    {label: "varying", type: "keyword"},
    {label: "layout", type: "keyword"},
    {label: "break", type: "keyword"},
    {label: "continue", type: "keyword"},
    {label: "do", type: "keyword"},
    {label: "for", type: "keyword"},
    {label: "while", type: "keyword"},
    {label: "if", type: "keyword"},
    {label: "else", type: "keyword"},
    {label: "return", type: "keyword"},
    {label: "discard", type: "keyword"},
    {label: "struct", type: "keyword"},
    {label: "void", type: "keyword"},
    {label: "bool", type: "keyword"},
    {label: "int", type: "keyword"},
    {label: "float", type: "keyword"},
    {label: "double", type: "keyword"},
    {label: "vec2", type: "keyword"},
    {label: "vec3", type: "keyword"},
    {label: "vec4", type: "keyword"},
    {label: "ivec2", type: "keyword"},
    {label: "ivec3", type: "keyword"},
    {label: "ivec4", type: "keyword"},
    {label: "bvec2", type: "keyword"},
    {label: "bvec3", type: "keyword"},
    {label: "bvec4", type: "keyword"},
    {label: "mat2", type: "keyword"},
    {label: "mat3", type: "keyword"},
    {label: "mat4", type: "keyword"},
    {label: "sampler2d", type: "keyword"},
    {label: "samplerCube", type: "keyword"},
    {label: "sampler3D", type: "keyword"},
    {label: "centroid", type: "keyword"},
    {label: "smooth", type: "keyword"},
    {label: "flat", type: "keyword"},
    {label: "invariant", type: "keyword"},
    {label: "highhp", type: "keyword"},
    {label: "mediump", type: "keyword"},
    {label: "lowp", type: "keyword"},
  ])
})