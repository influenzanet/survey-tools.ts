/**
 * Variable Mapping
 * Variable mapping is a way to provide external annotations about question about how data are handled.
 * It's possible to provide a db_name (name to store the question response in db), name : variable name in the analysis
 */


export type MappingSpec = Record<string, SurveyMappingSpec>;

export type SurveyMappingSpec = Record<string, QuestionMappingSpec>;

interface QuestionMappingSpec {
    variables: VariableMappgingSpec[];
}

export interface VariableMappgingSpec {
    // Selectors : describe how to find the item component described by the variable
    question: string;
    response?: string;
    row?: string;
    column?:string;
    open?: boolean;
    // Annotations
    variable: string; // Name of the variable used in analysis
    db_name: string; // database name
    recodes?: Record<string, string> // Value Recoding provided as label (explicit name) => value (response key)
}

export class SurveyMapping {
    questions: Map<string, QuestionMapping>;

    constructor(spec: SurveyMappingSpec) {
        this.questions = new Map();
        Object.entries(spec).forEach(v => {
            const [id, def] = v;
            const q = new QuestionMapping(def);
            this.questions.set(id, q);
        });
    }

    get(name: string): QuestionMapping | undefined {
        return this.questions.get(name);
    }
}

type VariablefilterFunc = (v:VariableMappgingSpec)=>boolean;

export class QuestionMapping {
    variables: VariableMappgingSpec[];
    
    constructor(spec: QuestionMappingSpec) {
        this.variables = spec.variables;
    } 

    getVariable(index: number): VariableMapping | undefined {
        if(this.variables.length) {
            return new VariableMapping(this.variables[index]);
        }
        return undefined;
    }

    getVariablesWithResponse(responseKey?: string) : VariableMapping[] {
        if(!responseKey) {
            return [];
        }
        return this.variables.filter(v => v.response === responseKey).map(v => new VariableMapping(v));
    }

    getVariables(filter?: VariablefilterFunc): VariableMapping[] {
        const vv = filter ? this.variables.filter(filter) : this.variables;
        return vv.map(v => new VariableMapping(v));
    }
}

export class VariableMapping {
    spec:     VariableMappgingSpec

    constructor(spec: VariableMappgingSpec) {
        this.spec = spec;
    }

    database(): string {
        return this.spec.db_name;
    }

    variable(): string {
        return this.spec.variable;
    }

    /**
     * Find a recoding label from a response key (key of an option component for example)
     * @param key response key to find in recoding
     * @returns 
     */
    recodeLabel(key: string): string {
        if(!key) {
            return '';
        }
        if(!this.spec.recodes) {
            return '';
        }
        const r = Object.entries(this.spec.recodes).find(v => v[1] == key);
        if(!r) {
            return '';
        }
        // Return the label (key of the recodes record)
        return r[0];
    }

}

