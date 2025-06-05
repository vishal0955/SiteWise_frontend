import React, {useState,useEffect} from 'react';
import { fetchTemplates, submitResponse } from '../services/api';
import DynamicForm from '../components/DynamicForm';
const UseTemplate=()=>{
  const [tpls,setTpls]=useState([]);
  const [fields,setFields]=useState([]);
  const [tid,setTid]=useState(null);
  useEffect(()=>fetchTemplates(true).then(setTpls),[]);
  return (<div>
    <select onChange={e=>{ const t=JSON.parse(e.target.value); setFields(t.fields); setTid(t._id); }}>
      <option/>
      {tpls.map(t=><option key={t._id} value={JSON.stringify(t)}>{t.name}</option>)}
    </select>
    {fields.length>0 && <DynamicForm fields={fields} onSubmit={data=>submitResponse({templateId:tid,data}).then(()=>alert('Done'))}/>}  
  </div>);
};
export default UseTemplate;