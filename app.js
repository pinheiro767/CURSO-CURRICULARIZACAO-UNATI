const courseStart = new Date('2026-06-09T00:00:00');
const today = new Date();
let currentWeek = Math.min(9, Math.max(1, Math.floor((today - courseStart)/(7*24*60*60*1000))+1));
let selectedWeek = Number(localStorage.getItem('selectedWeek') || currentWeek);
let deferredPrompt;

const weeks = [
{n:1,date:'09/06',title:'Escolha do tema e do tipo de jogo',status:'realizada',goal:'Definir grupos, tipo de jogo e tema neuroanatômico.',deliver:'Grupo definido + jogo escolhido + público UNATI + ideia inicial.',steps:[
['Mapa da proposta', 'Registrar turma, grupo, jogo e tema neuroanatômico.', 'Crie uma ficha de projeto para um jogo educativo de Neuroanatomia voltado para idosos da UNATI. Campos: turma, grupo, jogo, tema, objetivo, público-alvo e integrantes.'],
['Escolha do jogo', 'Confirmar se o grupo fará Cartas, Quiz, Sudoku, Palavras Cruzadas ou Bolhas.', 'Compare os jogos Cartas, Quiz, Sudoku, Palavras Cruzadas e Bolhas para ensinar Neuroanatomia a idosos. Diga vantagens, dificuldades e recursos necessários.'],
['Tema neuroanatômico', 'Escolher conteúdo: encéfalo, medula, nervos cranianos, sistema límbico, córtex, cerebelo, tronco encefálico ou nervos periféricos.', 'Sugira 10 temas de Neuroanatomia adequados para jogos educativos simples destinados a idosos da UNATI.']
]},
{n:2,date:'16/06',title:'Canva: protótipo visual do aplicativo',status:'hoje',goal:'Criar o mapa visual do aplicativo no Canva e listar os assets que serão usados depois.',deliver:'Protótipo Canva + 6 telas + lista de imagens/sons/dados + banco inicial.',special:true,steps:[
['Janela 1 — Entrar no Canva e criar o projeto','Abra o Canva, entre com e-mail, clique em Criar um design, escolha Apresentação 16:9 e renomeie o arquivo. Se ninguém do grupo tiver Canva Pro, use Canva gratuito. Se o Canva não abrir, use Google Apresentações ou PowerPoint online como plano B.', 'Ajude-me a criar um projeto no Canva em formato apresentação 16:9 para um jogo educativo de Neuroanatomia para idosos da UNATI. O jogo será [Cartas/Quiz/Sudoku/Palavras Cruzadas/Bolhas]. Crie uma organização inicial com 6 páginas: início, como jogar, jogo, acerto, erro e final.'],
['Janela 2 — Nome, público e objetivo','Na primeira página, escreva nome do jogo, público-alvo e objetivo. O texto precisa ser simples para uma pessoa idosa entender.', 'Crie 8 sugestões de nomes curtos para um jogo de [tipo do jogo] sobre Neuroanatomia voltado para idosos da UNATI. Depois crie um objetivo simples, acolhedor e fácil de entender.'],
['Janela 3 — Tela inicial','Monte a capa do aplicativo: nome grande, imagem de Neuroanatomia, botão INICIAR e frase curta. Esta tela será referência para o HTML da Semana 4.', 'Crie uma proposta de tela inicial para um jogo educativo de Neuroanatomia chamado [nome]. A tela deve ter letras grandes, alto contraste, botão INICIAR, imagem relacionada ao sistema nervoso e uma frase acolhedora para idosos.'],
['Janela 4 — Como jogar','Crie uma tela com até 5 instruções. Use frases curtas. Não coloque texto longo.', 'Crie instruções simples para um jogo de [tipo do jogo] sobre Neuroanatomia para idosos. Use no máximo 5 passos, com linguagem gentil, clara e acessível.'],
['Janela 5 — Tela principal do jogo','Desenhe a tela real do jogo. Cartas: cartas viradas. Quiz: pergunta + 4 alternativas. Sudoku: grade 4x4. Cruzadas: grade + pistas. Bolhas: pergunta + bolhas clicáveis. Essa tela será o modelo para o JavaScript.', 'Crie a tela principal de um jogo [tipo do jogo] sobre Neuroanatomia. Inclua uma pergunta ou desafio, opções de resposta, resposta correta, explicação simples e sugestões visuais acessíveis para idosos.'],
['Janela 6 — Acerto, erro e final','Crie 3 telas: acerto, erro e final. A tela de erro deve motivar, não constranger.', 'Crie mensagens de acerto, erro e conclusão para um jogo educativo de Neuroanatomia para idosos. O tom deve ser acolhedor, positivo e educativo.'],
['Janela 7 — Lista de assets','Crie uma página chamada Arquivos do aplicativo. Liste imagens, sons e dados que entrarão nas pastas assets/img, assets/audio e data.', 'Liste os assets necessários para um PWA de jogo educativo de Neuroanatomia: imagens, ícones, sons, dados e nomes de arquivos. Use nomes como logo.png, acerto.mp3 e perguntas.json.'],
['Janela 8 — Exportar e organizar','Baixe o protótipo em PNG ou PDF. Nomeie arquivos com padrão: tela_inicial.png, como_jogar.png, jogo_01.png, acerto.png, erro.png, final.png.', 'Crie um checklist para exportar telas do Canva em PNG e organizar os arquivos para um PWA com as pastas assets/img, assets/audio e data.']
]},
{n:3,date:'23/06',title:'Conteúdo neuroanatômico + banco de dados',status:'bloqueada',goal:'Transformar o conteúdo do Canva em perguntas, respostas e explicações.',deliver:'Arquivo perguntas.json ou banco equivalente revisado.',steps:[
['Banco de conteúdo','Produzir no mínimo 20 itens por grupo: perguntas, pares, pistas, bolhas ou desafios.', 'Crie 20 itens para um jogo [tipo] sobre [tema neuroanatômico], para idosos da UNATI. Inclua resposta correta e explicação simples.'],
['Revisão anatômica','Conferir se cada resposta está correta e se a linguagem está simples.', 'Revise este banco de perguntas de Neuroanatomia. Aponte erros anatômicos, termos difíceis e proponha linguagem mais simples para idosos.'],
['Formato de dados','Organizar em tabela ou JSON.', 'Transforme este conteúdo em JSON com campos: id, pergunta, opcoes, correta, explicacao, imagem, som.']
]},
{n:4,date:'30/06',title:'HTML: transformar telas em estrutura',status:'bloqueada',goal:'Criar index.html com telas do jogo.',deliver:'index.html inicial com seções: início, instruções, jogo, feedback e final.',steps:[
['Criar estrutura','Montar o arquivo index.html com as telas desenhadas no Canva.', 'Crie um arquivo index.html para um jogo [tipo] de Neuroanatomia com telas: início, instruções, jogo, acerto, erro e final. Use HTML sem frameworks.'],
['Inserir imagens','Usar assets/img com logo, fundo e ilustrações.', 'Adapte este HTML para usar imagens locais da pasta assets/img: logo.png, fundo.png e icone_cerebro.png.'],
['Acessibilidade','Ajustar títulos, botões e textos para idosos.', 'Revise este HTML para melhorar acessibilidade: botões grandes, textos claros, labels e navegação simples.']
]},
{n:5,date:'07/07',title:'CSS: visual responsivo Android/iPhone',status:'bloqueada',goal:'Aplicar cores, botões grandes, responsividade e alto contraste.',deliver:'styles.css completo e responsivo.',steps:[
['Paleta do Canva para CSS','Converter cores do protótipo em variáveis CSS.', 'Crie um CSS responsivo para um jogo educativo de Neuroanatomia para idosos. Use alto contraste, botões grandes, cards arredondados e layout mobile-first.'],
['Responsividade','Testar em telas pequenas.', 'Ajuste este CSS para funcionar bem em iPhone e Android, com botões tocáveis, fonte mínima de 18px e sem cortes na tela.'],
['Design final','Aproximar do Canva.', 'Com base neste layout do Canva descrito, gere CSS para deixar o jogo visualmente semelhante, limpo e acessível.']
]},
{n:6,date:'14/07',title:'JavaScript: interatividade do jogo',status:'bloqueada',goal:'Criar cliques, pontuação, troca de telas e feedback.',deliver:'script.js funcional.',steps:[
['Troca de telas','Botões Iniciar, Próxima, Reiniciar.', 'Crie JavaScript para alternar telas de um jogo: inicio, instrucoes, jogo, acerto, erro e final.'],
['Lógica do jogo','Cartas, quiz, sudoku, cruzadas ou bolhas.', 'Crie a lógica em JavaScript para um jogo [tipo] usando um array de perguntas/itens. Deve ter pontuação, feedback e botão reiniciar.'],
['Sons e efeitos','Adicionar som de clique, acerto, erro e animação.', 'Adicione ao JavaScript sons locais da pasta assets/audio e animações simples para acerto e erro.']
]},
{n:7,date:'21/07',title:'Montagem completa em pastas',status:'bloqueada',goal:'Organizar projeto como aplicativo real.',deliver:'Pasta completa com index, CSS, JS, assets, data.',steps:[
['Estrutura profissional','Criar árvore de arquivos.', 'Crie a estrutura de pastas para um jogo PWA: index.html, styles.css, app.js, manifest.webmanifest, service-worker.js, assets/img, assets/audio, data.'],
['Integração','Ligar HTML, CSS, JS, imagens, sons e dados.', 'Verifique este projeto e diga se os caminhos dos arquivos estão corretos para funcionar no GitHub Pages.'],
['Teste local','Abrir index.html e corrigir erros.', 'Analise este erro de console do navegador e explique como corrigir no meu jogo PWA.']
]},
{n:8,date:'28/07',title:'GitHub Pages: publicação do jogo',status:'bloqueada',goal:'Subir o jogo no GitHub e publicar.',deliver:'Link público do GitHub Pages.',steps:[
['Criar repositório','Nomear repositório e enviar arquivos.', 'Explique passo a passo como criar um repositório no GitHub e enviar os arquivos de um jogo PWA.'],
['Ativar Pages','Publicar pelo GitHub Pages.', 'Explique como ativar GitHub Pages para um projeto com index.html na raiz.'],
['Teste no celular','Abrir o link no Android/iPhone.', 'Crie um checklist para testar um jogo publicado no GitHub Pages em Android e iPhone.']
]},
{n:9,date:'04/08',title:'PWA final + apresentação',status:'bloqueada',goal:'Transformar em app instalável e apresentar.',deliver:'PWA instalável + apresentação final.',steps:[
['Manifest','Criar manifesto com nome, ícone, cor e modo standalone.', 'Crie um manifest.webmanifest para um jogo educativo de Neuroanatomia chamado [nome], com ícones 192 e 512 e display standalone.'],
['Service worker','Configurar funcionamento offline básico.', 'Crie um service-worker.js simples para cachear index.html, CSS, JS, manifest e assets principais.'],
['Apresentação final','Mostrar objetivo, público, jogo, tecnologia e link.', 'Crie um roteiro de apresentação de 5 minutos para um grupo apresentar seu jogo PWA de Neuroanatomia para idosos da UNATI.']
]}
];

function isWeekOpen(n){ return n <= currentWeek || localStorage.getItem('teacherMode')==='1'; }
function saveCheck(key,val){ const data=JSON.parse(localStorage.getItem('checks')||'{}'); data[key]=val; localStorage.setItem('checks',JSON.stringify(data)); updateProgress(); }
function getCheck(key){ return !!JSON.parse(localStorage.getItem('checks')||'{}')[key]; }
function copyText(txt,btn){ navigator.clipboard?.writeText(txt).then(()=>{ const old=btn.textContent; btn.textContent='✅ Copiado'; setTimeout(()=>btn.textContent=old,1600); }); }

function renderNav(){
 const nav=document.getElementById('weeksNav'); nav.innerHTML='';
 weeks.forEach(w=>{ const b=document.createElement('button'); b.className='tab '+(selectedWeek===w.n?'active ':'')+(!isWeekOpen(w.n)?'locked':''); b.innerHTML=`<strong>${w.n}</strong><span>${w.date}</span>`; b.onclick=()=>{ if(!isWeekOpen(w.n)){ alert('Esta aula abre na semana correspondente.'); return;} selectedWeek=w.n; localStorage.setItem('selectedWeek',selectedWeek); render();}; nav.appendChild(b); });
}
function renderWeek(){
 const w=weeks[selectedWeek-1]; const el=document.getElementById('weekContent'); const open=isWeekOpen(w.n);
 if(!open){ el.innerHTML=`<div class="week-card"><div class="week-head"><span class="status">🔒 Bloqueada</span><h3>Semana ${w.n}</h3><p>Esta aula abre no dia ${w.date}.</p></div></div>`; return; }
 el.innerHTML=`<article class="week-card"><div class="week-head"><span class="status">${w.n===currentWeek?'🟢 Aula de hoje':'✅ Aberta'}</span><h3>Semana ${w.n} — ${w.title}</h3><p><b>Objetivo:</b> ${w.goal}<br><b>Entrega:</b> ${w.deliver}</p></div><div class="week-body">${w.special?specialWeek2():''}<div class="notice"><b>Regra da oficina:</b> conclua uma janela antes de abrir a próxima. O Canva de hoje será usado nas próximas semanas para criar HTML, CSS, JavaScript, assets e PWA.</div><div class="tagrow"><span class="chip">📱 Android/iPhone</span><span class="chip">🧠 Neuroanatomia</span><span class="chip">🎮 Jogos</span><span class="chip">📦 PWA</span></div>${w.steps.map((s,i)=>stepHtml(w.n,i,s)).join('')}<div class="progress-wrap"><div class="bar"><i id="pbar"></i></div><small id="ptext">0%</small></div></div></article>`;
 setTimeout(()=>{ document.querySelectorAll('.step')[0]?.classList.add('open'); updateProgress(); bindChecks(); },0);
}
function stepHtml(week,i,s){ const key=`w${week}s${i}`; const checks=['Li a instrução da etapa.','Copiei ou adaptei o prompt.','Produzi a parte solicitada no Canva/projeto.','Mostrei ao grupo e revisei.']; return `<section class="step" id="${key}"><div class="step-title" onclick="this.parentElement.classList.toggle('open')"><span class="num">${i+1}</span><h4>${s[0]}</h4><span>⌄</span></div><div class="step-content"><p>${s[1]}</p>${interactiveDemo(week,i,s[0])}<p><b>Prompt para copiar:</b></p><pre class="prompt">${s[2]}</pre><button class="copy" onclick="copyText(\`${s[2].replace(/`/g,'\\`')}\`,this)">📋 Copiar prompt</button><div class="checklist">${checks.map((c,j)=>`<label><input type="checkbox" data-key="${key}c${j}" ${getCheck(`${key}c${j}`)?'checked':''}/><span>${c}</span></label>`).join('')}</div><button class="advance" onclick="openNext('${key}')">Abrir próxima janela</button></div></section>`; }
function interactiveDemo(week,i,title){
 if(week===2 && i===4) return `<div class="notice"><b>Imagem interativa:</b> teste o formato do jogo antes de desenhar no Canva.</div><div class="game-grid"><button class="game-btn" onclick="selectGame(this)">🎴 Cartas</button><button class="game-btn" onclick="selectGame(this)">❓ Quiz</button><button class="game-btn" onclick="selectGame(this)">🔢 Sudoku</button><button class="game-btn" onclick="selectGame(this)">📝 Cruzadas</button><button class="game-btn" onclick="selectGame(this)">🫧 Bolhas</button></div><p class="small">Depois de escolher, desenhe no Canva uma tela semelhante ao tipo do seu grupo.</p>`;
 if(week===2 && i===6) return `<div class="asset-tree">NeuroGame/\n├── index.html\n├── styles.css\n├── app.js\n├── manifest.webmanifest\n├── service-worker.js\n├── assets/\n│   ├── img/\n│   │   ├── logo.png\n│   │   └── cerebro.png\n│   └── audio/\n│       ├── acerto.mp3\n│       └── erro.mp3\n└── data/\n    └── perguntas.json</div>`;
 if(title.toLowerCase().includes('bolhas')) return `<div class="bubble-demo"><button class="bubble" onclick="this.classList.add('pop')">Cérebro</button><button class="bubble" onclick="this.classList.add('pop')">Medula</button><button class="bubble" onclick="this.classList.add('pop')">Cerebelo</button></div>`;
 if(title.toLowerCase().includes('cartas')) return `<div class="cards-demo"><button class="flip" onclick="this.classList.toggle('on');this.textContent=this.classList.contains('on')?'Memória':'Hipocampo'">Hipocampo</button><button class="flip" onclick="this.classList.toggle('on');this.textContent=this.classList.contains('on')?'Coordenação':'Cerebelo'">Cerebelo</button><button class="flip" onclick="this.classList.toggle('on');this.textContent=this.classList.contains('on')?'Reflexos':'Medula'">Medula</button></div>`;
 return '';
}
function specialWeek2(){ return `<div class="notice"><b>Hoje:</b> não é “fazer capa bonita”. É criar o projeto visual do futuro aplicativo. Tudo que sair do Canva vira referência para código, assets, sons, dados e PWA.</div><img class="interactive-img" src="assets/img/bubbles.svg" alt="Jogo de bolhas" onclick="document.getElementById('globalTip').textContent='No jogo de bolhas, cada bolha futura será um botão em JavaScript.'"/><img class="interactive-img" src="assets/img/neuron.svg" alt="Neurônio" onclick="document.getElementById('globalTip').textContent='Cada imagem escolhida hoje deve virar arquivo dentro de assets/img.'"/>`; }
function bindChecks(){ document.querySelectorAll('input[type=checkbox]').forEach(cb=>cb.onchange=e=>saveCheck(e.target.dataset.key,e.target.checked)); }
function openNext(id){ const steps=[...document.querySelectorAll('.step')]; const idx=steps.findIndex(s=>s.id===id); if(idx>-1 && steps[idx+1]){steps[idx+1].classList.add('open'); steps[idx+1].scrollIntoView({behavior:'smooth',block:'start'});} else alert('Etapas desta semana concluídas.'); }
function updateProgress(){ const boxes=[...document.querySelectorAll('.week-body input[type=checkbox]')]; if(!boxes.length)return; const done=boxes.filter(b=>b.checked).length; const pct=Math.round(done/boxes.length*100); const bar=document.getElementById('pbar'), txt=document.getElementById('ptext'); if(bar)bar.style.width=pct+'%'; if(txt)txt.textContent=`${pct}% concluído`; }
function selectGame(btn){ document.querySelectorAll('.game-btn').forEach(b=>b.classList.remove('selected')); btn.classList.add('selected'); }
function render(){ renderNav(); renderWeek(); }

document.querySelectorAll('.interactive-img').forEach(img=>img.addEventListener('click',()=>{ document.getElementById('globalTip').textContent=img.dataset.tip||'Boa escolha: imagem interativa ajuda o aluno a visualizar o futuro app.'; }));
document.getElementById('resetProgress').onclick=()=>{ if(confirm('Resetar progresso salvo neste navegador?')){localStorage.clear(); location.reload();} };
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault(); deferredPrompt=e; document.getElementById('installBtn').classList.remove('hidden');});
document.getElementById('installBtn').onclick=async()=>{ if(deferredPrompt){deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null;} };
if('serviceWorker' in navigator){ window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js')); }
render();
