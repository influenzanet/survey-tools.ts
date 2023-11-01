# Influenzanet Survey Tools Typescript Library

This library contains some post-processig tools to work with Survey Definition (from [Survey Engine](https://github.com/influenzanet/survey-engine.ts)). It's not tools to create and manipulate survey definition, for this look at [case-editor-tools](https://github.com/coneno/case-editor-tools))

It provides :
- Survey renderer : render survey as static document (html)
- Survey checker  : check survey consistency, common bugs and conformance (WIP) 

# Installation

To use this library, add it a dependency 

```
yarn add ifn-survey-tools
```

To work on this library
```
yarn install
```

## Usage

### Survey Renderer


```ts
import { HtmlRenderer, HtmlRendererContext, BootstrapTheme   } from "ifn-survey-tools"

// Create a survey context, to tell the renderer how to render (languages to show and css theme)
const context = new HtmlRendererContext(['fr'], new BootstrapTheme());
const renderer = new HtmlRenderer();

// Considering `survey` contains your survey definition
const doc = renderer.render(survey, context);

```