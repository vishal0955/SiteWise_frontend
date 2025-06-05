import React, { useState } from 'react';
const types = ['text','textarea','select','radio','checkbox','date','file'];
const FormBuilder = ({ onSave, onUse }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('');
  const [fields, setFields] = useState([]);
  const addField = () => setFields([...fields,{label:'',type:'text',required:false,options:[]}]);
  const upd = (i,k,v)=>{ const c=[...fields]; c[i][k]=v; setFields(c); };
  return (
  <div>
    <h2>Create Template</h2>
    <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
    <textarea placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)}/>
    <input placeholder="Category" value={cat} onChange={e=>setCat(e.target.value)}/>
    {fields.map((f,i)=>(<div key={i}>
      <input placeholder="Label" value={f.label} onChange={e=>upd(i,'label',e.target.value)}/>
      <select value={f.type} onChange={e=>upd(i,'type',e.target.value)}>{types.map(t=><option key={t}>{t}</option>)}</select>
      <label><input type="checkbox" checked={f.required} onChange={e=>upd(i,'required',e.target.checked)}/>Required</label>
      {['select','radio'].includes(f.type)&&<input placeholder="Options comma separated" value={f.options.join(',')} onChange={e=>upd(i,'options',e.target.value.split(','))}/>}    
    </div>))}
    <button onClick={addField}>Add Field</button>
    <button onClick={()=>onUse(fields)}>Use Now</button>
    <button onClick={()=>onSave({name,description:desc,category:cat,fields})}>Save Template</button>
  </div>)
};
export default FormBuilder;