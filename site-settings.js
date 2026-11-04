/* Offline settings and portable ZIP export. No upload, dependency or backend. */
(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./site-engine.js') : root.CarolSite);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else { root.CarolSettings = api; api.connect(); }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (engine) {
  'use strict';
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const crcTable = Array.from({length:256},(_,i)=>{let c=i;for(let j=0;j<8;j++) c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
  const crc32 = data => {let c=0xffffffff;for(const byte of data)c=crcTable[(c^byte)&255]^(c>>>8);return (c^0xffffffff)>>>0;};

  function zip(files) {
    if (files.size > 65535) throw new Error('Too many files for this export.');
    const chunks=[],central=[];
    let offset=0,centralSize=0;
    const now=new Date(), year=Math.max(1980,Math.min(2107,now.getFullYear()));
    const dosTime=(now.getHours()<<11)|(now.getMinutes()<<5)|(now.getSeconds()>>1);
    const dosDate=((year-1980)<<9)|((now.getMonth()+1)<<5)|now.getDate();
    for (const [name,bytes] of files) {
      if (!/^(?:\.nojekyll|[A-Za-z0-9][A-Za-z0-9._-]*)$/.test(name)) throw new Error('Only flat website filenames are supported.');
      const filename=encoder.encode(name),checksum=crc32(bytes);
      const local=new Uint8Array(30+filename.length),lv=new DataView(local.buffer);
      lv.setUint32(0,0x04034b50,true);lv.setUint16(4,20,true);lv.setUint16(6,0x0800,true);lv.setUint16(8,0,true);
      lv.setUint16(10,dosTime,true);lv.setUint16(12,dosDate,true);lv.setUint32(14,checksum,true);lv.setUint32(18,bytes.length,true);lv.setUint32(22,bytes.length,true);lv.setUint16(26,filename.length,true);local.set(filename,30);
      const entry=new Uint8Array(46+filename.length),cv=new DataView(entry.buffer);
      cv.setUint32(0,0x02014b50,true);cv.setUint16(4,20,true);cv.setUint16(6,20,true);cv.setUint16(8,0x0800,true);cv.setUint16(10,0,true);
      cv.setUint16(12,dosTime,true);cv.setUint16(14,dosDate,true);cv.setUint32(16,checksum,true);cv.setUint32(20,bytes.length,true);cv.setUint32(24,bytes.length,true);cv.setUint16(28,filename.length,true);cv.setUint32(42,offset,true);entry.set(filename,46);
      chunks.push(local,bytes);central.push(entry);offset+=local.length+bytes.length;centralSize+=entry.length;
    }
    const end=new Uint8Array(22),ev=new DataView(end.buffer);
    ev.setUint32(0,0x06054b50,true);ev.setUint16(8,files.size,true);ev.setUint16(10,files.size,true);ev.setUint32(12,centralSize,true);ev.setUint32(16,offset,true);
    return new Blob([...chunks,...central,end],{type:'application/zip'});
  }

  function readJSON(files,name) {
    if (!files.has(name)) throw new Error('Missing '+name+'. Select the complete extracted website folder.');
    try { return JSON.parse(decoder.decode(files.get(name))); } catch { throw new Error(name+' is not valid JSON. Restore it from the original download.'); }
  }

  function prepare(files, changes) {
    const current=readJSON(files,'business-profile.json');
    const profile=engine.validateProfile({...current,...changes});
    const pageIndex=readJSON(files,'page-index.json');
    const index=readJSON(files,'site-files.json');
    if (index.id!==profile.id || !Array.isArray(index.files) || !Array.isArray(pageIndex)) throw new Error('The website file index is not valid.');
    const output=new Map();
    for (const name of index.files) {
      if (!/^(?:\.nojekyll|[A-Za-z0-9][A-Za-z0-9._-]*)$/.test(name)) throw new Error('The file index contains a nested or unsafe filename.');
      if (name!=='.nojekyll' && !files.has(name)) throw new Error('Missing '+name+'. Select the complete extracted website folder.');
      output.set(name,files.get(name)||new Uint8Array());
    }
    for (const page of pageIndex) {
      if (!output.has(page.file)) throw new Error('A page is missing: '+page.file);
      const html=decoder.decode(output.get(page.file));
      if (!html.includes('data-carol-site="carol-language-courses-tripoli"')) throw new Error('Unrecognized page: '+page.file);
      output.set(page.file,encoder.encode(engine.patchPage(html,page,profile)));
    }
    const replacements={
      'business-profile.json':engine.json(profile)+'\n',
      'sitemap.xml':engine.sitemap(pageIndex,profile),
      'robots.txt':engine.robots(profile),
      'llms.txt':engine.llms(pageIndex,profile),
      'site.webmanifest':engine.manifest(profile)
    };
    for(const [name,text] of Object.entries(replacements)) output.set(name,encoder.encode(text));
    output.set('.nojekyll',new Uint8Array());
    return {files:output,profile};
  }

  function connect() {
    const folder=document.getElementById('site-folder'),form=document.getElementById('settings-form');
    if(!folder||!form)return;
    const fields=document.getElementById('settings-fields'),folderStatus=document.getElementById('folder-status'),status=document.getElementById('settings-status'),button=document.getElementById('download-button');
    const base=document.getElementById('base-url'),email=document.getElementById('business-email'),facebook=document.getElementById('facebook-url');
    let selected=null,loadingId=0;
    const show=(element,message,error=false)=>{element.textContent=message;element.classList.toggle('is-error',error);};
    folder.addEventListener('change',async()=>{
      const thisLoad=++loadingId;
      selected=null;fields.disabled=true;show(folderStatus,'Reading website files…');show(status,'');
      try {
        const candidates=new Map();
        for(const file of folder.files) {
          const parts=(file.webkitRelativePath||file.name).split('/');
          if(parts.length>2)continue;
          if(candidates.has(file.name))throw new Error('Choose one website folder at a time.');
          candidates.set(file.name,file);
        }
        const indexFile=candidates.get('site-files.json');
        if(!indexFile)throw new Error('Choose the folder that directly contains index.html and site-files.json.');
        const index=JSON.parse(await indexFile.text());
        if(index.id!=='carol-language-courses-tripoli'||!Array.isArray(index.files))throw new Error('This is not the Carol website folder.');
        const total=index.files.reduce((sum,name)=>sum+(candidates.get(name)?.size||0),0);
        if(total>50*1024*1024)throw new Error('This website folder is larger than 50 MB. Ask for help preparing the export.');
        const loaded=new Map();
        for(const name of index.files) {
          if(name==='.nojekyll'){loaded.set(name,new Uint8Array());continue;}
          const file=candidates.get(name);
          if(!file)throw new Error('Missing '+name+'. Select the complete extracted folder.');
          loaded.set(name,new Uint8Array(await file.arrayBuffer()));
        }
        const profile=engine.validateProfile(readJSON(loaded,'business-profile.json'));
        // Validate the whole package now, before enabling the download controls.
        prepare(loaded,{});
        if(thisLoad!==loadingId)return;
        selected=loaded;base.value=profile.baseUrl;email.value=profile.email;facebook.value=profile.facebook;
        fields.disabled=false;show(folderStatus,'Ready: '+loaded.size+' website files loaded.');
      }catch(error){if(thisLoad===loadingId)show(folderStatus,error.message||'The folder could not be read.',true);}
    });
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(!selected)return;
      if(!form.reportValidity())return;
      button.disabled=true;show(status,'Preparing your updated website…');
      try {
        const result=prepare(selected,{baseUrl:base.value,email:email.value,facebook:facebook.value});
        const blob=zip(result.files),url=URL.createObjectURL(blob),link=document.createElement('a');
        link.href=url;link.download='carol-language-courses-updated.zip';document.body.appendChild(link);link.click();link.remove();
        setTimeout(()=>URL.revokeObjectURL(url),30000);
        show(status,result.profile.baseUrl ? 'Your ZIP download has been prepared. All public page URLs and the sitemap now use '+result.profile.baseUrl+' Extract it into a new folder to review.' : 'Your ZIP download has been prepared. Domain-specific metadata remains unset until you add a real website address. Extract it into a new folder to review.');
      }catch(error){show(status,error.message||'The export could not be prepared.',true);}
      finally{button.disabled=false;}
    });
  }
  return {crc32,zip,prepare,connect};
});
