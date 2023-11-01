

import { Survey } from 'survey-engine/data_types';
import { RendererContext } from '../../context';
import { Fragment, h } from "static-jsx";

interface MetadataProps {
    meta: Record<string, string>
    context: RendererContext
}

export const MetadataView = (props: MetadataProps)=> {
    const m = Object.entries(props.meta);
    if(m.length == 0) {
        return <></>;
    }
    return (
        <ul class={ props.context.style('metadata')}>
            { m.map(e => <li><var>{e[0]}</var> : "{e[1]}"</li>) }
        </ul>
    );
}

interface TagListProps {
    tags: string[]
    context: RendererContext
}

export const TagListView = (props: TagListProps)=> {
    const m = props.tags;
    if(m.length == 0) {
        return <></>;
    }
    return (
        <ul class={ props.context.style('tags')}>
            { m.map(e => <li><var>{e[0]}</var> : "{e[1]}"</li>) }
        </ul>
    );
}