import { RawHtml } from "static-jsx"

export interface HtmlRendererTheme {
    head(): RawHtml
    style(name: string): string
    icon(name:string): RawHtml
}