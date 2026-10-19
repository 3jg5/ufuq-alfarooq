(()=>{
    const $=(s,r=document)=>r.querySelector(s),K='ufq_';
    const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(K+k))??d}catch{return d}};
    const S=(k,v)=>localStorage.setItem(K+k,JSON.stringify(v));
    const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
    const dl=d=>Math.ceil((new Date(d)-new Date().setHours(0,0,0,0))/864e5);
    const subs=()=>{try{return studentData.subjects.length?studentData.subjects:basicSubjects}catch{return['عام']}};
    const PHONE='96898132390';
    const API=''; // ضع هنا رابط الخادم الوسيط الذي يتصل بـ Claude API (لا تضع المفتاح في الواجهة)
    
    const css=document.createElement('style');
    css.textContent=`:root{--c:#114a31}body.theme-pink{--c:#d81b60}
    .ov{position:fixed;inset:0;z-index:300;overflow:auto;padding:20px}
    .bx{max-width:1000px;margin:20px auto;padding:28px;background:rgba(255,255,255,.62);border-radius:22px}
    body.ovo #main-dashboard{display:none!important}
    .tabs{gap:6px;background:rgba(255,255,255,.55);padding:8px;border-radius:16px;position:sticky;top:0;z-index:5;backdrop-filter:blur(8px)}
    .tb{border:0;border-radius:12px;padding:10px 16px;margin:0;background:transparent;transition:.2s}
    .tb:hover{background:rgba(0,0,0,.06)}.tb.on{box-shadow:0 4px 12px rgba(0,0,0,.2)}
    .cd{border-right:5px solid var(--c);box-shadow:0 3px 12px rgba(0,0,0,.07)}
    .it{box-shadow:0 2px 8px rgba(0,0,0,.06);border-right:4px solid var(--c)}
    .tt{width:100%;border-collapse:separate;border-spacing:8px}.tt th{color:var(--c);font-size:.95rem}
    .tt td.p{background:rgba(0,0,0,.07);border-radius:12px;font-weight:700;text-align:center;color:var(--c);width:70px}
    .tt select{width:100%;min-width:0;padding:10px 4px;border:0;border-radius:12px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.08);font-weight:600;text-align:center;cursor:pointer}
    .tt select.f{background:var(--c);color:#fff}
    .up{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:8px}.up input[type=file]{display:none}.up label{cursor:pointer}
    .pv img,.pv embed{max-width:100%;border-radius:12px;margin-top:10px}.pv embed{width:100%;height:420px}
    @media(max-width:700px){.bx{padding:14px}.tt{border-spacing:4px}.tt select{font-size:.75rem;padding:8px 0}}
    .bx h2{color:var(--c);text-align:center;margin:10px 0}
    .x,.tb,.ab,.bt{background:#fff;border:2px solid var(--c);color:var(--c);border-radius:10px;padding:7px 14px;font-weight:700;cursor:pointer;margin:3px}
    .tb.on,.ab,.bt.p{background:var(--c);color:#fff}
    .tabs{display:flex;flex-wrap:wrap;justify-content:center;margin:10px 0}
    .fx{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0;align-items:center}
    .pn input,.pn select,.pn textarea{padding:9px;border-radius:8px;border:1px solid #999;flex:1;min-width:130px}
    .pn input[type=checkbox],.pn input[type=radio]{flex:none;min-width:0}
    .it{display:flex;gap:10px;align-items:center;background:#fff;border-radius:10px;padding:10px;margin:6px 0}
    .it span{flex:1}.it.dn span{text-decoration:line-through;opacity:.55}.it button{background:none;border:0;cursor:pointer}
    .cd{background:#fff;border-radius:12px;padding:14px;margin:10px 0;line-height:1.9}
    .bar{height:16px;background:#ddd;border-radius:9px;overflow:hidden}.bar i{display:block;height:100%;background:var(--c)}
    #bot{position:fixed;left:18px;bottom:18px;width:56px;height:56px;border-radius:50%;border:0;background:var(--c);color:#fff;font-size:1.7rem;cursor:pointer;z-index:400;box-shadow:0 4px 14px #0004}
    #bp{position:fixed;left:18px;bottom:84px;width:min(340px,90vw);height:420px;z-index:400;display:none;flex-direction:column;background:#fff;border-radius:16px;box-shadow:0 8px 30px #0004;overflow:hidden}
    #bp.on{display:flex}#bp h4{background:var(--c);color:#fff;padding:10px;text-align:center}#bm{flex:1;overflow:auto;padding:10px}
    .m{padding:8px 12px;border-radius:12px;margin:5px 0;max-width:85%;line-height:1.7;white-space:pre-wrap}.m.b{background:#eef3f0}.m.u{background:var(--c);color:#fff;margin-right:auto}
    #bp .fx{margin:0;padding:8px;border-top:1px solid #ddd;flex-wrap:nowrap}#bp input{flex:1;padding:8px;border-radius:8px;border:1px solid #999}
    .toast{position:fixed;top:70px;right:20px;z-index:500;background:#fff3cd;border:1px solid #e0b100;border-radius:10px;padding:10px 16px;max-width:300px}`;
    document.head.appendChild(css);
    
    function openView(title,tabs){
     $('#ov')?.remove();document.body.classList.add('ovo');
     const ov=document.createElement('div');ov.id='ov';ov.className='ov';
     ov.innerHTML=`<div class="bx glass-box"><button class="x">🔙 رجوع</button><h2>${title}</h2><div class="tabs">${tabs.map((t,i)=>`<button class="tb" data-i="${i}">${t[0]}</button>`).join('')}</div><div class="pn"></div></div>`;
     document.body.appendChild(ov);
     const show=i=>{ov.querySelectorAll('.tb').forEach((b,j)=>b.classList.toggle('on',i==j));const p=$('.pn',ov);p.innerHTML='';tabs[i][1](p)};
     $('.x',ov).onclick=()=>{ov.remove();document.body.classList.remove('ovo')};
     ov.querySelectorAll('.tb').forEach(b=>b.onclick=()=>show(+b.dataset.i));
     show(0);
    }
    
    // نموذج عام: إضافة / حذف / علامة صح، ويحفظ في المتصفح
    function crud(p,key,fields,opt={}){
     const items=L(key,[]);
     p.innerHTML=`<div class="fx">${fields.map(f=>f[2]=='select'?`<select data-n="${f[0]}">${f[3].map(o=>`<option>${esc(o)}</option>`).join('')}</select>`:f[2]=='check'?`<label><input type="checkbox" data-n="${f[0]}"> ${f[1]}</label>`:`<input data-n="${f[0]}" type="${f[2]||'text'}" placeholder="${f[1]}" title="${f[1]}">`).join('')}<button class="ab">➕ إضافة</button></div><div class="ls"></div>`;
     const ls=$('.ls',p);
     const draw=()=>{
      ls.innerHTML=items.map((it,i)=>`<div class="it ${it.done?'dn':''}">${opt.check?`<input type="checkbox" data-c="${i}" ${it.done?'checked':''}>`:''}<span>${fields.map(f=>it[f[0]]===true?'🔁 '+f[1]:it[f[0]]?esc(it[f[0]]):'').filter(Boolean).join(' • ')}</span><button data-d="${i}">🗑️</button></div>`).join('')||'<p>لا يوجد شيء بعد</p>';
      ls.querySelectorAll('[data-d]').forEach(b=>b.onclick=()=>{items.splice(b.dataset.d,1);save()});
      ls.querySelectorAll('[data-c]').forEach(b=>b.onchange=()=>{items[b.dataset.c].done=b.checked;save()});
     };
     const save=()=>{S(key,items);draw();opt.after&&opt.after()};
     $('.ab',p).onclick=()=>{
      const o={};let ok=false;
      p.querySelectorAll('[data-n]').forEach(e=>{
       o[e.dataset.n]=e.type=='checkbox'?e.checked:e.value.trim();
       if(e.tagName=='INPUT'&&e.type!='checkbox'&&e.value.trim())ok=true;
      });
      if(!ok)return;
      items.unshift(o);
      p.querySelectorAll('input:not([type=checkbox])').forEach(e=>e.value='');
      save();
     };
     draw();
    }
    const info=h=>p=>{p.innerHTML=h};
    const days=['السبت','الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة'];
    
    // ===== الخدمات الأكاديمية =====
    function gpa(p){
     p.innerHTML=subs().map((s,i)=>`<div class="fx"><b style="min-width:140px">${esc(s)}</b><input type="number" min="0" max="100" placeholder="الدرجة من 100" data-g="${i}"><input type="number" min="1" value="1" placeholder="الوزن (الساعات)" data-w="${i}"></div>`).join('')+'<button class="bt p" id="gc">احسب المعدل</button><div id="gr" class="cd">—</div>';
     $('#gc',p).onclick=()=>{let t=0,w=0;p.querySelectorAll('[data-g]').forEach(g=>{const v=parseFloat(g.value),wt=parseFloat(p.querySelector(`[data-w="${g.dataset.g}"]`).value)||1;if(!isNaN(v)){t+=v*wt;w+=wt}});$('#gr',p).innerHTML=w?`المعدل التراكمي: <b>${(t/w).toFixed(2)}%</b>`:'أدخل درجة واحدة على الأقل'};
    }
    const acad=()=>openView('⚙️ الخدمات الأكاديمية',[
     ['📋 جدول المذاكرة',p=>crud(p,'tt',[['day','اليوم','select',days],['time','الوقت','time'],['subject','المادة','select',subs()],['topic','الدرس / الهدف']])],
     ['🧮 حاسبة المعدل',gpa],
     ['🗓️ الخطة الأسبوعية',p=>crud(p,'wp',[['subject','المادة','select',subs()],['date','التاريخ','date'],['time','الوقت','time'],['topic','ماذا ستذاكر؟'],['rep','خطة متكررة أسبوعياً','check']])],
     ['✅ المهام والواجبات والمشاريع',p=>crud(p,'tasks',[['type','النوع','select',['واجب','مشروع','مهمة']],['subject','المادة','select',subs()],['title','العنوان'],['due','موعد التسليم','date']],{check:true})]
    ]);
    
    // ===== المجتمع والتواصل =====
    const NOTE='<p style="font-size:.85rem">⚠️ المشاركات محفوظة على جهازك فقط. لنشرها بين جميع الطلاب يلزم ربط الموقع بقاعدة بيانات (مثل Firebase).</p>';
    function contact(p){
     p.innerHTML=`<div class="cd">📞 رقم إدارة الموقع: <a href="tel:+${PHONE}">98132390</a></div><div class="fx"><input id="cn" placeholder="اسمك" value="${esc(typeof studentData!='undefined'?studentData.name:'')}"><textarea id="cm" rows="4" placeholder="رسالتك لإدارة الموقع"></textarea></div><button class="bt p" id="cs">إرسال عبر واتساب 💬</button>`;
     $('#cs',p).onclick=()=>{const m=$('#cm',p).value.trim();if(!m)return alert('اكتب رسالتك');open(`https://wa.me/${PHONE}?text=${encodeURIComponent('من '+$('#cn',p).value+': '+m)}`,'_blank')};
    }
    const comm=()=>openView('💬 المجتمع والتواصل',[
     ['🗣️ مساحة النقاش',p=>{crud(p,'disc',[['title','موضوع النقاش / سؤالك'],['body','التفاصيل']]);p.insertAdjacentHTML('beforeend',NOTE)}],
     ['💡 اقتراحات للموقع',p=>{crud(p,'sug',[['text','اقتراحك لتطوير الموقع']]);p.insertAdjacentHTML('beforeend',NOTE)}],
     ['📚 تجارب المواد الصعبة',p=>{crud(p,'hard',[['subject','المادة','select',subs()],['text','تجربتك وكيف تغلبت على الصعوبة']]);p.insertAdjacentHTML('beforeend',NOTE)}],
     ['📞 تواصل مع الإدارة',contact]
    ]);
    
    // ===== تطوير المهارات =====
    const W=[['resilient','مرن / قادر على التعافي'],['diligent','مجتهد'],['accurate','دقيق'],['benefit','فائدة'],['challenge','تحدٍّ'],['achieve','يحقق'],['essential','ضروري'],['improve','يحسّن'],['schedule','جدول'],['goal','هدف'],['effort','جهد'],['ability','قدرة'],['solution','حل'],['research','بحث']];
    const G=[
     {q:'She ___ to school every day.',o:['go','goes','going','gone'],a:'goes'},
     {q:'I ___ my homework yesterday.',o:['do','did','done','doing'],a:'did'},
     {q:'There ___ many students in the class.',o:['is','are','be','was'],a:'are'},
     {q:'He is ___ than his brother.',o:['tall','tallest','taller','more tall'],a:'taller'},
     {q:'We ___ studying now.',o:['is','am','are','be'],a:'are'}];
    function eng(p){
     const mw=L('mw',[]),left=W.filter(w=>!mw.includes(w[0])),d=Math.floor(Date.now()/864e5);
     const w=left.length?left[d%left.length]:null;
     p.innerHTML=`<div class="cd"><b>📅 كلمة اليوم</b><br>${w?`<span style="font-size:1.6rem;direction:ltr;display:inline-block">${w[0]}</span> = ${w[1]}<br><button class="bt p" id="mk">✅ خلاص حفظتها</button>`:'🎉 حفظت جميع الكلمات!'}</div>
     <div class="cd"><b>الكلمات (${mw.length}/${W.length} محفوظة)</b><br>${W.map(x=>`<span dir="ltr">${mw.includes(x[0])?'✅':'▫️'} ${x[0]}</span> — ${x[1]}`).join('<br>')}</div>
     <div class="cd"><b>القواعد المختصرة</b><br>• المضارع البسيط: مع he/she/it نضيف s (She goes).<br>• الماضي البسيط: نضيف ed أو نستخدم الفعل الشاذ (did, went).<br>• المقارنة: صفة قصيرة + er (taller)، وصفة طويلة more + صفة.<br>• are مع الجمع، is مع المفرد، am مع I.</div>`;
     const b=$('#mk',p);if(b)b.onclick=()=>{S('mw',[...mw,w[0]]);eng(p)};
    }
    function quiz(p){
     const sh=a=>[...a].sort(()=>Math.random()-.5);
     const vq=sh(W).slice(0,10).map(w=>({q:`ما معنى كلمة "${w[0]}"؟`,o:sh([w[1],...sh(W.filter(x=>x!=w)).slice(0,3).map(x=>x[1])]),a:w[1]}));
     const qs=[...vq,...G];
     p.innerHTML=qs.map((q,i)=>`<div class="cd"><b>${i+1}. ${esc(q.q)}</b>${q.o.map(o=>`<div><label><input type="radio" name="q${i}" value="${esc(o)}"> ${esc(o)}</label></div>`).join('')}</div>`).join('')+'<button class="bt p" id="qs">تصحيح الاختبار</button><div id="qr"></div>';
     $('#qs',p).onclick=()=>{let s=0;const w=[];qs.forEach((q,i)=>{const c=p.querySelector(`[name=q${i}]:checked`);c&&c.value==q.a?s++:w.push(`${i+1}: ${q.a}`)});$('#qr',p).innerHTML=`<div class="cd"><b>نتيجتك ${s} من ${qs.length}</b><br>الإجابات الصحيحة للأسئلة الخاطئة:<br>${w.map(esc).join('<br>')||'لا يوجد أخطاء 🎉'}</div>`};
    }
    const skills=()=>openView('💡 تطوير المهارات',[
     ['🤲 الأدعية',info('<div class="cd">﴿رَبِّ زِدْنِي عِلْمًا﴾<br>﴿رَبِّ اشْرَحْ لِي صَدْرِي * وَيَسِّرْ لِي أَمْرِي * وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي * يَفْقَهُوا قَوْلِي﴾<br>«اللهم انفعني بما علّمتني، وعلّمني ما ينفعني، وزدني علماً».<br>«اللهم لا سهل إلا ما جعلته سهلاً، وأنت تجعل الحزن إذا شئت سهلاً».</div>')],
     ['🧠 طرق المذاكرة الذكية',info('<div class="cd">• <b>بومودورو:</b> 25 دقيقة تركيز + 5 راحة.<br>• <b>الاسترجاع النشط:</b> أغلق الكتاب واكتب ما تتذكره.<br>• <b>التكرار المتباعد:</b> راجع بعد يوم، 3 أيام، أسبوع.<br>• <b>تقنية فاينمان:</b> اشرح الدرس بكلمات بسيطة لشخص آخر.<br>• حل الأسئلة السابقة أهم من إعادة القراءة.</div>')],
     ['🔎 البحث والتلخيص',info('<div class="cd"><b>مهارات البحث:</b> حدّد السؤال ← اختر كلمات مفتاحية ← فضّل المصادر الرسمية والأكاديمية ← قارن بين مصدرين ← وثّق المصدر.<br><b>التلخيص:</b> اقرأ العناوين أولاً ← استخرج الفكرة الرئيسية لكل فقرة ← أعد الصياغة بأسلوبك ← اجعل الملخص ثلث الأصل ← استخدم خرائط ذهنية وجداول.</div>')],
     ['💻 برمجة وتصميم وأمن',info('<div class="cd"><b>أساسيات البرمجة:</b> المتغيرات، الشروط (if)، الحلقات (for/while)، الدوال. ابدأ بـ HTML/CSS ثم JavaScript أو Python.<br><b>التصميم:</b> تباين الألوان، محاذاة وتناسق، خط واضح، مسافات كافية، هوية بصرية موحدة.<br><b>الأمن السيبراني:</b> كلمات مرور قوية ومختلفة، التحقق بخطوتين، لا تضغط روابط مجهولة، حدّث أجهزتك، ولا تشارك بياناتك الشخصية.</div>')],
     ['🔤 الإنجليزية',eng],
     ['📝 اختبار شامل (15)',quiz]
    ]);
    
    // ===== التنظيم والمتابعة =====
    function sched(p){
     const D=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس'],t=L('ttab',{}),op=['–',...subs()];
     p.innerHTML=`<h3 style="color:var(--c)">جدول الحصص</h3><p>5 أيام × 8 حصص — اختر المادة لكل خانة.</p><table class="tt"><tr><th>الحصة</th>${D.map(d=>`<th>${d}</th>`).join('')}</tr>${[1,2,3,4,5,6,7,8].map(r=>`<tr><td class="p">${r}</td>${D.map((d,c)=>`<td><select data-k="${c}-${r}">${op.map(o=>`<option ${t[c+'-'+r]==o?'selected':''}>${esc(o)}</option>`).join('')}</select></td>`).join('')}</tr>`).join('')}</table><div class="cd"><b>إرفاق صورة أو ملف PDF للجدول</b><div class="up"><label class="bt p">📎 اختر ملفاً<input type="file" id="tf" accept="image/*,application/pdf"></label><button class="bt" id="tr">🗑️ إزالة الملف</button></div><div class="pv"></div></div>`;
     const pv=()=>{const f=L('tfile',null);$('.pv',p).innerHTML=f?(f.startsWith('data:application/pdf')?`<embed src="${f}" type="application/pdf">`:`<img src="${f}">`):''};
     p.querySelectorAll('select').forEach(s=>{const u=()=>s.classList.toggle('f',s.value!='–');u();s.onchange=()=>{t[s.dataset.k]=s.value;S('ttab',t);u()}});
     $('#tf',p).onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{S('tfile',r.result);pv()}catch{alert('الملف كبير جداً، اختر ملفاً أصغر (أقل من 3 ميجا تقريباً).')}};r.readAsDataURL(f)};
     $('#tr',p).onclick=()=>{localStorage.removeItem(K+'tfile');pv()};pv();
    }
    const exF=[['subject','المادة','select',subs()],['date','تاريخ الاختبار','date'],['lessons','الدروس المطلوب مراجعتها (افصل بينها بفاصلة)']];
    function cd(p){
     const ex=L('ex',[]).filter(e=>e.date).sort((a,b)=>a.date>b.date?1:-1);
     p.innerHTML=ex.map(e=>{const n=dl(e.date);return `<div class="cd"><b>${esc(e.subject)}</b> — ${e.date}<br>${n>=0?`⏳ باقي <b>${n}</b> يوم`:'انتهى'}</div>`}).join('')||'<p>أضف اختباراً أولاً</p>';
    }
    function review(p){
     const ex=L('ex',[]).filter(e=>e.date&&dl(e.date)>0),rv=L('rv',[]);
     p.innerHTML=ex.map(e=>{
      const ls=(e.lessons||'').split(/[,،\n]/).map(s=>s.trim()).filter(Boolean),d=Math.max(1,dl(e.date)-1);
      return `<div class="cd"><b>${esc(e.subject)}</b> — ${e.date}`+(ls.map((l,i)=>{
       const dt=new Date(Date.now()+Math.floor(i*d/ls.length)*864e5).toLocaleDateString('ar-OM'),k=e.subject+'|'+l;
       return `<div><label><input type="checkbox" data-k="${esc(k)}" ${rv.includes(k)?'checked':''}> ${dt}: ${esc(l)}</label></div>`}).join('')||'<br>أضف الدروس في تبويب الاختبارات')+'</div>';
     }).join('')||'<p>أضف اختباراً قادماً أولاً</p>';
     p.querySelectorAll('[data-k]').forEach(c=>c.onchange=()=>{let r=L('rv',[]);r=c.checked?[...r,c.dataset.k]:r.filter(x=>x!=c.dataset.k);S('rv',r)});
    }
    function progress(p){
     const t=L('tasks',[]),d=t.filter(x=>x.done).length,pc=t.length?Math.round(d/t.length*100):0;
     p.innerHTML=`<div class="cd">إنجاز المهام: ${d} من ${t.length} (${pc}%)<div class="bar"><i style="width:${pc}%"></i></div></div>`;
    }
    function remindList(){
     const a=[];
     L('ex',[]).forEach(e=>{const n=dl(e.date);if(n>=0&&n<=7)a.push(`📝 اختبار ${e.subject} بعد ${n} يوم`)});
     L('tasks',[]).forEach(t=>{const n=dl(t.due);if(!t.done&&t.due&&n>=0&&n<=3)a.push(`📌 ${t.title||t.type} (${t.subject}) يُسلَّم بعد ${n} يوم`)});
     return a;
    }
    const org=()=>openView('📅 التنظيم والمتابعة',[
     ['🏫 جدول الحصص',sched],
     ['📆 التقويم والاختبارات',p=>crud(p,'ex',exF)],
     ['⏳ العدّاد التنازلي',cd],
     ['🗓️ جدول المذاكرة',p=>crud(p,'tt',[['day','اليوم','select',days],['time','الوقت','time'],['subject','المادة','select',subs()],['topic','الدرس / الهدف']])],
     ['✅ الواجبات والمشاريع',p=>crud(p,'tasks',[['type','النوع','select',['واجب','مشروع','مهمة']],['subject','المادة','select',subs()],['title','العنوان'],['due','موعد التسليم','date']],{check:true})],
     ['📈 متابعة الإنجاز',progress],
     ['🔔 تذكيرات',p=>{const a=remindList();p.innerHTML=a.map(x=>`<div class="cd">${esc(x)}</div>`).join('')||'<p>لا توجد مواعيد قريبة 👍</p>'}],
     ['📖 خطة المراجعة',review]
    ]);
    
    // ===== مستواي الدراسي =====
    function level(p){
     const sc=L('sc',[]),by={};
     sc.forEach(s=>{const v=parseFloat(s.score);if(!isNaN(v))(by[s.subject]=by[s.subject]||[]).push(v)});
     const av=Object.entries(by).map(([k,v])=>[k,Math.round(v.reduce((a,b)=>a+b)/v.length)]);
     const t=L('tasks',[]),pc=t.length?Math.round(t.filter(x=>x.done).length/t.length*100):0;
     const str=av.filter(a=>a[1]>=85),wk=av.filter(a=>a[1]<70).sort((a,b)=>a[1]-b[1]);
     const nx=L('ex',[]).filter(e=>e.date&&dl(e.date)>=0).sort((a,b)=>a.date>b.date?1:-1)[0];
     p.innerHTML=`<div class="cd"><b>مستواك في كل مادة</b>${av.map(a=>`<div>${esc(a[0])}: ${a[1]}%<div class="bar"><i style="width:${a[1]}%"></i></div></div>`).join('')||'<p>سجّل نتائج اختباراتك أولاً</p>'}</div>
     <div class="cd">💪 نقاط القوة: ${str.map(a=>esc(a[0])).join('، ')||'—'}<br>⚠️ نقاط الضعف: ${wk.map(a=>esc(a[0])).join('، ')||'—'}<br>🎯 إنجاز الأهداف: ${pc}%<div class="bar"><i style="width:${pc}%"></i></div></div>
     <div class="cd"><b>ماذا تذاكر بعد ذلك؟</b><br>${wk.length?'ابدأ بمادة '+esc(wk[0][0])+(wk[1]?' ثم '+esc(wk[1][0]):''):'حافظ على مستواك وراجع موادك بالتناوب'}${nx?'<br>أقرب اختبار: '+esc(nx.subject)+' بعد '+dl(nx.date)+' يوم':''}</div>`;
    }
    const lvl=()=>openView('📊 مستواي الدراسي',[
     ['📝 نتائج الاختبارات السابقة',p=>crud(p,'sc',[['subject','المادة','select',subs()],['name','اسم الاختبار'],['score','الدرجة من 100','number']])],
     ['📊 مستواي',level]
    ]);
    
    // ===== المساعد الذكي =====
    function bot(){
     if($('#bot'))return;
     document.body.insertAdjacentHTML('beforeend','<button id="bot" title="المساعد الذكي">🤖</button><div id="bp"><h4>🤖 مساعد أفق الفاروق</h4><div id="bm"><div class="m b">أهلاً! اسألني عن أي درس، أو اطلب مثالاً محلولاً أو أسئلة تدريبية.</div></div><div class="fx"><input id="bi" placeholder="اكتب سؤالك..."><button class="ab" id="bs">➤</button></div></div>');
     const add=(t,c)=>{const m=document.createElement('div');m.className='m '+c;m.textContent=t;$('#bm').appendChild(m);$('#bm').scrollTop=1e9;return m};
     const loc=q=>/مثال|حل/.test(q)?'أرسل نص المسألة وسأحلها خطوة بخطوة: المعطيات ← المطلوب ← القانون ← التعويض ← التحقق.':/سؤال|اختبر|تدريب/.test(q)?'اكتب اسم الدرس وسأعطيك أسئلة تدريبية متدرجة.':/خطأ|غلط/.test(q)?'أرسل حلّك والإجابة الصحيحة، وسأوضح أين الخلل ولماذا.':'اكتب اسم الدرس أو المسألة وسأشرحها بتبسيط يناسب '+((typeof studentData!='undefined'&&studentData.grade)||'مستواك')+'.';
     const send=async()=>{
      const i=$('#bi'),q=i.value.trim();if(!q)return;
      add(q,'u');i.value='';const w=add('...','b');
      try{
       if(API){const r=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:q,grade:studentData.grade,subjects:studentData.subjects})});w.textContent=(await r.json()).reply}
       else w.textContent=loc(q);
      }catch{w.textContent='تعذّر الاتصال، حاول لاحقاً.'}
     };
     $('#bot').onclick=()=>$('#bp').classList.toggle('on');
     $('#bs').onclick=send;$('#bi').onkeydown=e=>{if(e.key=='Enter')send()};
    }
    
    // ===== الربط بالصفحة =====
    const MAP={'الخدمات الأكاديمية':acad,'المجتمع والتواصل':comm,'تطوير المهارات':skills,'التنظيم والمتابعة':org,'مستواي الدراسي':lvl};
    const g=$('.sections-grid');
    if(g&&!$('#lvl-card'))g.insertAdjacentHTML('beforeend','<a href="#" id="lvl-card" class="section-card glass-box"><div class="section-icon">📊</div><div class="section-title">مستواي الدراسي</div></a>');
    document.querySelectorAll('.section-card').forEach(a=>{
     const t=$('.section-title',a)?.textContent.trim();
     if(MAP[t])a.onclick=e=>{e.preventDefault();MAP[t]()};
    });
    bot();
    setTimeout(()=>{const a=remindList();if(a.length){const t=document.createElement('div');t.className='toast';t.innerHTML='🔔 '+a.slice(0,3).map(esc).join('<br>');document.body.appendChild(t);setTimeout(()=>t.remove(),7000)}},1500);
    })();