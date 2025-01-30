import { RawHtml } from "static-jsx";
import { SurveyMapping, QuestionMapping } from "./mapping";

export interface RenderContextOptions {
    languages: string[];
    mapping?: SurveyMapping;
}

interface Stringable {
    toString(): string
}

export class RendererContext {
    languages: string[]

    mapping?: SurveyMapping

    constructor(opts:RenderContextOptions) {
        this.languages = opts.languages;
    }

    style(name: string): string {
        return '';
    }

    icon(name: string): Stringable {
        return '';
    }

    mappingItem(name: string): QuestionMapping|undefined {
        if(!this.mapping) {
            return undefined;
        }
        return this.mapping.get(name);
    }
}

