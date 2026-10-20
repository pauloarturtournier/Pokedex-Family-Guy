var nome=document.getElementById("nome");
var numero=document.getElementById("numero");
var tipo=document.getElementById("tipo");
var desc=document.getElementById("desc");
var sprite=document.getElementById("sprite");
var campo=document.getElementById("buscar_nome");

/* Não encontrei uma API pública de Family Guy que funcione de forma confiável,
   então os dados ficam aqui. Para usar fotos reais, preencha o campo "img" com um link. */
var personagens=[
    {id:1,  nome:"Peter Griffin",   tipo:"Pai da família",       cor:"#4a7c59", img:"", desc:"O patriarca atrapalhado dos Griffin. Trabalha na cervejaria Pawtucket e vive se metendo em confusões absurdas."},
    {id:2,  nome:"Lois Griffin",    tipo:"Mãe da família",       cor:"#c0392b", img:"", desc:"Esposa de Peter, professora de piano e a voz da razão da casa, apesar de ter seu lado maluco."},
    {id:3,  nome:"Meg Griffin",     tipo:"Filha mais velha",     cor:"#8e44ad", img:"", desc:"Adolescente impopular que é o alvo favorito de piadas da própria família."},
    {id:4,  nome:"Chris Griffin",   tipo:"Filho do meio",        cor:"#2980b9", img:"", desc:"Garoto ingênuo e pouco esperto, apaixonado por desenhar e por filmes."},
    {id:5,  nome:"Stewie Griffin",  tipo:"Bebê gênio",           cor:"#e67e22", img:"", desc:"Bebê superinteligente, sotaque britânico e planos de dominar o mundo. Vive com o macacão vermelho."},
    {id:6,  nome:"Brian Griffin",   tipo:"Cachorro falante",     cor:"#7f8c8d", img:"", desc:"O cachorro da família. Escritor frustrado, adora martini e tem opiniões fortes sobre tudo."},
    {id:7,  nome:"Glenn Quagmire",  tipo:"Vizinho",              cor:"#16a085", img:"", desc:"Piloto de avião, vizinho dos Griffin e conhecido pelo seu bordão e comportamento sem filtro."},
    {id:8,  nome:"Cleveland Brown", tipo:"Vizinho",              cor:"#795548", img:"", desc:"Amigo calmo e de voz suave de Peter. Ganhou até uma série própria, The Cleveland Show."},
    {id:9,  nome:"Joe Swanson",     tipo:"Policial",             cor:"#34495e", img:"", desc:"Policial de Quahog que usa cadeira de rodas e é muito durão. Vizinho e amigo de Peter."},
    {id:10, nome:"Mort Goldman",    tipo:"Dono da farmácia",     cor:"#d35400", img:"", desc:"Farmacêutico nervoso e muito preocupado, pai de Neil."},
    {id:11, nome:"Herbert",         tipo:"Vizinho idoso",        cor:"#95a5a6", img:"", desc:"Idoso simpático e esquisito que tem um interesse peculiar por Chris."},
    {id:12, nome:"Consuela",        tipo:"Empregada",            cor:"#f39c12", img:"", desc:"Empregada dos Quagmire, famosa pelas respostas curtas e inesquecíveis."},
    {id:13, nome:"Tom Tucker",      tipo:"Jornalista",           cor:"#2c3e50", img:"", desc:"Âncora do telejornal local, sempre pomposo e com bom humor involuntário."},
    {id:14, nome:"Carter Pewterschmidt", tipo:"Pai de Lois",     cor:"#1abc9c", img:"", desc:"Sogro rico e esnobe de Peter, que não esconde que acha o genro um fracasso."}
];

var atual=-1;

function avatar(p){
    if(p.img){ return p.img; }
    var inicial=p.nome.charAt(0);
    var svg="<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'>"+
            "<rect width='150' height='150' rx='20' fill='"+p.cor+"'/>"+
            "<text x='75' y='100' font-size='80' font-family='Arial' font-weight='bold' fill='white' text-anchor='middle'>"+inicial+"</text></svg>";
    return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}

function mostrar(i){
    var p=personagens[i];
    atual=i;
    nome.innerHTML=p.nome;
    numero.innerHTML="Numero: "+p.id;
    tipo.innerHTML="Papel: "+p.tipo;
    desc.innerHTML=p.desc;
    desc.classList.remove("error");
    sprite.src=avatar(p);
}

function buscarPersonagem(){
    var termo=campo.value.trim().toLowerCase();
    if(termo===""){ return; }

    var achado=-1;
    for(var i=0;i<personagens.length;i++){
        if(personagens[i].nome.toLowerCase().indexOf(termo)!==-1){
            achado=i;
            break;
        }
    }

    if(achado===-1){
        nome.innerHTML="???";
        numero.innerHTML="Numero: -";
        tipo.innerHTML="Papel: -";
        desc.innerHTML="Personagem não encontrado";
        desc.classList.add("error");
        return;
    }
    mostrar(achado);
}

function navegar(passo){
    var i=atual+passo;
    if(i<0){ i=personagens.length-1; }
    if(i>=personagens.length){ i=0; }
    mostrar(i);
}

campo.addEventListener("keydown",function(e){
    if(e.key==="Enter"){ buscarPersonagem(); }
});
document.getElementById("proximo").addEventListener("click",function(){ navegar(1); });
document.getElementById("anterior").addEventListener("click",function(){ navegar(-1); });
document.getElementById("aleatorio").addEventListener("click",aleatorio);

function aleatorio(){
    var i;
    do{
        i=Math.floor(Math.random()*personagens.length);
    }while(i===atual && personagens.length>1);
    campo.value="";
    mostrar(i);
}

mostrar(0);
