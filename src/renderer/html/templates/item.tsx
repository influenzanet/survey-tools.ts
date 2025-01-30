import { SurveyGroupItem, SurveyItem, SurveySingleItem, Validation, isSurveyGroupItem } from 'survey-engine/data_types';
import { Fragment, h } from "static-jsx";
import { RendererContext } from '../../context';
import { MetadataView, TagListView } from './metadata';
import { ExpressionView } from './expression';
import { ItemComponentView } from './components';

export interface ItemProps {
    item: SurveyItem
    context: RendererContext
}

const asItemKey = (key:string):string => {
  const k = key.lastIndexOf('.');
  if(k < 0) {
    return key;
  }
  return key.substring(k + 1);
}


export const SurveyItemView = (props: ItemProps) => {
  const ctx = props.context;
  const item = props.item;

  const itemKey = asItemKey(item.key);

  const mapping = ctx.mappingItem(itemKey);

  const renderGroupItem = (g: SurveyGroupItem) => {
      return <Fragment>
      <div class={ctx.style('group-items')}>
      {g.items.map(i => <SurveyItemView item={i} context={ctx}/>)}
      {g.selectionMethod ? (
        <div class={ctx.style("selection-method")}>
            <h5>Selection method</h5>
            <ExpressionView exp={g.selectionMethod} context={ctx}/>
        </div> 
      ) : ''}
      </div>
      </Fragment>
  }

  const renderSingleItem = (s: SurveySingleItem)=> {
    return <Fragment>
      {s.type ? <div class={ctx.style('item-type')}>Type : { s.type }</div> : ''}
    {s.components  ? (
          <div class="item-components">
          <h5>Components</h5>
          <ItemComponentView comps={s.components} context={ctx} mapping={mapping}/>
          </div>
      ) : ''
    }
    {s.confidentialMode ? <div class={ctx.style('item-confidential')}>{s.confidentialMode}</div> : ''}
    <div class="item-validations">
    <h5>Validations</h5>
      <ValidationsView validations={s.validations} context={ctx}/>
    </div>
    </Fragment>
  }

  return (
    <div class={ctx.style('survey-item')}>
        <h3><var class={ctx.style('item-key')}>{ ctx.icon("key") }{ item.key }</var></h3>
        {item.metadata ? <MetadataView meta={item.metadata} context={ctx}/> : ''}
        {item.follows ? <TagListView tags={item.follows} context={ctx}/> : ''}
        {item.condition ? (
            <div class={ctx.style("condition")}>
              <h5>Condition</h5>
              <ExpressionView exp={item.condition} context={ctx}/>
            </div>
          ) : ''
        }
        {isSurveyGroupItem(item) ? renderGroupItem(item) : ''}
        {!isSurveyGroupItem(item) ? renderSingleItem(item) : ''}
    </div>
  )
}

export interface ValidationsProps {
  validations?: Validation[]
  context: RendererContext
}


export const ValidationsView = (props: ValidationsProps) => {
  if(!props.validations) {
    return <></>;
  }
  const ctx = props.context;
  return <dl class="row">
    {props.validations.map(v => <Fragment>
        <dt class="col-2"><span class={ ctx.style("validation-key") }>{ ctx.icon("key") } {v.key}</span> <span class={props.context.style('validation-type')}>{v.type}</span></dt>
        <dd class="col-10">
          {typeof(v.rule) == "boolean" ? v.rule : <ExpressionView exp={v.rule} context={props.context}/>}
        </dd>
    </Fragment>
    )}
  </dl>
}
