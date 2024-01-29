import { Survey } from "survey-engine/data_types";
import { RenderContextOptions, RendererContext } from "../context";
import { SurveyPage } from "./templates";
import { HtmlRendererTheme } from "./theme";

export class HtmlRendererContext extends RendererContext {

    theme: HtmlRendererTheme;

    constructor(opts: RenderContextOptions, theme: HtmlRendererTheme) {
        super(opts);
        this.theme = theme;
    }

    style(name: string): string {
        return this.theme.style(name);
    }

}

export class HtmlRenderer {
    constructor() {

    }

    render(survey: Survey, context: HtmlRendererContext): string {
        const page = SurveyPage({survey:survey, context:context});
        return page.html
    }
}