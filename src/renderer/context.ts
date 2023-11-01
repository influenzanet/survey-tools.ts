


export class RendererContext {
    languages: string[]

    constructor(languages: string[]) {
        this.languages = languages;
    }

    style(name: string): string {
        return '';
    }
}

