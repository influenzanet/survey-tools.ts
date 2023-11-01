import { Survey } from "survey-engine/data_types";
import { RendererContext } from "../context";
import { SurveyPage } from "./templates";
import { HtmlRendererTheme } from "./theme";

export class HtmlRendererContext extends RendererContext {

    theme: HtmlRendererTheme;

    constructor(languages: string[], theme: HtmlRendererTheme) {
        super(languages);
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