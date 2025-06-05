import React, { useState } from 'react';
const DynamicForm = ({ fields, onSubmit }) => {
  const [data, setData] = useState({});
  const handle = (e, label) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(prev => ({ ...prev, [label]: val }));
  };
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(data); }}>
      {fields.map((f,i)=>(
        <div key={i} className="mb-4">
          <label>{f.label}{f.required?'*':''}</label>
          {f.type==='textarea'?<textarea required={f.required} onChange={e=>handle(e,f.label)}/>:f.type==='select'?<select required={f.required} onChange={e=>handle(e,f.label)}><option/> {f.options.map((o,j)=><option key={j}>{o}</option>)}</select>:<input type={f.type} required={f.required} onChange={e=>handle(e,f.label)}/>}        
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
export default DynamicForm