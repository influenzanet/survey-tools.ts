


export interface RenderContextOptions {
    languages: string[];
}

export class RendererContext {
    languages: string[]

    constructor(opts:RenderContextOptions) {
        this.languages = opts.languages;
    }

    style(name: string): string {
        return '';
    }
}

