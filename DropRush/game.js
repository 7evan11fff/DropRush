'use strict';

// =====================================================================
// CONFIGURATION
// =====================================================================
const CONFIG = {
    BALL_RADIUS: 12,
    BALL_ORBIT_FACTOR: 0.13,

    RING_WIDTH: 14,
    RING_START_FACTOR: 0.48,
    RING_BASE_SPEED: 100,
    RING_BASE_INTERVAL: 1.35,

    ROTATION_SENSITIVITY: 0.007,
    ROTATION_DAMPING: 0.91,

    COMBO_SPEED_BONUS: 0.025,
    MAX_SPEED_MULT: 2.2,
    COMBO_INTERVAL_BONUS: 0.035,
    MIN_INTERVAL: 0.55,
    MAX_MULTIPLIER: 10,

    OVERDRIVE_COMBO: 15,
    OVERDRIVE_DUR: 5,

    DIFFICULTY_RATE: 0.018,
    MAX_SPIN: 1.2,
    NEAR_MISS_DEG: 8,

    MAX_PARTICLES: 300,
    SHAKE_INTENSITY: 10,
    SHAKE_DURATION: 0.3,

    ABIL_BTN_R: 26,
    ABIL_BTN_Y: 70,

    PICKUP_COLLECT_ANGLE: 0.26,
    MAGNET_COLLECT_ANGLE: 1.05,
    BOSS_INTERVAL: 30,
    REVERSE_DURATION: 1.5,
    MAGNETIC_STRENGTH: 0.6,

    FONT: "system-ui, -apple-system, 'Segoe UI', sans-serif"
};

// =====================================================================
// THEMES
// =====================================================================
const THEMES = {
    neon: {
        name: 'Neon City', bgTop: '#0a0020', bgBot: '#1a0040', accent: '#00ffcc',
        colors: ['#FF00FF','#00FFFF','#FF3366','#33FF66','#FFFF00','#FF6600'],
        pCol: ['#FF00FF','#00FFFF','#FFFFFF'],
        speedMod: 1.0, breakCol: '#FFD700', phaseCol: '#00FFCC',
    },
    lava: {
        name: 'Inferno', bgTop: '#1a0500', bgBot: '#3a0a00', accent: '#ff5500',
        colors: ['#FF4400','#FF6600','#FF8800','#FFAA00','#FF2200','#FF0044'],
        pCol: ['#FF4400','#FF8800','#FFCC00'],
        speedMod: 1.05, breakCol: '#FFDD44', phaseCol: '#FF8800',
    },
    sky: {
        name: 'Skyfall', bgTop: '#0a2a4a', bgBot: '#1a4a7a', accent: '#88ccff',
        colors: ['#4488FF','#66AAFF','#88CCFF','#AAEEFF','#44DDFF','#FFFFFF'],
        pCol: ['#88CCFF','#FFFFFF','#AAEEFF'],
        speedMod: 0.92, breakCol: '#FFEE88', phaseCol: '#88FFEE',
    },
    space: {
        name: 'Deep Space', bgTop: '#000012', bgBot: '#000030', accent: '#8844ff',
        colors: ['#8844FF','#AA66FF','#CC88FF','#FF44AA','#44AAFF','#FF88CC'],
        pCol: ['#8844FF','#CC88FF','#FFFFFF'],
        speedMod: 0.95, breakCol: '#FFAA44', phaseCol: '#AA88FF',
    },
    toxic: {
        name: 'Toxic', bgTop: '#001a00', bgBot: '#003300', accent: '#44ff44',
        colors: ['#44FF44','#88FF00','#00FF88','#AAFF00','#00FF44','#CCFF66'],
        pCol: ['#44FF44','#88FF00','#FFFFFF'],
        speedMod: 1.02, breakCol: '#FFFF00', phaseCol: '#00FF88',
    },
    candy: {
        name: 'Candy', bgTop: '#2a0028', bgBot: '#3a0040', accent: '#ff88cc',
        colors: ['#FF88CC','#FFAADD','#FF66AA','#FFCCEE','#FF44CC','#FFDDFF'],
        pCol: ['#FF88CC','#FFAADD','#FFFFFF'],
        speedMod: 0.95, breakCol: '#FFEE88', phaseCol: '#FFAAEE',
    }
};
const THEME_KEYS = Object.keys(THEMES);

// =====================================================================
// EVOLUTION PHASES
// =====================================================================
const PHASES = [
    { id: 0, name: 'Classic',  at: 0,  types: ['normal'] },
    { id: 1, name: 'Shift',    at: 15, types: ['normal','moving'] },
    { id: 2, name: 'Break',    at: 30, types: ['normal','moving','breakable'] },
    { id: 3, name: 'Phase',    at: 45, types: ['normal','moving','breakable','phaseSwitch','magnetic'] },
    { id: 4, name: 'CHAOS',    at: 60, types: ['normal','moving','breakable','phaseSwitch','magnetic','reverse'] },
];

// =====================================================================
// MISSIONS & PROGRESSION DATA
// =====================================================================
const MISSION_POOL = [
    { id:'s20',  text:'Survive 20 seconds',   type:'survive',  target:20,  xp:40  },
    { id:'s45',  text:'Survive 45 seconds',   type:'survive',  target:45,  xp:80  },
    { id:'sc20', text:'Score 20 points',       type:'score',    target:20,  xp:50  },
    { id:'sc50', text:'Score 50 points',       type:'score',    target:50,  xp:100 },
    { id:'c5',   text:'Hit 5x combo',          type:'combo',    target:5,   xp:30  },
    { id:'c15',  text:'Hit 15x combo',         type:'combo',    target:15,  xp:80  },
    { id:'b5',   text:'Break 5 rings',         type:'break',    target:5,   xp:40  },
    { id:'b15',  text:'Break 15 rings',        type:'break',    target:15,  xp:70  },
    { id:'a3',   text:'Use abilities 3 times', type:'ability',  target:3,   xp:30  },
    { id:'p3',   text:'Reach Break phase',     type:'phase',    target:3,   xp:60  },
    { id:'ch',   text:'Enter Chaos Mode',      type:'phase',    target:5,   xp:100 },
    { id:'od',   text:'Trigger Overdrive',     type:'overdrive',target:1,   xp:80  },
];

const LEVEL_UNLOCKS = [
    { level:2,  type:'ability', id:'dash',   name:'Dash Drop' },
    { level:3,  type:'theme',   id:'lava',   name:'Inferno Theme' },
    { level:4,  type:'ability', id:'shield', name:'Shield' },
    { level:6,  type:'theme',   id:'sky',    name:'Skyfall Theme' },
    { level:8,  type:'ability', id:'slow',   name:'Slow Time' },
    { level:10, type:'theme',   id:'space',  name:'Deep Space Theme' },
];

const DAILY_XP = [0, 50, 100, 200, 350, 500];

// =====================================================================
// SHOP & SKINS DATA
// =====================================================================
const SHOP_ITEMS = [
    { id:'magnet',     cat:'consumable', name:'Magnet',       cost:120,  currency:'coins', desc:'Auto-collect nearby pickups', icon:'\u{1F9F2}' },
    { id:'doubleCoin', cat:'consumable', name:'Double Coins', cost:200,  currency:'coins', desc:'2x coins this run',          icon:'\u{1F4B0}' },
    { id:'extraLife',  cat:'consumable', name:'Extra Life',   cost:5,    currency:'gems',  desc:'Free revive',                icon:'\u{1F496}' },
    { id:'flame',      cat:'skin',       name:'Flame',        cost:500,  currency:'coins', desc:'Fire trail',                 icon:'\u{1F525}' },
    { id:'ice',        cat:'skin',       name:'Ice',          cost:500,  currency:'coins', desc:'Frost particles',            icon:'\u{2744}\u{FE0F}' },
    { id:'void',       cat:'skin',       name:'Void',         cost:800,  currency:'coins', desc:'Dark void effect',           icon:'\u{1F300}' },
    { id:'gold',       cat:'skin',       name:'Gold',         cost:10,   currency:'gems',  desc:'Sparkle trail',              icon:'\u{2728}' },
    { id:'pixel',      cat:'skin',       name:'Pixel',        cost:600,  currency:'coins', desc:'Retro style',                icon:'\u{1F47E}' },
    { id:'rainbow',    cat:'skin',       name:'Rainbow',      cost:15,   currency:'gems',  desc:'Color cycle',                icon:'\u{1F308}' },
    { id:'toxic',      cat:'theme',      name:'Toxic',        cost:1000, currency:'coins', desc:'Green acid palette',         icon:'\u{2622}\u{FE0F}' },
    { id:'candy',      cat:'theme',      name:'Candy',        cost:12,   currency:'gems',  desc:'Pastel pink palette',        icon:'\u{1F36C}' },
];
const SHOP_CATS = ['consumable','skin','theme'];
const SHOP_CAT_LABELS = { consumable:'Power-Ups', skin:'Ball Skins', theme:'Themes' };

const BALL_SKINS = {
    default: { name:'Default', color:'#FFFFFF', glow:'#FFFFFF', trail:null },
    flame:   { name:'Flame',   color:'#FF6600', glow:'#FF4400', trail:{ colors:['#FF4400','#FF8800','#FFCC00'], rate:3 } },
    ice:     { name:'Ice',     color:'#88EEFF', glow:'#44CCFF', trail:{ colors:['#AAEEFF','#FFFFFF','#88CCFF'], rate:2 } },
    void:    { name:'Void',    color:'#8833CC', glow:'#6611AA', trail:{ colors:['#6611AA','#9944DD','#332266'], rate:2 } },
    gold:    { name:'Gold',    color:'#FFD700', glow:'#FFAA00', trail:{ colors:['#FFD700','#FFEE88','#FFFFFF'], rate:3 } },
    pixel:   { name:'Pixel',   color:'#44FF44', glow:'#22CC22', trail:null, pixel:true },
    rainbow: { name:'Rainbow', color:'#FF0000', glow:'#FF0000', trail:{ colors:['#FF0000','#FF8800','#FFFF00','#00FF00','#0088FF','#8800FF'], rate:4 }, rainbow:true },
};

// =====================================================================
// UTILITIES
// =====================================================================
function hexToRgb(h) {
    return { r: parseInt(h.slice(1,3),16), g: parseInt(h.slice(3,5),16), b: parseInt(h.slice(5,7),16) };
}
function rgba(hex, a) { const c = hexToRgb(hex); return `rgba(${c.r},${c.g},${c.b},${a})`; }
function lerp(a, b, t) { return a + (b - a) * t; }
function rand(a, b) { return a + Math.random() * (b - a); }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function normAngle(a) { return ((a % (Math.PI*2)) + Math.PI*2) % (Math.PI*2); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffle(a) { for (let i = a.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function hslToHex(h,s,l) {
    s/=100;l/=100;
    const k=n=>(n+h/30)%12;
    const a=s*Math.min(l,1-l);
    const f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
    const toHex=x=>Math.round(x*255).toString(16).padStart(2,'0');
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

// =====================================================================
// SEEDED RANDOM (deterministic multiplayer ring patterns)
// =====================================================================
class SeededRandom {
    constructor(seed) { this.state = seed >>> 0; }
    next() {
        this.state = (this.state + 0x6D2B79F5) | 0;
        let t = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    range(a, b) { return a + this.next() * (b - a); }
    pick(arr) { return arr[Math.floor(this.next() * arr.length)]; }
}

function generateSeedCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    return code;
}

function seedFromCode(code) {
    let h = 0;
    for (let i = 0; i < code.length; i++) h = ((h << 5) - h + code.charCodeAt(i)) | 0;
    return h >>> 0;
}

// =====================================================================
// AUDIO ENGINE
// =====================================================================
class Audio_ {
    constructor() { this.ctx = null; this.on = true; }
    init() { try { this.ctx = new (window.AudioContext||window.webkitAudioContext)(); } catch { this.on = false; } }
    resume() { if (!this.ctx) this.init(); if (this.ctx?.state === 'suspended') this.ctx.resume(); }

    _t(f,d,tp,v,dl) {
        if (!this.on||!this.ctx) return;
        const t = this.ctx.currentTime + (dl||0);
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = tp||'sine'; o.frequency.setValueAtTime(f,t);
        g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(0.001,t+d);
        o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t+d);
    }
    _sw(f1,f2,d,tp,v) {
        if (!this.on||!this.ctx) return;
        const t = this.ctx.currentTime;
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = tp||'sine'; o.frequency.setValueAtTime(f1,t);
        o.frequency.exponentialRampToValueAtTime(f2,t+d);
        g.gain.setValueAtTime(v,t); g.gain.exponentialRampToValueAtTime(0.001,t+d);
        o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t+d);
    }

    pass(combo) {
        const f = 520 + Math.min(combo,20)*55;
        this._t(f,0.1,'sine',0.13); if (combo > 2) this._t(f*1.5,0.07,'sine',0.06);
    }
    death()    { this._t(130,0.35,'sawtooth',0.2); this._t(75,0.45,'triangle',0.15); }
    click()    { this._t(720,0.04,'sine',0.1); }
    best()     { this._t(523,0.15,'sine',0.12); this._t(659,0.15,'sine',0.12,0.1); this._t(784,0.2,'sine',0.12,0.2); }
    phaseUp()  { this._t(400,0.2,'sine',0.09); this._t(600,0.2,'sine',0.09,0.1); this._t(800,0.18,'sine',0.08,0.2); this._t(1000,0.15,'sine',0.07,0.3); }
    chaos()    { this._t(150,0.5,'sawtooth',0.15); this._t(200,0.4,'square',0.08,0.1); this._t(100,0.5,'triangle',0.1,0.15); }
    odStart()  { this._t(200,0.3,'sawtooth',0.1); this._t(300,0.3,'triangle',0.08,0.05); this._sw(400,1200,0.3,'sine',0.07); }
    odEnd()    { this._sw(800,200,0.3,'sine',0.08); }
    dash()     { this._sw(800,200,0.15,'sine',0.1); }
    slow()     { this._sw(600,300,0.3,'sine',0.07); this._t(300,0.4,'triangle',0.05); }
    shieldB()  { this._t(1000,0.12,'sawtooth',0.1); this._sw(800,200,0.2,'square',0.07); }
    shieldR()  { this._t(880,0.1,'sine',0.05); this._t(1100,0.08,'sine',0.04,0.05); }
    breakR()   { this._t(200,0.1,'sawtooth',0.1); this._t(800,0.06,'square',0.07,0.02); }
    nearM()    { this._sw(400,1200,0.1,'sine',0.06); }
    lvlUp()    { this._t(523,0.15,'sine',0.11); this._t(659,0.15,'sine',0.11,0.1); this._t(784,0.15,'sine',0.11,0.2); this._t(1047,0.25,'sine',0.13,0.3); }
    daily()    { this._t(660,0.15,'sine',0.1); this._t(880,0.2,'sine',0.1,0.1); }
    coin()     { this._t(1200,0.06,'sine',0.08); this._t(1500,0.05,'sine',0.06,0.03); }
    gem()      { this._t(880,0.12,'sine',0.1); this._t(1100,0.1,'sine',0.08,0.05); this._t(1320,0.08,'sine',0.06,0.1); }
    buy()      { this._t(600,0.08,'sine',0.09); this._t(900,0.1,'sine',0.07,0.05); }
    bossHit()  { this._t(150,0.2,'sawtooth',0.12); this._sw(300,600,0.15,'square',0.08); }
    bossDie()  { this._t(200,0.3,'sawtooth',0.15); this._t(400,0.2,'triangle',0.1,0.1); this._sw(500,1200,0.3,'sine',0.1,0.15); }
    reverse()  { this._sw(1000,200,0.2,'square',0.08); this._t(300,0.15,'triangle',0.06,0.1); }
}

// =====================================================================
// PARTICLE SYSTEM
// =====================================================================
class Particle {
    constructor(x,y,vx,vy,r,color,life) {
        this.x=x;this.y=y;this.vx=vx;this.vy=vy;
        this.r=r;this.color=color;this.life=life;this.maxLife=life;
    }
    update(dt) { this.x+=this.vx*dt;this.y+=this.vy*dt;this.vx*=0.97;this.vy*=0.97;this.life-=dt;return this.life>0; }
    draw(ctx) {
        const a=clamp(this.life/this.maxLife,0,1);
        ctx.globalAlpha=a;ctx.beginPath();
        ctx.arc(this.x,this.y,Math.max(0.5,this.r*(0.3+a*0.7)),0,Math.PI*2);
        ctx.fillStyle=this.color;ctx.fill();ctx.globalAlpha=1;
    }
}
class Particles {
    constructor() { this.list=[]; }
    emit(x,y,n,col,spd=150,rad=4,life=0.6) {
        for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=spd*(0.3+Math.random()*0.7);
        this.list.push(new Particle(x,y,Math.cos(a)*s,Math.sin(a)*s,rad*(0.5+Math.random()*0.5),col,life*(0.5+Math.random()*0.5)));}
        if(this.list.length>CONFIG.MAX_PARTICLES)this.list.splice(0,this.list.length-CONFIG.MAX_PARTICLES);
    }
    emitRing(cx,cy,r,n,col) {
        for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=rand(50,130);
        this.list.push(new Particle(cx+Math.cos(a)*r,cy+Math.sin(a)*r,Math.cos(a)*sp,Math.sin(a)*sp,rand(2,5),col,rand(0.3,0.7)));}
    }
    emitTrail(x,y,col) { this.list.push(new Particle(x+rand(-3,3),y+rand(-3,3),rand(-20,20),rand(-20,20),rand(1.5,3.5),col,rand(0.2,0.4))); }
    update(dt) { this.list=this.list.filter(p=>p.update(dt)); }
    draw(ctx)  { this.list.forEach(p=>p.draw(ctx)); }
    clear()    { this.list=[]; }
}

// =====================================================================
// FLOATING TEXT
// =====================================================================
class FloatText {
    constructor(text,x,y,col,sz) { this.text=text;this.x=x;this.y=y;this.col=col;this.sz=sz||18;this.life=0.9;this.max=0.9;this.vy=-55; }
    update(dt) { this.y+=this.vy*dt;this.vy*=0.97;this.life-=dt;return this.life>0; }
    draw(ctx) {
        const a=clamp(this.life/this.max,0,1),s=this.sz*(0.8+a*0.2);
        ctx.globalAlpha=a;ctx.font=`700 ${s}px ${CONFIG.FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillStyle=this.col;ctx.fillText(this.text,this.x,this.y);ctx.globalAlpha=1;
    }
}

// =====================================================================
// BACKGROUND LAYER (parallax)
// =====================================================================
class BGLayer {
    constructor(n,spd,szR,aR) {
        this.dots=[];
        for(let i=0;i<n;i++) this.dots.push({x:Math.random(),y:Math.random(),s:rand(szR[0],szR[1]),a:rand(aR[0],aR[1]),sp:spd*(0.6+Math.random()*0.8)});
    }
    update(dt) { for(const d of this.dots){d.y-=d.sp*dt;if(d.y<-0.02){d.y=1.02;d.x=Math.random();}} }
    draw(ctx,w,h,col) { for(const d of this.dots){ctx.globalAlpha=d.a;ctx.beginPath();ctx.arc(d.x*w,d.y*h,d.s,0,Math.PI*2);ctx.fillStyle=col;ctx.fill();}ctx.globalAlpha=1; }
}

// =====================================================================
// PICKUP (coin / gem collectible)
// =====================================================================
class Pickup {
    constructor(radius, angle, type) {
        this.radius = radius;
        this.angle = angle;
        this.type = type;
        this.alive = true;
        this.opacity = 0;
        this.bobT = rand(0, Math.PI * 2);
        this.spinT = 0;
    }
    update(dt, speed) {
        this.radius -= speed * dt;
        this.opacity = Math.min(1, this.opacity + dt * 3);
        this.bobT += dt * 4;
        this.spinT += dt * 3;
        if (this.radius <= -10) this.alive = false;
    }
    draw(ctx, cx, cy, gRot) {
        if (!this.alive || this.radius <= 0 || this.opacity <= 0) return;
        const a = this.angle + gRot;
        const bob = Math.sin(this.bobT) * 3;
        const x = cx + Math.cos(a) * (this.radius + bob);
        const y = cy + Math.sin(a) * (this.radius + bob);
        const sz = this.type === 'gem' ? 7 : 6;
        const squeeze = 0.6 + Math.abs(Math.cos(this.spinT)) * 0.4;

        ctx.globalAlpha = this.opacity;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(squeeze, 1);

        if (this.type === 'gem') {
            ctx.beginPath();
            ctx.moveTo(0, -sz); ctx.lineTo(sz*0.7, 0);
            ctx.lineTo(0, sz); ctx.lineTo(-sz*0.7, 0);
            ctx.closePath();
            ctx.fillStyle = '#AA44FF';
            ctx.fill();
            ctx.strokeStyle = '#DDAAFF'; ctx.lineWidth = 1.5; ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, sz, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD700';
            ctx.fill();
            ctx.strokeStyle = '#FFEE88'; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.beginPath();
            ctx.arc(-sz*0.2, -sz*0.2, sz*0.3, 0, Math.PI*2);
            ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
        }
        ctx.restore();
        ctx.globalAlpha = 1;
    }
}

// =====================================================================
// RING OBSTACLE (normal | moving | breakable | phaseSwitch | magnetic | reverse)
// =====================================================================
class Ring {
    constructor(radius, segs, color, baseRot, spin, type, theme) {
        this.radius = radius;
        this.segs = segs;
        this.color = color;
        this.baseRot = baseRot;
        this.initRot = baseRot;
        this.spin = spin || 0;
        this.type = type || 'normal';
        this.passed = false;
        this.alive = true;
        this.opacity = 0;
        this.isBoss = false;
        this.bossHp = 0;
        this.bossMaxHp = 0;

        this.oscT = 0;
        this.oscSpd = rand(1.5, 3);
        this.oscRng = rand(0.3, 0.8);

        this.phT = rand(0, Math.PI * 2);
        this.phSpd = rand(2, 3.5);
        this.phVis = true;

        this.magT = 0;
        this.brkCol = theme?.breakCol || '#FFD700';
        this.phCol  = theme?.phaseCol || '#00FFCC';
    }

    get sa() { return (Math.PI * 2) / this.segs.length; }

    isGapAt(angle) {
        const n = normAngle(angle - this.baseRot);
        return !this.segs[Math.floor(n / this.sa) % this.segs.length];
    }

    nearMissDist(angle) {
        const n = normAngle(angle - this.baseRot);
        const sa = this.sa, i = Math.floor(n / sa);
        if (this.segs[i % this.segs.length]) return 0;
        return Math.min(n - i * sa, (i + 1) * sa - n) * (180 / Math.PI);
    }

    nearestSolidAngle(angle) {
        const n = normAngle(angle - this.baseRot);
        const sa = this.sa;
        let bestDist = Infinity, bestAng = 0;
        for (let i = 0; i < this.segs.length; i++) {
            if (!this.segs[i]) continue;
            const mid = (i + 0.5) * sa;
            let d = Math.abs(n - mid);
            if (d > Math.PI) d = Math.PI * 2 - d;
            if (d < bestDist) { bestDist = d; bestAng = mid + this.baseRot; }
        }
        return bestAng;
    }

    update(dt, speed) {
        this.radius -= speed * dt;
        this.opacity = Math.min(1, this.opacity + dt * 3);

        if (this.type === 'moving') {
            this.oscT += dt;
            this.baseRot = this.initRot + Math.sin(this.oscT * this.oscSpd) * this.oscRng;
        } else {
            this.baseRot += this.spin * dt;
        }

        if (this.type === 'phaseSwitch') {
            this.phT += dt;
            this.phVis = Math.sin(this.phT * this.phSpd) > -0.2;
        }

        if (this.type === 'magnetic') {
            this.magT += dt;
        }

        if (this.radius <= -10) this.alive = false;
    }

    draw(ctx, cx, cy, gRot) {
        if (this.opacity <= 0 || this.radius <= 0) return;
        let op = this.opacity;
        if (this.type === 'phaseSwitch') op *= this.phVis ? 1 : 0.1;

        const rot = this.baseRot + gRot, sa = this.sa, gap = 0.04;
        let col = this.color;
        if (this.type === 'breakable') col = this.brkCol;

        const lw = this.isBoss ? CONFIG.RING_WIDTH * 2.2 : CONFIG.RING_WIDTH;

        for (let i = 0; i < this.segs.length; i++) {
            const s = rot + i * sa + gap, e = rot + (i+1) * sa - gap;
            if (this.segs[i]) {
                ctx.lineWidth = lw + 10; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                ctx.strokeStyle = rgba(col, op * 0.15); ctx.stroke();

                ctx.lineWidth = lw;
                ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                ctx.strokeStyle = rgba(col, op * 0.92); ctx.stroke();

                if (this.type === 'breakable') {
                    ctx.setLineDash([4,6]); ctx.lineWidth = lw + 2;
                    ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                    ctx.strokeStyle = rgba('#FFFFFF', op * 0.18); ctx.stroke();
                    ctx.setLineDash([]);
                }
                if (this.type === 'phaseSwitch' && this.phVis) {
                    ctx.lineWidth = lw + 4;
                    ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                    ctx.strokeStyle = rgba(this.phCol, op * 0.08 * (0.5 + Math.sin(this.phT * 8) * 0.5)); ctx.stroke();
                }
                if (this.type === 'magnetic') {
                    ctx.lineWidth = lw + 6;
                    ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                    ctx.strokeStyle = rgba('#AA44FF', op * 0.1 * (0.5 + Math.sin(this.magT * 5) * 0.5)); ctx.stroke();
                }
                if (this.type === 'reverse') {
                    ctx.lineWidth = lw + 4;
                    ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                    ctx.strokeStyle = rgba('#FF4444', op * 0.12 * (0.5 + Math.sin(this.magT * 6) * 0.5)); ctx.stroke();
                }
                if (this.isBoss) {
                    const pulse = 0.5 + Math.sin(this.magT * 4) * 0.3;
                    ctx.lineWidth = lw + 14;
                    ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                    ctx.strokeStyle = rgba('#FF0000', op * 0.18 * pulse); ctx.stroke();
                    ctx.lineWidth = lw + 22;
                    ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                    ctx.strokeStyle = rgba('#FF2244', op * 0.06 * pulse); ctx.stroke();
                }
            } else {
                ctx.lineWidth = 1.5; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.arc(cx, cy, this.radius, s, e);
                ctx.strokeStyle = rgba('#FFFFFF', op * 0.06); ctx.stroke();
            }
        }
    }
}

// =====================================================================
// ABILITY SYSTEM
// =====================================================================
class Abilities {
    constructor() {
        this.dash   = { charge:0, max:5, on:false, dur:0, maxDur:0.3, ok:false };
        this.slow   = { charge:0, max:8, on:false, dur:0, maxDur:1.5, ok:false };
        this.shield = { charge:0, max:12, ready:false, ok:false };
        this.used = 0;
    }
    reset() {
        this.dash.charge=0;this.dash.on=false;this.dash.dur=0;
        this.slow.charge=0;this.slow.on=false;this.slow.dur=0;
        this.shield.charge=0;this.shield.ready=false;this.used=0;
    }
    sync(prog) {
        this.dash.ok   = prog.hasAbil('dash');
        this.slow.ok   = prog.hasAbil('slow');
        this.shield.ok = prog.hasAbil('shield');
    }
    charge(amt) {
        const ch = (ab) => { if(ab.ok && !ab.on) ab.charge = Math.min(ab.max, ab.charge + amt); };
        ch(this.dash); ch(this.slow);
        if (this.shield.ok && !this.shield.ready) {
            this.shield.charge = Math.min(this.shield.max, this.shield.charge + amt);
            if (this.shield.charge >= this.shield.max) this.shield.ready = true;
        }
    }
    canDash() { return this.dash.ok && this.dash.charge >= this.dash.max && !this.dash.on; }
    canSlow() { return this.slow.ok && this.slow.charge >= this.slow.max && !this.slow.on; }
    useDash() { if(!this.canDash())return false; this.dash.on=true;this.dash.dur=this.dash.maxDur;this.dash.charge=0;this.used++;return true; }
    useSlow() { if(!this.canSlow())return false; this.slow.on=true;this.slow.dur=this.slow.maxDur;this.slow.charge=0;this.used++;return true; }
    useShield(){ if(!this.shield.ok||!this.shield.ready)return false; this.shield.ready=false;this.shield.charge=0;this.used++;return true; }
    isDash() { return this.dash.on; }
    isSlow() { return this.slow.on; }
    hasShield(){ return this.shield.ready; }
    update(dt) {
        if(this.dash.on){this.dash.dur-=dt;if(this.dash.dur<=0){this.dash.on=false;this.dash.dur=0;}}
        if(this.slow.on){this.slow.dur-=dt;if(this.slow.dur<=0){this.slow.on=false;this.slow.dur=0;}}
    }
}

// =====================================================================
// PROGRESSION SYSTEM
// =====================================================================
class Progression {
    constructor() { this.d = this._load(); this._applyUnlocks(); }

    _load() {
        try {
            const s = localStorage.getItem('dropRushEvolve');
            if (s) {
                const d = JSON.parse(s);
                if (d.v === 3) return d;
                if (d.v === 2) return this._migrate2(d);
            }
        } catch {}
        return this._def();
    }
    _def() {
        return { v:3, xp:0, level:1, best:0, runs:0,
            themes:['neon'], abils:[],
            missions: this._pick(3), dailyDate:null, dailyStreak:0, scores:[],
            coins:0, gems:0,
            skins:['default'], activeSkin:'default',
            consumables:{ magnet:0, doubleCoin:0, extraLife:0 }
        };
    }
    _migrate2(d) {
        d.v = 3;
        d.coins = d.coins || 0;
        d.gems = d.gems || 0;
        d.skins = d.skins || ['default'];
        d.activeSkin = d.activeSkin || 'default';
        d.consumables = d.consumables || { magnet:0, doubleCoin:0, extraLife:0 };
        return d;
    }
    _save() { try{localStorage.setItem('dropRushEvolve',JSON.stringify(this.d));}catch{} }
    _pick(n) { return shuffle([...MISSION_POOL]).slice(0,n).map(m=>({...m,progress:0})); }

    get level() { return this.d.level; }
    get xp() { return this.d.xp; }
    get best() { return this.d.best; }
    get coins() { return this.d.coins; }
    get gems() { return this.d.gems; }
    xpNeeded() { return this.d.level * this.d.level * 50; }
    hasTheme(id) { return this.d.themes.includes(id); }
    hasAbil(id) { return this.d.abils.includes(id); }
    hasSkin(id) { return this.d.skins.includes(id); }
    unlockedThemes() { return THEME_KEYS.filter(k=>this.hasTheme(k)); }

    addCoins(n) { this.d.coins += n; this._save(); }
    addGems(n) { this.d.gems += n; this._save(); }
    spend(currency, amt) {
        if (currency === 'coins') {
            if (this.d.coins < amt) return false;
            this.d.coins -= amt;
        } else {
            if (this.d.gems < amt) return false;
            this.d.gems -= amt;
        }
        this._save(); return true;
    }
    addConsumable(id) {
        if (this.d.consumables[id] !== undefined) this.d.consumables[id]++;
        this._save();
    }
    useConsumable(id) {
        if (!this.d.consumables[id] || this.d.consumables[id] <= 0) return false;
        this.d.consumables[id]--;
        this._save(); return true;
    }
    getConsumable(id) { return this.d.consumables[id] || 0; }
    buySkin(id) { if (!this.d.skins.includes(id)) this.d.skins.push(id); this._save(); }
    setSkin(id) { this.d.activeSkin = id; this._save(); }
    buyTheme(id) { if (!this.d.themes.includes(id)) this.d.themes.push(id); this._save(); }

    addRun(score) {
        this.d.runs++;
        this.d.scores.push(score);
        if(this.d.scores.length>10) this.d.scores.shift();
        let nb = false;
        if(score > this.d.best){this.d.best=score;nb=true;}
        this._save(); return nb;
    }
    avgScore() { const s=this.d.scores; return s.length ? s.reduce((a,b)=>a+b,0)/s.length : 0; }

    addXp(amt) {
        this.d.xp += amt; let lv = false;
        while(this.d.xp >= this.xpNeeded()){this.d.xp -= this.xpNeeded();this.d.level++;lv=true;this._applyUnlocks();}
        this._save(); return lv;
    }
    _applyUnlocks() {
        for(const u of LEVEL_UNLOCKS){
            if(u.level>this.d.level)continue;
            if(u.type==='theme'&&!this.hasTheme(u.id)) this.d.themes.push(u.id);
            if(u.type==='ability'&&!this.hasAbil(u.id)) this.d.abils.push(u.id);
        }
    }
    checkMissions(st) {
        let xp=0; const done=[];
        for(const m of this.d.missions){
            if(m.progress>=m.target) continue;
            let v=0;
            switch(m.type){
                case'survive':v=st.time;break;case'score':v=st.score;break;case'combo':v=st.maxCombo;break;
                case'break':v=st.breaks;break;case'ability':v=st.abils;break;
                case'phase':v=st.maxPhase+1;break;case'overdrive':v=st.od;break;
            }
            m.progress=Math.max(m.progress,v);
            if(m.progress>=m.target){xp+=m.xp;done.push(m);}
        }
        const allDone = this.d.missions.every(m=>m.progress>=m.target);
        if(allDone) this.d.missions=this._pick(3);
        this._save(); return {xp,done,allDone};
    }
    canDaily() { return this.d.dailyDate !== new Date().toDateString(); }
    claimDaily() {
        const today=new Date().toDateString();
        if(!this.canDaily())return {xp:0,gems:0};
        const last=this.d.dailyDate?new Date(this.d.dailyDate):null;
        if(last){const diff=Math.round((new Date(today)-last)/(864e5));this.d.dailyStreak=diff===1?this.d.dailyStreak+1:1;}
        else this.d.dailyStreak=1;
        this.d.dailyDate=today;
        const idx=Math.min(this.d.dailyStreak,DAILY_XP.length-1);
        const g = 1;
        this.d.gems += g;
        this._save(); return {xp:DAILY_XP[idx], gems:g};
    }
    streak() { return this.d.dailyStreak; }
}

// =====================================================================
// AD MANAGER (Google IMA SDK scaffold)
// =====================================================================
class AdManager {
    constructor() {
        this.ready = false;
        this.adContainer = null;
        this.adDisplayContainer = null;
        this.adsLoader = null;
        this.adsManager = null;
        this._callback = null;
        this._type = null;
    }

    init() {
        if (typeof google === 'undefined' || !google.ima) return;
        this.adContainer = document.getElementById('adContainer');
        if (!this.adContainer) return;

        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainer);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

        this.adsLoader.addEventListener(
            google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
            e => this._onAdsLoaded(e), false);
        this.adsLoader.addEventListener(
            google.ima.AdErrorEvent.Type.AD_ERROR,
            e => this._onAdError(e), false);

        this.ready = true;
    }

    _request(type) {
        if (!this.ready) return false;
        this._type = type;
        const req = new google.ima.AdsRequest();

        // TODO: Replace with real ad unit IDs from your AdMob account
        if (type === 'rewarded') {
            req.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/rewarded&sz=1x1&gdfp_req=1&output=vast';
        } else {
            req.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_preroll_skippable&sz=640x480&gdfp_req=1&output=vast';
        }

        req.linearAdSlotWidth = window.innerWidth;
        req.linearAdSlotHeight = window.innerHeight;

        try {
            this.adDisplayContainer.initialize();
            this.adsLoader.requestAds(req);
            return true;
        } catch {
            return false;
        }
    }

    _onAdsLoaded(event) {
        const settings = new google.ima.AdsRenderingSettings();
        this.adsManager = event.getAdsManager(settings);

        this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, () => this._finish(true));
        this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, () => this._finish(false));
        this.adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, () => this._finish(false));
        this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, () => this._finish(false));
        this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, () => this._finish(true));

        try {
            this.adContainer.style.display = 'block';
            this.adsManager.init(window.innerWidth, window.innerHeight, google.ima.ViewMode.FULLSCREEN);
            this.adsManager.start();
        } catch {
            this._finish(false);
        }
    }

    _onAdError() {
        this._cleanup();
        if (this._callback) this._callback(false);
        this._callback = null;
    }

    _finish(completed) {
        this._cleanup();
        if (this._callback) this._callback(completed);
        this._callback = null;
    }

    _cleanup() {
        if (this.adsManager) {
            this.adsManager.destroy();
            this.adsManager = null;
        }
        if (this.adContainer) this.adContainer.style.display = 'none';
    }

    showRewarded(callback) {
        this._callback = callback;
        if (!this._request('rewarded')) {
            callback(false);
            this._callback = null;
        }
    }

    showInterstitial(callback) {
        this._callback = () => callback();
        if (!this._request('interstitial')) {
            callback();
            this._callback = null;
        }
    }
}

// =====================================================================
// MAIN GAME
// =====================================================================
class Game {
    constructor(canvas) {
        this.cvs = canvas;
        this.ctx = canvas.getContext('2d');
        this.audio = new Audio_();
        this.ads = new AdManager();
        this.ads.init();
        this.particles = new Particles();
        this.prog = new Progression();
        this.abil = new Abilities();
        this.abil.sync(this.prog);

        this.themeKey = pick(this.prog.unlockedThemes());
        this.theme = THEMES[this.themeKey];

        this.bgL = [
            new BGLayer(40,0.015,[0.5,1.5],[0.1,0.3]),
            new BGLayer(20,0.035,[1,3],[0.08,0.2]),
            new BGLayer(10,0.06,[1.5,4],[0.05,0.15]),
        ];

        this.state = 'MENU';
        this.score = 0; this.combo = 0; this.scoreDsp = 0;
        this.runTime = 0; this.phase = 0;

        this.rings = []; this.ringTmr = 0;
        this.whoosh = []; this.floats = [];
        this.pickups = [];

        this.gRot = 0; this.rotVel = 0;
        this.touching = false; this.lastTX = 0;

        this.ballAng = -Math.PI / 2;
        this.ballOrb = 0; this.ballPulse = 0;

        this.shkT = 0; this.shkX = 0; this.shkY = 0;
        this.spdM = 1; this.timeScale = 1;
        this.dFlash = 0; this.mTime = 0;
        this.newBest = false; this.revived = false; this.goT = 0;

        this.phAnn = ''; this.phAnnT = 0;
        this.od = 0; this.odCount = 0;
        this.nmT = 0;

        this.runSt = {};
        this.diffRate = CONFIG.DIFFICULTY_RATE;
        this._adaptDiff();

        this.w=0;this.h=0;this.cx=0;this.cy=0;this.maxR=0;
        this.btns={}; this.abBtns={};
        this.keys=new Set();
        this._lastInputKeys = false;

        this.dailyPop = 0; this.dailyAmt = 0; this.dailyGems = 0;
        this.lvlUpT = 0; this.lvlUpUnlocks = [];
        this.msnRes = null; this.xpEarned = 0;

        // Shop state
        this.shopCat = 'consumable';
        this.shopScroll = 0;
        this.shopTouchY = 0;
        this.shopDragging = false;

        // Consumable selection for pre-run
        this.selectedConsumables = { magnet:false, doubleCoin:false, extraLife:false };
        this.activeConsumables = { magnet:false, doubleCoin:false, extraLife:false };

        // Run currency earnings
        this.runCoins = 0; this.runGems = 0;

        // Boss wave tracking
        this.bossActive = false;
        this.bossLastScore = 0;

        // Reverse ring effect
        this.reverseT = 0;

        // Ad state
        this.adBusy = false;
        this.doubledRewards = false;

        // Multiplayer state
        this.mpMode = null;
        this.seededRng = null;
        this.challengeCode = '';
        this.challengeInput = '';

        // Versus state
        this.p1 = null;
        this.p2 = null;
        this.vsWinner = 0;
        this.vsCountdown = 0;
        this.vsTouches = {};

        this._resize(); this._input();
        this._lastT = performance.now();
        requestAnimationFrame(t => this._loop(t));
    }

    // ----- sizing -----
    _resize() {
        const dpr = window.devicePixelRatio || 1;
        this.w = window.innerWidth; this.h = window.innerHeight;
        this.cvs.width = this.w * dpr; this.cvs.height = this.h * dpr;
        this.cvs.style.width = this.w+'px'; this.cvs.style.height = this.h+'px';
        this.ctx.setTransform(dpr,0,0,dpr,0,0);

        this.cx = this.w / 2; this.cy = this.h * 0.38;
        const dim = Math.min(this.w, this.h);
        this.ballOrb = dim * CONFIG.BALL_ORBIT_FACTOR;
        this.maxR = dim * CONFIG.RING_START_FACTOR;

        const aby = this.h - CONFIG.ABIL_BTN_Y;
        this.abBtns.dash = { x: this.w * 0.22, y: aby, r: CONFIG.ABIL_BTN_R };
        this.abBtns.slow = { x: this.w * 0.78, y: aby, r: CONFIG.ABIL_BTN_R };
    }

    _adaptDiff() {
        const a = this.prog.avgScore();
        this.diffRate = a < 15 ? 0.012 : a > 35 ? 0.025 : CONFIG.DIFFICULTY_RATE;
    }

    // ----- input -----
    _input() {
        const tx = e => e.touches ? e.touches[0].clientX : e.clientX;
        const ty = e => e.touches ? e.touches[0].clientY : e.clientY;
        const hc = (b,x,y) => (x-b.x)**2+(y-b.y)**2 <= (b.r+12)**2;

        const start = e => {
            e.preventDefault(); this.audio.resume();

            if (e.touches && e.touches.length >= 2 && this.state === 'PLAYING') {
                this._doDash(); return;
            }
            const x = tx(e), y = ty(e);

            if (this.state === 'MENU') {
                if (this._hit('play',x,y))    { this.audio.click(); this._start(); return; }
                if (this._hit('versus',x,y))  { this.audio.click(); this.state='VS_LOBBY'; return; }
                if (this._hit('challenge',x,y)){ this.audio.click(); this.state='CHALLENGE_MENU'; this.challengeInput=''; return; }
                if (this._hit('shop',x,y))    { this.audio.click(); this.state='SHOP'; this.shopScroll=0; return; }
                if (this._hit('missions',x,y)){ this.audio.click(); this.state='MISSIONS'; return; }
                if (this._hit('themes',x,y))  { this.audio.click(); this._cycleTheme(); return; }
                if (this._hit('daily',x,y) && this.prog.canDaily()) {
                    this.audio.daily();
                    const dr = this.prog.claimDaily();
                    this.dailyAmt = dr.xp; this.dailyGems = dr.gems;
                    this.prog.addXp(dr.xp); this.dailyPop=2.5; return;
                }
                for (const cid of ['magnet','doubleCoin','extraLife']) {
                    if (this._hit('con_'+cid,x,y) && this.prog.getConsumable(cid) > 0) {
                        this.audio.click();
                        this.selectedConsumables[cid] = !this.selectedConsumables[cid];
                        return;
                    }
                }
                return;
            }
            if (this.state === 'MISSIONS') { this.state='MENU'; this.audio.click(); return; }
            if (this.state === 'SHOP') {
                if (this._hit('shopBack',x,y)) { this.audio.click(); this.state='MENU'; return; }
                for (let i = 0; i < SHOP_CATS.length; i++) {
                    if (this._hit('shopTab'+i,x,y)) { this.audio.click(); this.shopCat=SHOP_CATS[i]; this.shopScroll=0; return; }
                }
                const items = SHOP_ITEMS.filter(it => it.cat === this.shopCat);
                for (let i = 0; i < items.length; i++) {
                    if (this._hit('shopItem'+i,x,y)) { this._buyItem(items[i]); return; }
                }
                this.shopTouchY = y; this.shopDragging = true;
                return;
            }
            if (this.state === 'GAME_OVER') {
                if (this.adBusy) return;
                if (this._hit('restart',x,y)) { this.audio.click(); this._triggerInterstitialOr(() => { if (this.mpMode==='challenge') this._startChallenge(); else this._start(); }); return; }
                if (this._hit('goMenu',x,y))  { this.audio.click(); this._triggerInterstitialOr(() => { this.state='MENU'; this.mpMode=null; }); return; }
                if (this._hit('revive',x,y) && !this.revived) {
                    this.audio.click();
                    this.adBusy = true;
                    this.ads.showRewarded(ok => { this.adBusy = false; if (ok) this._revive(); });
                    return;
                }
                if (this._hit('doubleRwd',x,y) && !this.doubledRewards) {
                    this.audio.click();
                    this.adBusy = true;
                    this.ads.showRewarded(ok => {
                        this.adBusy = false;
                        if (ok) {
                            this.doubledRewards = true;
                            this.prog.addCoins(this.runCoins);
                            this.runCoins *= 2;
                            this.audio.buy();
                        }
                    });
                    return;
                }
                if (this.mpMode==='challenge' && this._hit('chalRetry',x,y)) { this.audio.click(); this._startChallenge(this.challengeCode); return; }
                if (this.mpMode==='challenge' && this._hit('chalCopy',x,y)) { navigator.clipboard?.writeText(this.challengeCode); this.audio.click(); return; }
                return;
            }
            if (this.state === 'VS_LOBBY') {
                if (this._hit('vsStart',x,y)) { this.audio.click(); this._startVersus(); return; }
                if (this._hit('vsBack',x,y)) { this.audio.click(); this.state='MENU'; return; }
                return;
            }
            if (this.state === 'CHALLENGE_MENU') {
                if (this._hit('chalBack',x,y)) { this.audio.click(); this.state='MENU'; return; }
                if (this._hit('chalNew',x,y)) { this.audio.click(); this._startChallenge(); return; }
                if (this._hit('chalInput',x,y)) {
                    const code = prompt('Enter challenge code:');
                    if (code) this.challengeInput = code.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
                    return;
                }
                if (this._hit('chalPlay',x,y) && this.challengeInput.length >= 4) { this.audio.click(); this._startChallenge(this.challengeInput); return; }
                return;
            }
            if (this.state === 'VERSUS_OVER') {
                if (this._hit('vsRematch',x,y)) { this.audio.click(); this._startVersus(); return; }
                if (this._hit('vsMenu',x,y)) { this.audio.click(); this.state='MENU'; this.mpMode=null; return; }
                return;
            }
            if (this.state === 'VERSUS') {
                if (e.touches) {
                    for (const touch of e.changedTouches) {
                        const isP1 = touch.clientX < this.w / 2;
                        this.vsTouches[touch.identifier] = isP1 ? 'p1' : 'p2';
                        const p = isP1 ? this.p1 : this.p2;
                        if (p && p.alive) { p.touching = true; p.lastTX = touch.clientX; }
                    }
                }
                return;
            }
            if (this.state === 'PLAYING') {
                if (this.abBtns.dash && this.abil.dash.ok && hc(this.abBtns.dash,x,y)) { this._doDash(); return; }
                if (this.abBtns.slow && this.abil.slow.ok && hc(this.abBtns.slow,x,y)) { this._doSlow(); return; }
            }
            this.touching = true; this.lastTX = x;
        };
        const move = e => {
            e.preventDefault();
            if (this.state === 'VERSUS' && e.touches) {
                for (const touch of e.changedTouches) {
                    const owner = this.vsTouches[touch.identifier];
                    if (!owner) continue;
                    const p = owner === 'p1' ? this.p1 : this.p2;
                    if (!p || !p.alive || !p.touching) continue;
                    const dx = touch.clientX - p.lastTX;
                    p.rotVel = dx * CONFIG.ROTATION_SENSITIVITY * 1.5;
                    p.ballAng += p.rotVel; p.lastTX = touch.clientX;
                }
                return;
            }
            if (this.state === 'SHOP' && this.shopDragging) {
                const y = ty(e);
                this.shopScroll -= (y - this.shopTouchY);
                this.shopScroll = Math.max(0, this.shopScroll);
                this.shopTouchY = y;
                return;
            }
            if (!this.touching || this.state !== 'PLAYING') return;
            const x = tx(e), dx = x - this.lastTX;
            const dir = this.reverseT > 0 ? -1 : 1;
            this.rotVel = dx * CONFIG.ROTATION_SENSITIVITY * dir;
            this.gRot += this.rotVel; this.lastTX = x;
        };
        const end = e => {
            e.preventDefault();
            if (this.state === 'VERSUS' && e.touches) {
                for (const touch of e.changedTouches) {
                    const owner = this.vsTouches[touch.identifier];
                    if (owner) { const p = owner === 'p1' ? this.p1 : this.p2; if (p) p.touching = false; delete this.vsTouches[touch.identifier]; }
                }
                return;
            }
            this.touching = false;
            this.shopDragging = false;
        };

        this.cvs.addEventListener('touchstart', start, {passive:false});
        this.cvs.addEventListener('touchmove',  move,  {passive:false});
        this.cvs.addEventListener('touchend',   end,   {passive:false});
        this.cvs.addEventListener('mousedown', start);
        this.cvs.addEventListener('mousemove', move);
        this.cvs.addEventListener('mouseup',   end);
        window.addEventListener('resize', () => this._resize());

        const KEY_ROT_SPEED = 3.8;

        window.addEventListener('keydown', e => {
            if (e.repeat) return;
            this.audio.resume();
            const k = e.key;
            this.keys.add(k);

            if (this.state === 'VS_LOBBY') {
                if (k === 'Enter' || k === ' ') { e.preventDefault(); this.audio.click(); this._startVersus(); }
                if (k === 'Escape') { e.preventDefault(); this.state = 'MENU'; this.audio.click(); }
                return;
            }
            if (this.state === 'CHALLENGE_MENU') {
                if (k === 'Backspace') { e.preventDefault(); this.challengeInput = this.challengeInput.slice(0, -1); return; }
                if (k === 'Enter' && this.challengeInput.length >= 4) { this._startChallenge(this.challengeInput); return; }
                if (k === 'Escape') { e.preventDefault(); this.state = 'MENU'; this.audio.click(); return; }
                if (k.length === 1 && /[A-Za-z0-9]/.test(k) && this.challengeInput.length < 6) { this.challengeInput += k.toUpperCase(); return; }
                return;
            }
            if (this.state === 'VERSUS_OVER') {
                if (k === 'Enter' || k === ' ') { e.preventDefault(); this.audio.click(); this._startVersus(); }
                if (k === 'Escape') { e.preventDefault(); this.state = 'MENU'; this.mpMode = null; this.audio.click(); }
                return;
            }
            if (this.state === 'VERSUS') {
                if (k === 'a' || k === 'A') { if (this.p1) this.p1._kL = true; }
                if (k === 'd' || k === 'D') { if (this.p1) this.p1._kR = true; }
                if (k === 'ArrowLeft') { e.preventDefault(); if (this.p2) this.p2._kL = true; }
                if (k === 'ArrowRight') { e.preventDefault(); if (this.p2) this.p2._kR = true; }
                if (k === 'Escape') { e.preventDefault(); this.state = 'MENU'; this.mpMode = null; this.audio.click(); }
                return;
            }

            if (k === 'Enter' || k === ' ') {
                e.preventDefault();
                if (this.state === 'MENU') { this.audio.click(); this._start(); }
                else if (this.state === 'MISSIONS') { this.state = 'MENU'; this.audio.click(); }
                else if (this.state === 'SHOP') { this.state = 'MENU'; this.audio.click(); }
                else if (this.state === 'GAME_OVER') { this.audio.click(); this._start(); }
            }
            if (k === 'Escape') {
                e.preventDefault();
                if (this.state === 'SHOP' || this.state === 'MISSIONS') { this.state = 'MENU'; this.audio.click(); }
                else if (this.state === 'GAME_OVER') { this.state = 'MENU'; this.mpMode = null; this.audio.click(); }
            }
            if (this.state === 'PLAYING') {
                if (k === 'w' || k === 'W' || k === 'ArrowUp') { e.preventDefault(); this._doDash(); }
                if (k === 's' || k === 'S' || k === 'ArrowDown') { e.preventDefault(); this._doSlow(); }
            }
        });
        window.addEventListener('keyup', e => {
            this.keys.delete(e.key);
            const k = e.key;
            if (this.p1) { if (k === 'a' || k === 'A') this.p1._kL = false; if (k === 'd' || k === 'D') this.p1._kR = false; }
            if (this.p2) { if (k === 'ArrowLeft') this.p2._kL = false; if (k === 'ArrowRight') this.p2._kR = false; }
        });
        this._KEY_ROT_SPEED = KEY_ROT_SPEED;
    }

    _hit(id,x,y) { const b=this.btns[id]; return b&&x>=b.x&&x<=b.x+b.w&&y>=b.y&&y<=b.y+b.h; }

    // ----- shop purchase -----
    _buyItem(item) {
        if (item.cat === 'consumable') {
            if (!this.prog.spend(item.currency, item.cost)) return;
            this.prog.addConsumable(item.id);
            this.audio.buy();
        } else if (item.cat === 'skin') {
            if (this.prog.hasSkin(item.id)) {
                this.prog.setSkin(item.id);
                this.audio.click();
            } else {
                if (!this.prog.spend(item.currency, item.cost)) return;
                this.prog.buySkin(item.id);
                this.prog.setSkin(item.id);
                this.audio.buy();
            }
        } else if (item.cat === 'theme') {
            if (this.prog.hasTheme(item.id)) {
                this.themeKey = item.id;
                this.theme = THEMES[item.id];
                this.audio.click();
            } else {
                if (!this.prog.spend(item.currency, item.cost)) return;
                this.prog.buyTheme(item.id);
                this.themeKey = item.id;
                this.theme = THEMES[item.id];
                this.audio.buy();
            }
        }
    }

    // ----- ads -----
    _triggerInterstitialOr(callback) {
        if (this.prog.d.runs > 0 && this.prog.d.runs % 3 === 0 && this.ads.ready) {
            this.adBusy = true;
            this.ads.showInterstitial(() => { this.adBusy = false; callback(); });
        } else {
            callback();
        }
    }

    // ----- abilities -----
    _doDash() {
        if (this.abil.useDash()) {
            this.audio.dash(); this.runSt.abils++;
            const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
            const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
            this.particles.emit(bx,by,15,this.theme.accent,200,3,0.4);
        }
    }
    _doSlow() {
        if (this.abil.useSlow()) { this.audio.slow(); this.runSt.abils++; }
    }

    // ----- state transitions -----
    _cycleTheme() {
        const t = this.prog.unlockedThemes();
        this.themeKey = t[(t.indexOf(this.themeKey)+1)%t.length];
        this.theme = THEMES[this.themeKey];
    }

    _start() {
        this.state='PLAYING';
        if (this.mpMode !== 'challenge') { this.mpMode = null; this.seededRng = null; this.challengeCode = ''; }
        this.score=0;this.scoreDsp=0;this.combo=0;this.spdM=1;this.timeScale=1;
        this.rings=[];this.whoosh=[];this.floats=[];this.pickups=[];
        this.ringTmr=CONFIG.RING_BASE_INTERVAL;
        this.gRot=0;this.rotVel=0;this.particles.clear();
        this.shkT=0;this.dFlash=0;this.newBest=false;this.revived=false;this.goT=0;
        this.ballPulse=0;this.runTime=0;this.phase=0;
        this.phAnn='';this.phAnnT=0;this.od=0;this.odCount=0;this.nmT=0;
        this.bossActive=false;this.bossLastScore=0;
        this.reverseT=0;
        this.runCoins=0;this.runGems=0;

        this.abil.reset(); this.abil.sync(this.prog);

        this.themeKey=pick(this.prog.unlockedThemes());
        this.theme=THEMES[this.themeKey];
        this.runSt={time:0,score:0,maxCombo:0,breaks:0,abils:0,maxPhase:0,od:0};
        this._adaptDiff();
        this.msnRes=null;this.xpEarned=0;this.lvlUpT=0;

        // Activate selected consumables
        this.activeConsumables = { magnet:false, doubleCoin:false, extraLife:false };
        for (const cid of ['magnet','doubleCoin','extraLife']) {
            if (this.selectedConsumables[cid] && this.prog.useConsumable(cid)) {
                this.activeConsumables[cid] = true;
            }
        }
        this.selectedConsumables = { magnet:false, doubleCoin:false, extraLife:false };
    }

    _revive() {
        this.revived=true;this.state='PLAYING';this.dFlash=0;this.goT=0;
        this.combo=Math.max(0,this.combo-3);this.spdM=Math.max(1,this.spdM-0.3);
        this.rings=this.rings.filter(r=>r.radius>this.ballOrb+30);
    }

    // =====================================================================
    // VERSUS MODE (local 2-player)
    // =====================================================================
    _startVersus() {
        this.state = 'VERSUS';
        this.mpMode = 'versus';
        this.seededRng = new SeededRandom(Date.now());

        this.rings = []; this.whoosh = []; this.floats = []; this.pickups = [];
        this.particles.clear();
        this.ringTmr = CONFIG.RING_BASE_INTERVAL;
        this.runTime = 0; this.phase = 0;
        this.shkT = 0; this.dFlash = 0;
        this.phAnn = ''; this.phAnnT = 0;
        this.vsWinner = 0; this.goT = 0;
        this.vsCountdown = 3;
        this.vsTouches = {};
        this.ballPulse = 0;

        this.themeKey = pick(this.prog.unlockedThemes());
        this.theme = THEMES[this.themeKey];
        this._adaptDiff();

        this.p1 = {
            ballAng: -Math.PI / 2 - 0.8, rotVel: 0,
            score: 0, combo: 0, scoreDsp: 0, alive: true,
            color: '#4488FF', glow: '#88BBFF', name: 'P1',
            touching: false, lastTX: 0, _kL: false, _kR: false,
        };
        this.p2 = {
            ballAng: -Math.PI / 2 + 0.8, rotVel: 0,
            score: 0, combo: 0, scoreDsp: 0, alive: true,
            color: '#FF4466', glow: '#FF88AA', name: 'P2',
            touching: false, lastTX: 0, _kL: false, _kR: false,
        };
    }

    _updateVersus(dt) {
        if (this.vsCountdown > 0) { this.vsCountdown -= dt; return; }

        this.runTime += dt;

        let np = 0;
        for (let i = PHASES.length - 1; i >= 0; i--) if (this.runTime >= PHASES[i].at) { np = i; break; }
        if (np > this.phase) {
            this.phase = np;
            this.phAnn = this.phase === 4 ? 'CHAOS MODE' : PHASES[this.phase].name.toUpperCase();
            this.phAnnT = 2.5;
            if (this.phase === 4) this.audio.chaos(); else this.audio.phaseUp();
        }
        if (this.phAnnT > 0) this.phAnnT -= dt;

        for (const p of [this.p1, this.p2]) {
            if (!p.alive) continue;
            const kL = p._kL, kR = p._kR;
            if (kL || kR) {
                const dir = (kR ? 1 : 0) - (kL ? 1 : 0);
                p.rotVel = dir * this._KEY_ROT_SPEED * dt;
                p.ballAng += p.rotVel;
            } else if (!p.touching) {
                p.ballAng += p.rotVel;
                p.rotVel *= CONFIG.ROTATION_DAMPING;
            }
            if (p.scoreDsp < p.score)
                p.scoreDsp = Math.min(p.score, p.scoreDsp + dt * Math.max(30, (p.score - p.scoreDsp) * 8));
        }

        const maxCombo = Math.max(this.p1.combo, this.p2.combo);
        const spdM = 1 + maxCombo * CONFIG.COMBO_SPEED_BONUS * 0.7;
        const speed = CONFIG.RING_BASE_SPEED * Math.min(spdM, CONFIG.MAX_SPEED_MULT) * this.theme.speedMod;

        const interval = Math.max(CONFIG.MIN_INTERVAL * 1.1,
            CONFIG.RING_BASE_INTERVAL / (1 + maxCombo * CONFIG.COMBO_INTERVAL_BONUS * 0.5));
        this.ringTmr += dt;
        if (this.ringTmr >= interval) { this.ringTmr -= interval; this._spawnVersus(); }

        for (const ring of this.rings) {
            const prev = ring.radius;
            ring.update(dt, speed);

            if (!ring.passed && prev > this.ballOrb && ring.radius <= this.ballOrb) {
                ring.passed = true;
                for (const p of [this.p1, this.p2]) {
                    if (!p.alive) continue;
                    if (ring.isGapAt(p.ballAng)) {
                        p.combo++;
                        const mult = Math.min(1 + Math.floor(p.combo / 3) * 0.5, CONFIG.MAX_MULTIPLIER);
                        p.score += Math.ceil(mult);
                        this.audio.pass(p.combo);
                        const bx = this.cx + Math.cos(p.ballAng) * this.ballOrb;
                        const by = this.cy + Math.sin(p.ballAng) * this.ballOrb;
                        this.particles.emit(bx, by, Math.min(8 + p.combo * 2, 25), ring.color, 80 + Math.min(p.combo, 15) * 5, 3, 0.4);
                        this.whoosh.push({ radius: this.ballOrb, alpha: 0.3, color: ring.color });
                        if (Math.ceil(mult) > 1) this.floats.push(new FloatText(`+${Math.ceil(mult)}`, bx, by - 20, ring.color, 14));
                    } else {
                        p.alive = false; p.combo = 0;
                        const bx = this.cx + Math.cos(p.ballAng) * this.ballOrb;
                        const by = this.cy + Math.sin(p.ballAng) * this.ballOrb;
                        this.particles.emit(bx, by, 35, p.color, 200, 5, 0.7);
                        this.particles.emit(bx, by, 20, '#FFFFFF', 140, 3, 0.5);
                        this.shkT = CONFIG.SHAKE_DURATION * 0.6;
                        this.dFlash = 0.5;
                        this.audio.death();
                    }
                }
            }
        }
        this.rings = this.rings.filter(r => r.alive);

        const p1a = this.p1.alive, p2a = this.p2.alive;
        if (!p1a || !p2a) {
            if (!p1a && !p2a) this.vsWinner = this.p1.score > this.p2.score ? 1 : this.p2.score > this.p1.score ? 2 : 3;
            else this.vsWinner = p1a ? 1 : 2;
            this.state = 'VERSUS_OVER'; this.goT = 0;
        }
    }

    _spawnVersus() {
        const rng = this.seededRng;
        const maxScore = Math.max(this.p1.score, this.p2.score);
        const diff = clamp(maxScore * this.diffRate, 0, 1);
        const nSeg = Math.floor(lerp(5, 8, diff * 0.7 + rng.next() * 0.3));
        const maxG = Math.max(1, Math.floor(nSeg * lerp(0.45, 0.22, diff)));
        const nGap = Math.max(1, Math.floor(rng.range(1, maxG + 1)));
        const segs = new Array(nSeg).fill(true);
        const used = new Set();
        while (used.size < nGap) { const i = Math.floor(rng.next() * nSeg); if (!used.has(i)) { used.add(i); segs[i] = false; } }

        const ph = PHASES[this.phase];
        const type = rng.pick(ph.types);
        const col = rng.pick(this.theme.colors);
        const rot = rng.next() * Math.PI * 2;
        const maxSp = diff * CONFIG.MAX_SPIN;
        const spin = (type !== 'moving' && maxSp > 0.05) ? rng.range(-maxSp, maxSp) : 0;
        this.rings.push(new Ring(this.maxR, segs, col, rot, spin, type, this.theme));
    }

    _drawVsBall(c, p) {
        if (!p.alive) return;
        const bx = this.cx + Math.cos(p.ballAng) * this.ballOrb;
        const by = this.cy + Math.sin(p.ballAng) * this.ballOrb;
        const pulse = 1 + Math.sin(this.ballPulse) * 0.08;
        const r = CONFIG.BALL_RADIUS * pulse;

        const glow = c.createRadialGradient(bx, by, r * 0.4, bx, by, r * 2.8);
        glow.addColorStop(0, rgba(p.glow, 0.35)); glow.addColorStop(1, rgba(p.glow, 0));
        c.fillStyle = glow; c.beginPath(); c.arc(bx, by, r * 2.8, 0, Math.PI * 2); c.fill();

        c.beginPath(); c.arc(bx, by, r, 0, Math.PI * 2); c.fillStyle = p.color; c.fill();
        c.beginPath(); c.arc(bx - r * 0.25, by - r * 0.25, r * 0.35, 0, Math.PI * 2);
        c.fillStyle = rgba('#FFFFFF', 0.55); c.fill();

        const sz = Math.min(this.w * 0.025, 10);
        c.font = `700 ${sz}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'bottom';
        c.fillStyle = rgba(p.color, 0.7);
        c.fillText(p.name, bx, by - r - 6);
    }

    _drawVersusPlay(c) {
        this._drawBG(c);

        c.beginPath(); c.arc(this.cx, this.cy, this.ballOrb, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(255,255,255,0.04)'; c.lineWidth = 1; c.stroke();

        const sorted = [...this.rings].sort((a, b) => b.radius - a.radius);
        for (const r of sorted) r.draw(c, this.cx, this.cy, 0);
        this._drawWhooshes(c);
        this._drawVsBall(c, this.p1);
        this._drawVsBall(c, this.p2);
        this.particles.draw(c);
        this.floats.forEach(f => f.draw(c));

        c.setLineDash([4, 8]);
        c.beginPath(); c.moveTo(this.cx, this.h * 0.85); c.lineTo(this.cx, this.h);
        c.strokeStyle = 'rgba(255,255,255,0.08)'; c.lineWidth = 1; c.stroke(); c.setLineDash([]);

        this._drawVersusHUD(c);
        this._drawPhaseAnn(c);

        if (this.vsCountdown > 0) {
            const n = Math.ceil(this.vsCountdown);
            const sz = Math.min(this.w * 0.2, 80);
            c.globalAlpha = Math.min(1, (this.vsCountdown % 1) * 3);
            c.font = `900 ${sz}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
            c.shadowColor = '#FFFFFF'; c.shadowBlur = 30; c.fillStyle = '#FFFFFF';
            c.fillText(n, this.cx, this.cy);
            c.shadowBlur = 0; c.globalAlpha = 1;
        }
    }

    _drawVersusHUD(c) {
        const fs = Math.min(this.w * 0.09, 38);
        const sy = Math.max(this.h * 0.06, 40);
        const ls = Math.min(this.w * 0.03, 12);

        c.font = `800 ${fs}px ${CONFIG.FONT}`; c.textAlign = 'left'; c.textBaseline = 'top';
        c.fillStyle = this.p1.alive ? this.p1.color : rgba(this.p1.color, 0.3);
        c.fillText(Math.floor(this.p1.scoreDsp), 16, sy);
        c.font = `700 ${ls}px ${CONFIG.FONT}`; c.fillStyle = rgba(this.p1.color, 0.5);
        c.fillText('P1', 16, sy - ls - 4);
        if (this.p1.combo > 2) {
            c.font = `600 ${Math.min(this.w * 0.025, 10)}px ${CONFIG.FONT}`;
            c.fillStyle = rgba(this.p1.color, 0.6);
            c.fillText(`${this.p1.combo}x`, 16, sy + fs + 4);
        }
        if (!this.p1.alive) { c.font = `700 ${ls}px ${CONFIG.FONT}`; c.fillStyle = rgba('#FF4444', 0.6); c.fillText('OUT', 16 + 60, sy + 4); }

        c.font = `800 ${fs}px ${CONFIG.FONT}`; c.textAlign = 'right'; c.textBaseline = 'top';
        c.fillStyle = this.p2.alive ? this.p2.color : rgba(this.p2.color, 0.3);
        c.fillText(Math.floor(this.p2.scoreDsp), this.w - 16, sy);
        c.font = `700 ${ls}px ${CONFIG.FONT}`; c.textAlign = 'right';
        c.fillStyle = rgba(this.p2.color, 0.5);
        c.fillText('P2', this.w - 16, sy - ls - 4);
        if (this.p2.combo > 2) {
            c.font = `600 ${Math.min(this.w * 0.025, 10)}px ${CONFIG.FONT}`; c.textAlign = 'right';
            c.fillStyle = rgba(this.p2.color, 0.6);
            c.fillText(`${this.p2.combo}x`, this.w - 16, sy + fs + 4);
        }
        if (!this.p2.alive) { c.font = `700 ${ls}px ${CONFIG.FONT}`; c.textAlign = 'right'; c.fillStyle = rgba('#FF4444', 0.6); c.fillText('OUT', this.w - 76, sy + 4); }

        const ts = Math.min(this.w * 0.03, 12);
        c.font = `500 ${ts}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillStyle = 'rgba(255,255,255,0.35)';
        const sec = Math.floor(this.runTime);
        c.fillText(`${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`, this.cx, sy - ts - 4);

        c.font = `800 ${Math.min(this.w * 0.035, 14)}px ${CONFIG.FONT}`;
        c.fillStyle = 'rgba(255,255,255,0.12)'; c.fillText('VS', this.cx, sy + fs * 0.3);
    }

    _drawVersusOver(c) {
        const t = this.goT;
        c.globalAlpha = t * 0.7; c.fillStyle = '#000'; c.fillRect(0, 0, this.w, this.h); c.globalAlpha = t;

        const winSz = Math.min(this.w * 0.1, 40);
        c.font = `900 ${winSz}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
        if (this.vsWinner === 3) { c.fillStyle = '#FFE66D'; c.fillText('DRAW!', this.cx, this.h * 0.15); }
        else { const wp = this.vsWinner === 1 ? this.p1 : this.p2; c.shadowColor = wp.color; c.shadowBlur = 20; c.fillStyle = wp.color; c.fillText(`${wp.name} WINS!`, this.cx, this.h * 0.15); c.shadowBlur = 0; }

        const scSz = Math.min(this.w * 0.06, 24), scY = this.h * 0.26;
        c.font = `800 ${scSz * 1.8}px ${CONFIG.FONT}`; c.textAlign = 'center';
        c.fillStyle = this.p1.color; c.fillText(this.p1.score, this.cx * 0.5, scY);
        c.fillStyle = this.p2.color; c.fillText(this.p2.score, this.cx * 1.5, scY);
        c.font = `700 ${scSz * 0.6}px ${CONFIG.FONT}`;
        c.fillStyle = rgba(this.p1.color, 0.5); c.fillText('P1', this.cx * 0.5, scY - scSz * 1.5);
        c.fillStyle = rgba(this.p2.color, 0.5); c.fillText('P2', this.cx * 1.5, scY - scSz * 1.5);
        c.font = `800 ${scSz * 0.7}px ${CONFIG.FONT}`; c.fillStyle = 'rgba(255,255,255,0.2)'; c.fillText('VS', this.cx, scY);

        const bw = Math.min(this.w * 0.38, 150), bh = 48, btnGap = 10;
        const totalBW = bw * 2 + btnGap;
        const bx1 = this.cx - totalBW / 2, bx2 = bx1 + bw + btnGap, by = this.h * 0.42;

        this.btns.vsRematch = { x: bx1, y: by, w: bw, h: bh };
        this._btn(c, bx1, by, bw, bh, 'REMATCH', this.theme.accent, rgba(this.theme.accent, 0.7));
        this.btns.vsMenu = { x: bx2, y: by, w: bw, h: bh };
        c.beginPath(); this._rr(c, bx2, by, bw, bh, 24);
        c.fillStyle = 'rgba(255,255,255,0.08)'; c.fill();
        c.beginPath(); this._rr(c, bx2, by, bw, bh, 24);
        c.strokeStyle = 'rgba(255,255,255,0.22)'; c.lineWidth = 2; c.stroke();
        c.font = `700 ${Math.min(this.w * 0.045, 18)}px ${CONFIG.FONT}`; c.fillStyle = 'rgba(255,255,255,0.7)';
        c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('MENU', bx2 + bw / 2, by + bh / 2);
        c.globalAlpha = 1;
    }

    _drawVsLobby(c) {
        c.fillStyle = 'rgba(0,0,0,0.8)'; c.fillRect(0, 0, this.w, this.h);
        const ts = Math.min(this.w * 0.08, 32);
        c.font = `800 ${ts}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = '#FFFFFF'; c.fillText('VS LOCAL', this.cx, this.h * 0.10);

        const infoSz = Math.min(this.w * 0.035, 14);
        c.font = `600 ${infoSz}px ${CONFIG.FONT}`;
        c.fillStyle = '#4488FF'; c.fillText('PLAYER 1', this.cx * 0.5, this.h * 0.22);
        c.font = `400 ${infoSz * 0.9}px ${CONFIG.FONT}`; c.fillStyle = 'rgba(255,255,255,0.4)';
        c.fillText('A / D keys', this.cx * 0.5, this.h * 0.27);
        c.fillText('or left side touch', this.cx * 0.5, this.h * 0.31);

        c.font = `600 ${infoSz}px ${CONFIG.FONT}`;
        c.fillStyle = '#FF4466'; c.fillText('PLAYER 2', this.cx * 1.5, this.h * 0.22);
        c.font = `400 ${infoSz * 0.9}px ${CONFIG.FONT}`; c.fillStyle = 'rgba(255,255,255,0.4)';
        c.fillText('\u2190 / \u2192 keys', this.cx * 1.5, this.h * 0.27);
        c.fillText('or right side touch', this.cx * 1.5, this.h * 0.31);

        c.font = `900 ${Math.min(this.w * 0.06, 24)}px ${CONFIG.FONT}`;
        c.fillStyle = 'rgba(255,255,255,0.15)'; c.fillText('VS', this.cx, this.h * 0.26);
        c.setLineDash([4, 8]); c.beginPath(); c.moveTo(this.cx, this.h * 0.20); c.lineTo(this.cx, this.h * 0.35);
        c.strokeStyle = 'rgba(255,255,255,0.1)'; c.lineWidth = 1; c.stroke(); c.setLineDash([]);

        c.font = `400 ${infoSz * 0.85}px ${CONFIG.FONT}`; c.fillStyle = 'rgba(255,255,255,0.3)'; c.textAlign = 'center';
        c.fillText('Both players dodge the same rings', this.cx, this.h * 0.39);
        c.fillText('Last one standing wins!', this.cx, this.h * 0.43);

        const bw = Math.min(this.w * 0.55, 220), bh = 56, by = this.h * 0.51;
        this.btns.vsStart = { x: this.cx - bw / 2, y: by, w: bw, h: bh };
        this._btn(c, this.cx - bw / 2, by, bw, bh, 'START', this.theme.accent, rgba(this.theme.accent, 0.7));

        c.font = `600 ${Math.min(this.w * 0.035, 14)}px ${CONFIG.FONT}`;
        c.textAlign = 'left'; c.fillStyle = 'rgba(255,255,255,0.5)';
        c.fillText('\u2190 Back', 20, this.h * 0.05);
        this.btns.vsBack = { x: 10, y: this.h * 0.05 - 15, w: 80, h: 30 };
    }

    // =====================================================================
    // CHALLENGE MODE (seeded runs)
    // =====================================================================
    _startChallenge(code) {
        this.challengeCode = code || generateSeedCode();
        this.seededRng = new SeededRandom(seedFromCode(this.challengeCode));
        this.mpMode = 'challenge';
        this._start();
        this.themeKey = 'neon'; this.theme = THEMES['neon'];
    }

    _drawChallengeMenu(c) {
        c.fillStyle = 'rgba(0,0,0,0.8)'; c.fillRect(0, 0, this.w, this.h);
        const ts = Math.min(this.w * 0.08, 32);
        c.font = `800 ${ts}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = '#FFFFFF'; c.fillText('CHALLENGE', this.cx, this.h * 0.12);

        const subSz = Math.min(this.w * 0.035, 14);
        c.font = `400 ${subSz}px ${CONFIG.FONT}`; c.fillStyle = 'rgba(255,255,255,0.4)';
        c.fillText('Same seed = same ring pattern', this.cx, this.h * 0.17);

        const bw = Math.min(this.w * 0.55, 220), bh = 52;
        const by1 = this.h * 0.26;
        this.btns.chalNew = { x: this.cx - bw / 2, y: by1, w: bw, h: bh };
        this._btn(c, this.cx - bw / 2, by1, bw, bh, 'NEW CHALLENGE', this.theme.accent, rgba(this.theme.accent, 0.7));

        c.font = `600 ${Math.min(this.w * 0.035, 14)}px ${CONFIG.FONT}`;
        c.fillStyle = 'rgba(255,255,255,0.2)'; c.fillText('or enter a code', this.cx, this.h * 0.37);

        const inputW = Math.min(this.w * 0.6, 240), inputH = 50;
        const inputX = this.cx - inputW / 2, inputY = this.h * 0.41;
        c.beginPath(); this._rr(c, inputX, inputY, inputW, inputH, 14);
        c.fillStyle = 'rgba(255,255,255,0.04)'; c.fill();
        c.beginPath(); this._rr(c, inputX, inputY, inputW, inputH, 14);
        c.strokeStyle = this.challengeInput.length > 0 ? this.theme.accent : 'rgba(255,255,255,0.15)';
        c.lineWidth = this.challengeInput.length > 0 ? 2 : 1; c.stroke();

        const codeSz = Math.min(this.w * 0.08, 32);
        c.font = `800 ${codeSz}px ${CONFIG.FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = this.challengeInput.length > 0 ? '#FFFFFF' : 'rgba(255,255,255,0.2)';
        c.fillText(this.challengeInput.length > 0 ? this.challengeInput : 'TYPE / TAP', this.cx, inputY + inputH / 2);
        this.btns.chalInput = { x: inputX, y: inputY, w: inputW, h: inputH };

        if (this.challengeInput.length >= 4) {
            const by2 = this.h * 0.53;
            this.btns.chalPlay = { x: this.cx - bw / 2, y: by2, w: bw, h: bh };
            this._btn(c, this.cx - bw / 2, by2, bw, bh, 'PLAY', this.theme.accent, rgba(this.theme.accent, 0.7));
        }

        c.font = `600 ${Math.min(this.w * 0.035, 14)}px ${CONFIG.FONT}`;
        c.textAlign = 'left'; c.fillStyle = 'rgba(255,255,255,0.5)';
        c.fillText('\u2190 Back', 20, this.h * 0.07);
        this.btns.chalBack = { x: 10, y: this.h * 0.07 - 15, w: 80, h: 30 };
    }

    // ----- ring/pickup spawning -----
    _spawn() {
        const rng = this.seededRng;
        const _r = rng ? () => rng.next() : Math.random;
        const _rn = rng ? (a,b) => rng.range(a,b) : rand;
        const _pk = rng ? (arr) => rng.pick(arr) : pick;

        const diff = clamp(this.score * this.diffRate, 0, 1);
        const nSeg = Math.floor(lerp(5,8, diff*0.7 + _r()*0.3));
        const maxG = Math.max(1, Math.floor(nSeg * lerp(0.45, 0.18, diff)));
        const nGap = Math.max(1, Math.floor(_rn(1, maxG+1)));
        const segs = new Array(nSeg).fill(true);
        const used = new Set();
        while(used.size < nGap){const i=Math.floor(_r()*nSeg);if(!used.has(i)){used.add(i);segs[i]=false;}}

        const ph = PHASES[this.phase];
        const type = _pk(ph.types);
        const col = _pk(this.theme.colors);
        const rot = _r() * Math.PI * 2;
        const maxSp = diff * CONFIG.MAX_SPIN;
        const spin = (type!=='moving' && maxSp>0.05) ? _rn(-maxSp,maxSp) : 0;
        const ring = new Ring(this.maxR, segs, col, rot, spin, type, this.theme);
        this.rings.push(ring);

        const sa = (Math.PI * 2) / nSeg;
        for (let i = 0; i < nSeg; i++) {
            if (segs[i]) continue;
            if (_r() < 0.25) {
                const pAngle = rot + (i + 0.5) * sa;
                const pType = _r() < 0.03 ? 'gem' : 'coin';
                this.pickups.push(new Pickup(this.maxR, pAngle, pType));
            }
        }
    }

    _spawnBoss() {
        if (this.bossActive) return;
        this.bossActive = true;

        // Clear rings that are close to the ball so the player has breathing room
        this.rings = this.rings.filter(r => r.radius > this.maxR * 0.5);

        const nSeg = 7;
        const segs = new Array(nSeg).fill(true);
        const g1 = Math.floor(Math.random() * nSeg);
        segs[g1] = false;
        segs[(g1 + Math.floor(nSeg / 2)) % nSeg] = false;

        const col = '#FF2244';
        const rot = Math.random() * Math.PI * 2;
        const spin = rand(-0.35, 0.35);
        const ring = new Ring(this.maxR, segs, col, rot, spin, 'normal', this.theme);
        ring.isBoss = true;
        ring.bossHp = 3;
        ring.bossMaxHp = 3;
        this.rings.push(ring);

        // Announcement + brief slowdown
        this.phAnn = 'BOSS INCOMING';
        this.phAnnT = 2.0;
        this.shkT = 0.15;
        this.audio.bossHit();
    }

    // ----- update -----
    _update(dt) {
        this.mTime += dt;
        for (const l of this.bgL) l.update(dt);
        if (this.dailyPop > 0) this.dailyPop -= dt;

        if (this.state === 'PLAYING') {
            let ts = 1;
            if (this.abil.isSlow()) ts = 0.3;
            if (this.nmT > 0) ts = Math.min(ts, 0.45);
            if (this.phAnnT > 1.8) ts = Math.min(ts, 0.5);
            if (this.abil.isDash()) ts *= 2.5;
            if (this.od > 0) ts *= 1.25;
            this.timeScale = ts;

            const gdt = dt * ts;

            this.runTime += dt;
            this.runSt.time = this.runTime;
            this.runSt.score = this.score;
            this.runSt.maxCombo = Math.max(this.runSt.maxCombo, this.combo);

            // Reverse timer
            if (this.reverseT > 0) this.reverseT -= dt;

            // Phase evolution
            let np = 0;
            for (let i = PHASES.length - 1; i >= 0; i--) if (this.runTime >= PHASES[i].at) { np = i; break; }
            if (np > this.phase) {
                this.phase = np;
                this.runSt.maxPhase = Math.max(this.runSt.maxPhase, this.phase);
                this.phAnn = this.phase === 4 ? 'CHAOS MODE' : PHASES[this.phase].name.toUpperCase();
                this.phAnnT = 2.5;
                if (this.phase === 4) { this.audio.chaos(); this.shkT = 0.5; }
                else this.audio.phaseUp();
            }
            if (this.phAnnT > 0) this.phAnnT -= dt;

            if (this.nmT > 0) this.nmT -= dt;

            this.abil.update(dt);

            // Keyboard rotation
            const kL = this.keys.has('a') || this.keys.has('A') || this.keys.has('ArrowLeft');
            const kR = this.keys.has('d') || this.keys.has('D') || this.keys.has('ArrowRight');
            if (kL || kR) {
                let dir = (kR ? 1 : 0) - (kL ? 1 : 0);
                if (this.reverseT > 0) dir *= -1;
                this.rotVel = dir * this._KEY_ROT_SPEED * dt;
                this.gRot += this.rotVel;
                this._lastInputKeys = true;
            } else if (!this.touching) {
                if (this._lastInputKeys) { this.rotVel = 0; this._lastInputKeys = false; }
                this.gRot += this.rotVel;
                this.rotVel *= CONFIG.ROTATION_DAMPING;
            }

            // Magnetic ring pull effect
            for (const ring of this.rings) {
                if (ring.type === 'magnetic' && ring.radius > this.ballOrb && ring.radius < this.maxR * 0.7) {
                    const eff = this.ballAng - this.gRot;
                    const solidAng = ring.nearestSolidAngle(eff);
                    const diff2 = normAngle(solidAng) - normAngle(eff);
                    let pull = diff2;
                    if (pull > Math.PI) pull -= Math.PI * 2;
                    const strength = CONFIG.MAGNETIC_STRENGTH * (1 - ring.radius / this.maxR) * gdt;
                    this.gRot -= pull * strength;
                }
            }

            // Speed
            const tgt = 1 + this.combo * CONFIG.COMBO_SPEED_BONUS;
            let maxS = CONFIG.MAX_SPEED_MULT;
            if (this.phase === 4) maxS *= 1.3;
            this.spdM = lerp(this.spdM, Math.min(tgt, maxS), dt * 2);

            const speed = CONFIG.RING_BASE_SPEED * this.spdM * this.theme.speedMod;
            const interval = Math.max(CONFIG.MIN_INTERVAL,
                CONFIG.RING_BASE_INTERVAL / (1 + this.combo * CONFIG.COMBO_INTERVAL_BONUS));

            this.ringTmr += gdt;
            if (this.ringTmr >= interval && !this.bossActive) { this.ringTmr -= interval; this._spawn(); }

            // Boss wave check
            if (this.score > 0 && this.score >= this.bossLastScore + CONFIG.BOSS_INTERVAL && !this.bossActive) {
                this.bossLastScore = Math.floor(this.score / CONFIG.BOSS_INTERVAL) * CONFIG.BOSS_INTERVAL;
                this._spawnBoss();
            }

            // Overdrive
            if (this.od > 0) {
                this.od -= dt;
                const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
                const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
                this.particles.emitTrail(bx, by, '#FFD700');
                this.particles.emitTrail(bx, by, '#FFFFFF');
                if (this.od <= 0) {
                    this.od = 0; this.combo = 0; this.audio.odEnd();
                    this.nmT = 0.3;
                    this.floats.push(new FloatText('OVERDRIVE END', this.cx, this.cy - 60, '#FFD700', 20));
                }
            }

            // Ball skin trail
            const skin = BALL_SKINS[this.prog.d.activeSkin] || BALL_SKINS.default;
            if (skin.trail && this.state === 'PLAYING') {
                const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
                const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
                if (Math.random() < skin.trail.rate * dt * 10) {
                    this.particles.emitTrail(bx, by, pick(skin.trail.colors));
                }
            }

            // Rings collision
            for (const ring of this.rings) {
                const prev = ring.radius;
                ring.update(gdt, ring.isBoss ? speed * 0.55 : speed);

                if (!ring.passed && prev > this.ballOrb && ring.radius <= this.ballOrb) {
                    if (ring.isBoss) {
                        const eff = this.ballAng - this.gRot;
                        if (ring.isGapAt(eff) || this.od > 0) {
                            this._bossHit(ring);
                        } else if (this.abil.hasShield()) {
                            this._shieldHit(ring);
                        } else {
                            this._die(); return;
                        }
                    } else if (ring.type === 'phaseSwitch' && !ring.phVis) {
                        this._pass(ring);
                    } else if (ring.type === 'breakable' && this.abil.isDash()) {
                        this._break(ring);
                    } else {
                        const eff = this.ballAng - this.gRot;
                        if (ring.isGapAt(eff)) {
                            const nm = ring.nearMissDist(eff);
                            this._pass(ring);
                            if (nm > 0 && nm < CONFIG.NEAR_MISS_DEG) this._nearMiss(ring);
                            if (ring.type === 'reverse') {
                                this.reverseT = CONFIG.REVERSE_DURATION;
                                this.audio.reverse();
                                this.floats.push(new FloatText('REVERSED!', this.cx, this.cy - 50, '#FF4444', 20));
                            }
                        } else if (this.od > 0) {
                            this._break(ring);
                        } else if (this.abil.hasShield()) {
                            this._shieldHit(ring);
                        } else {
                            this._die(); return;
                        }
                    }
                }
            }
            this.rings = this.rings.filter(r => r.alive);

            // Pickup collection
            const collectAngle = this.activeConsumables.magnet ? CONFIG.MAGNET_COLLECT_ANGLE : CONFIG.PICKUP_COLLECT_ANGLE;
            for (const p of this.pickups) {
                p.update(dt, speed);
                if (!p.alive) continue;
                if (Math.abs(p.radius - this.ballOrb) < 15) {
                    const eff = normAngle(this.ballAng - this.gRot);
                    const pAng = normAngle(p.angle);
                    let aDiff = Math.abs(eff - pAng);
                    if (aDiff > Math.PI) aDiff = Math.PI * 2 - aDiff;
                    if (aDiff < collectAngle) {
                        p.alive = false;
                        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
                        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
                        if (p.type === 'gem') {
                            this.runGems++;
                            this.audio.gem();
                            this.particles.emit(bx, by, 12, '#AA44FF', 120, 3, 0.4);
                            this.floats.push(new FloatText('+1 \u{1F48E}', bx, by-25, '#CC66FF', 16));
                        } else {
                            let amt = this.activeConsumables.doubleCoin ? 2 : 1;
                            this.runCoins += amt;
                            this.audio.coin();
                            this.particles.emit(bx, by, 8, '#FFD700', 80, 2, 0.3);
                            this.floats.push(new FloatText(`+${amt} \u{1FA99}`, bx, by-25, '#FFD700', 14));
                        }
                    }
                }
            }
            this.pickups = this.pickups.filter(p => p.alive);

            // Charge abilities
            this.abil.charge(gdt * 0.8);
            if (this.abil.shield.ok && !this.abil.shield.ready && this.abil.shield.charge >= this.abil.shield.max) {
                this.audio.shieldR();
            }
        }

        if (this.state === 'VERSUS') this._updateVersus(dt);
        if (this.state === 'GAME_OVER' || this.state === 'VERSUS_OVER') this.goT = Math.min(this.goT + dt * 4, 1);

        this.ballPulse += dt * 3;
        if (this.scoreDsp < this.score)
            this.scoreDsp = Math.min(this.score, this.scoreDsp + dt * Math.max(30, (this.score - this.scoreDsp) * 8));

        if (this.shkT > 0) {
            this.shkT -= dt;
            const i = CONFIG.SHAKE_INTENSITY * (this.shkT / CONFIG.SHAKE_DURATION);
            this.shkX = (Math.random()-0.5)*2*i; this.shkY = (Math.random()-0.5)*2*i;
        } else { this.shkX = 0; this.shkY = 0; }

        if (this.dFlash > 0) this.dFlash = Math.max(0, this.dFlash - dt * 3);
        if (this.lvlUpT > 0) this.lvlUpT -= dt;

        this.whoosh = this.whoosh.filter(w => { w.radius += 280*dt; w.alpha -= dt*2.5; return w.alpha>0; });
        this.floats = this.floats.filter(f => f.update(dt));
        this.particles.update(dt);
    }

    // ----- collision handlers -----
    _pass(ring) {
        ring.passed = true; ring.alive = false;
        this.combo++;
        const mult = Math.min(1 + Math.floor(this.combo/3)*0.5, CONFIG.MAX_MULTIPLIER);
        const pts = Math.ceil(mult);
        this.score += pts;

        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        const pc=Math.min(8+this.combo*2,35), ps=80+Math.min(this.combo,20)*8;
        this.particles.emit(bx,by,pc,ring.color,ps,4,0.55);
        this.particles.emitRing(this.cx,this.cy,this.ballOrb,10+this.combo,ring.color);
        this.whoosh.push({radius:this.ballOrb,alpha:0.45,color:ring.color});

        if (pts > 1) this.floats.push(new FloatText(`+${pts}`,bx,by-20,ring.color,16));
        this.audio.pass(this.combo);
        if (this.combo > 3) this.shkT = 0.06;
        this.abil.charge(1);

        // Coins come from pickups and end-of-run only (no per-ring earn)

        if (this.combo >= CONFIG.OVERDRIVE_COMBO && this.od <= 0) {
            this.od = CONFIG.OVERDRIVE_DUR;
            this.odCount++; this.runSt.od++;
            this.audio.odStart();
            this.floats.push(new FloatText('OVERDRIVE!',this.cx,this.cy-50,'#FFD700',28));
            this.shkT = 0.2;
            this.particles.emit(bx,by,40,'#FFD700',250,6,0.8);
        }
    }

    _break(ring) {
        ring.passed=true;ring.alive=false;
        this.combo++; this.score+=1; this.runSt.breaks++;
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        this.particles.emit(bx,by,22,this.theme.breakCol,250,5,0.5);
        this.particles.emitRing(this.cx,this.cy,this.ballOrb,15,this.theme.breakCol);
        this.whoosh.push({radius:this.ballOrb,alpha:0.6,color:this.theme.breakCol});
        this.floats.push(new FloatText('BREAK!',bx,by-20,this.theme.breakCol,20));
        this.audio.breakR(); this.shkT=0.08;
        this.abil.charge(1.5);
    }

    _bossHit(ring) {
        ring.bossHp--;
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        if (ring.bossHp <= 0) {
            ring.passed = true; ring.alive = false;
            this.bossActive = false;
            this.ringTmr = 0;
            this.combo += 5; this.score += 10;
            this.runCoins += 5; this.runGems += 1;
            this.audio.bossDie();
            this.particles.emit(bx,by,40,'#FF2244',280,6,0.8);
            this.particles.emit(bx,by,25,'#FFD700',200,4,0.6);
            this.floats.push(new FloatText('BOSS DEFEATED!',this.cx,this.cy-50,'#FF2244',24));
            this.floats.push(new FloatText('+10 \u{1FA99}  +1 \u{1F48E}',this.cx,this.cy-25,'#FFD700',16));
            this.shkT = 0.25;
        } else {
            ring.radius = this.maxR;
            ring.passed = false;
            const gaps = [];
            for (let i = 0; i < ring.segs.length; i++) if (!ring.segs[i]) gaps.push(i);
            ring.segs.fill(true);
            const n = ring.segs.length;
            let g1;
            do { g1 = Math.floor(Math.random() * n); } while (gaps.includes(g1));
            ring.segs[g1] = false;
            ring.segs[(g1 + Math.floor(n / 2)) % n] = false;
            ring.spin = rand(-0.4, 0.4);
            this.audio.bossHit();
            this.particles.emit(bx,by,18,'#FF2244',180,4,0.5);
            this.floats.push(new FloatText(`HIT! ${ring.bossHp}/${ring.bossMaxHp}`,this.cx,this.cy-50,'#FF6666',22));
            this.shkT = 0.12;
            this.combo++; this.score += 2;
        }
    }

    _shieldHit(ring) {
        this.abil.useShield();
        ring.passed=true;ring.alive=false;
        if (ring.isBoss) this.bossActive = false;
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        this.particles.emit(bx,by,30,'#00FFFF',180,4,0.6);
        this.floats.push(new FloatText('SHIELD!',bx,by-20,'#00FFFF',22));
        this.audio.shieldB(); this.shkT=0.15;
    }

    _nearMiss(ring) {
        this.nmT = 0.2;
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        this.floats.push(new FloatText('CLOSE!',bx+rand(-20,20),by-35,'#FFFFFF',16));
        this.particles.emit(bx,by,10,'#FFFFFF',100,2,0.3);
        this.audio.nearM(); this.score++;
    }

    _die() {
        // Extra life auto-revive
        if (this.activeConsumables.extraLife && !this.revived) {
            this.activeConsumables.extraLife = false;
            this._revive();
            this.revived = true;
            const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
            const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
            this.particles.emit(bx,by,30,'#FF88CC',180,4,0.6);
            this.floats.push(new FloatText('EXTRA LIFE!',this.cx,this.cy-50,'#FF88CC',24));
            this.audio.shieldR();
            return;
        }

        this.state = 'GAME_OVER'; this.goT = 0;
        this.doubledRewards = false; this.adBusy = false;
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        this.particles.emit(bx,by,45,'#FF4444',220,5,0.8);
        this.particles.emit(bx,by,25,'#FFFFFF',160,3,0.6);
        this.shkT = CONFIG.SHAKE_DURATION; this.dFlash = 1;
        this.audio.death();

        this.newBest = this.prog.addRun(this.score);

        // Currency rewards
        const baseCoinReward = this.score + this.runSt.maxCombo;
        const coinMult = this.activeConsumables.doubleCoin ? 2 : 1;
        this.runCoins += baseCoinReward * coinMult;
        if (this.newBest) this.runGems += 1;

        this.prog.addCoins(this.runCoins);
        this.prog.addGems(this.runGems);

        const baseXp = this.score * 10;
        const bestXp = this.newBest ? 50 : 0;
        this.msnRes = this.prog.checkMissions(this.runSt);
        if (this.msnRes.allDone) this.runGems += 1;
        this.xpEarned = baseXp + bestXp + this.msnRes.xp;

        const prevLv = this.prog.level;
        const lv = this.prog.addXp(this.xpEarned);
        if (lv) {
            this.lvlUpT = 3;
            this.lvlUpUnlocks = LEVEL_UNLOCKS.filter(u => u.level > prevLv && u.level <= this.prog.level);
            this.abil.sync(this.prog);
            setTimeout(() => this.audio.lvlUp(), 800);
        }
        if (this.newBest) setTimeout(() => this.audio.best(), 400);
    }

    // =====================================================================
    // RENDERING
    // =====================================================================
    _render() {
        const c = this.ctx;
        c.save(); c.translate(this.shkX, this.shkY);

        this._drawBG(c);

        if (this.state === 'MENU' || this.state === 'MISSIONS' || this.state === 'SHOP' || this.state === 'VS_LOBBY' || this.state === 'CHALLENGE_MENU') {
            this._drawMenuRings(c);
            this._drawBall(c);
            if (this.state === 'MENU') this._drawMenu(c);
            if (this.state === 'MISSIONS') this._drawMissions(c);
            if (this.state === 'SHOP') this._drawShop(c);
            if (this.state === 'VS_LOBBY') this._drawVsLobby(c);
            if (this.state === 'CHALLENGE_MENU') this._drawChallengeMenu(c);
        } else if (this.state === 'VERSUS' || this.state === 'VERSUS_OVER') {
            this._drawVersusPlay(c);
            if (this.state === 'VERSUS_OVER') this._drawVersusOver(c);
        } else {
            this._drawOrbit(c);
            this._drawGuide(c);
            this._drawRings(c);
            this._drawPickups(c);
            this._drawWhooshes(c);
            this._drawBall(c);
            this.particles.draw(c);
            this.floats.forEach(f => f.draw(c));

            if (this.state === 'PLAYING') {
                this._drawSpeedLines(c);
                this._drawEdgeGlow(c);
                this._drawHUD(c);
                this._drawAbilBtns(c);
                this._drawPhaseAnn(c);
                if (this.reverseT > 0) this._drawReverseIndicator(c);
            }
            if (this.state === 'GAME_OVER') this._drawGO(c);
        }
        this._drawVignette(c);

        if (this.dFlash > 0) {
            c.fillStyle = `rgba(255,50,50,${this.dFlash * 0.3})`;
            c.fillRect(-20,-20,this.w+40,this.h+40);
        }
        if (this.dailyPop > 0) this._drawDailyPop(c);
        c.restore();
    }

    // ----- background -----
    _drawBG(c) {
        const th = this.theme;
        const g = c.createLinearGradient(0,0,0,this.h);
        let top = th.bgTop, bot = th.bgBot;

        if (this.state === 'PLAYING' && this.combo > 8) {
            const t = clamp((this.combo-8)*0.012,0,0.2);
            const rT=hexToRgb(top), rB=hexToRgb(bot);
            top = `rgb(${Math.round(rT.r+35*t)},${rT.g},${Math.round(rT.b+45*t)})`;
            bot = `rgb(${Math.round(rB.r+30*t)},${rB.g},${Math.round(rB.b+40*t)})`;
        }
        g.addColorStop(0,top); g.addColorStop(1,bot);
        c.fillStyle = g; c.fillRect(-20,-20,this.w+40,this.h+40);

        for (let i = 0; i < this.bgL.length; i++)
            this.bgL[i].draw(c, this.w, this.h, th.pCol[i % th.pCol.length]);

        const gr = c.createRadialGradient(this.cx,this.cy,0,this.cx,this.cy,this.maxR*0.65);
        const ac = hexToRgb(th.accent);
        gr.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},0.06)`);
        gr.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
        c.fillStyle = gr; c.fillRect(0,0,this.w,this.h);
    }

    _drawVignette(c) {
        const int = this.state==='PLAYING' ? 0.25+clamp(this.spdM-1,0,1)*0.25 : 0.2;
        const g = c.createRadialGradient(this.cx,this.h/2,this.w*0.3,this.cx,this.h/2,this.w*0.9);
        g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1,`rgba(0,0,0,${int})`);
        c.fillStyle = g; c.fillRect(0,0,this.w,this.h);
    }

    _drawSpeedLines(c) {
        if (this.spdM < 1.3) return;
        const int = clamp((this.spdM-1.3)/1.2,0,1);
        const n = Math.floor(int*18)+4;
        for (let i = 0; i < n; i++) {
            const a = rand(0,Math.PI*2);
            const r1 = this.maxR*0.3, r2 = this.maxR*(0.5+rand(0,0.5));
            c.beginPath();
            c.moveTo(this.cx+Math.cos(a)*r1, this.cy+Math.sin(a)*r1);
            c.lineTo(this.cx+Math.cos(a)*r2, this.cy+Math.sin(a)*r2);
            c.strokeStyle = rgba('#FFFFFF', int*0.08); c.lineWidth = 1; c.stroke();
        }
    }

    _drawEdgeGlow(c) {
        if (this.od <= 0) return;
        const p = 0.25+Math.sin(this.mTime*6)*0.12;
        const gt = c.createLinearGradient(0,0,0,this.h*0.12);
        gt.addColorStop(0,rgba('#FFD700',p)); gt.addColorStop(1,'rgba(0,0,0,0)');
        c.fillStyle=gt; c.fillRect(0,0,this.w,this.h*0.12);
        const gb = c.createLinearGradient(0,this.h*0.88,0,this.h);
        gb.addColorStop(0,'rgba(0,0,0,0)'); gb.addColorStop(1,rgba('#FFD700',p));
        c.fillStyle=gb; c.fillRect(0,this.h*0.88,this.w,this.h*0.12);
    }

    _drawReverseIndicator(c) {
        const a = clamp(this.reverseT / 0.3, 0, 1);
        c.globalAlpha = 0.6 * a;
        const sz = Math.min(this.w * 0.04, 16);
        c.font = `700 ${sz}px ${CONFIG.FONT}`;
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = '#FF4444';
        c.fillText('\u{21C4} REVERSED', this.cx, this.h * 0.92);
        c.globalAlpha = 1;
    }

    // ----- game elements -----
    _drawOrbit(c) {
        c.beginPath(); c.arc(this.cx,this.cy,this.ballOrb,0,Math.PI*2);
        c.strokeStyle='rgba(255,255,255,0.04)'; c.lineWidth=1; c.stroke();
    }

    _drawGuide(c) {
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        const ex=this.cx+Math.cos(this.ballAng)*(this.maxR+20);
        const ey=this.cy+Math.sin(this.ballAng)*(this.maxR+20);
        const g=c.createLinearGradient(bx,by,ex,ey);
        g.addColorStop(0,'rgba(255,255,255,0.06)'); g.addColorStop(1,'rgba(255,255,255,0)');
        c.beginPath();c.moveTo(bx,by);c.lineTo(ex,ey);c.strokeStyle=g;c.lineWidth=2;c.stroke();
    }

    _drawBall(c) {
        const bx=this.cx+Math.cos(this.ballAng)*this.ballOrb;
        const by=this.cy+Math.sin(this.ballAng)*this.ballOrb;
        const pulse=1+Math.sin(this.ballPulse)*0.08;
        const r=CONFIG.BALL_RADIUS*pulse;

        const isOD = this.od > 0;
        const skin = BALL_SKINS[this.prog.d.activeSkin] || BALL_SKINS.default;
        let ballCol = isOD ? '#FFD700' : skin.color;
        let glowCol = isOD ? '#FFD700' : skin.glow;

        if (skin.rainbow && !isOD) {
            const hue = (this.mTime * 120) % 360;
            ballCol = hslToHex(hue, 100, 60);
            glowCol = ballCol;
        }

        const ci = clamp((isOD ? 0.6 : this.combo * 0.04), 0, 0.6);
        if (ci > 0.01) {
            const gr=r*(2.5+this.combo*0.2);
            const cg=c.createRadialGradient(bx,by,r,bx,by,gr);
            cg.addColorStop(0,rgba(ballCol,ci)); cg.addColorStop(1,rgba(ballCol,0));
            c.fillStyle=cg;c.beginPath();c.arc(bx,by,gr,0,Math.PI*2);c.fill();
        }

        const glow=c.createRadialGradient(bx,by,r*0.4,bx,by,r*2.8);
        glow.addColorStop(0,rgba(glowCol,0.35)); glow.addColorStop(1,rgba(glowCol,0));
        c.fillStyle=glow;c.beginPath();c.arc(bx,by,r*2.8,0,Math.PI*2);c.fill();

        if (skin.pixel && !isOD) {
            const sz = r * 1.6;
            c.fillStyle = ballCol;
            c.fillRect(bx-sz/2, by-sz/2, sz, sz);
            c.fillStyle = rgba('#FFFFFF', 0.4);
            c.fillRect(bx-sz/2+2, by-sz/2+2, sz*0.3, sz*0.3);
        } else {
            c.beginPath();c.arc(bx,by,r,0,Math.PI*2);c.fillStyle=ballCol;c.fill();
            c.beginPath();c.arc(bx-r*0.25,by-r*0.25,r*0.35,0,Math.PI*2);
            c.fillStyle=rgba('#FFFFFF',0.55);c.fill();
        }

        if (this.abil.hasShield()) {
            const sr = r * 2.2;
            c.beginPath();c.arc(bx,by,sr,0,Math.PI*2);
            c.strokeStyle=rgba('#00FFFF',0.35+Math.sin(this.mTime*3)*0.1);c.lineWidth=2;c.stroke();
            c.beginPath();c.arc(bx,by,sr+3,0,Math.PI*2);
            c.strokeStyle=rgba('#00FFFF',0.08);c.lineWidth=1;c.stroke();
        }
    }

    _drawRings(c) {
        const sorted=[...this.rings].sort((a,b)=>b.radius-a.radius);
        for(const r of sorted) r.draw(c,this.cx,this.cy,this.gRot);
    }

    _drawPickups(c) {
        for (const p of this.pickups) p.draw(c, this.cx, this.cy, this.gRot);
    }

    _drawWhooshes(c) {
        for(const w of this.whoosh){
            c.beginPath();c.arc(this.cx,this.cy,w.radius,0,Math.PI*2);
            c.strokeStyle=rgba(w.color,w.alpha);c.lineWidth=2;c.stroke();
        }
    }

    // ----- HUD -----
    _drawHUD(c) {
        const fs=Math.min(this.w*0.12,52);
        c.font=`800 ${fs}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='top';
        c.fillStyle='rgba(255,255,255,0.9)';
        const sy=Math.max(this.h*0.06,50);
        c.fillText(Math.floor(this.scoreDsp),this.cx,sy);

        if(this.combo>2){
            const cs=Math.min(this.w*0.048,20);
            c.font=`700 ${cs}px ${CONFIG.FONT}`;
            const m=Math.min(1+Math.floor(this.combo/3)*0.5,CONFIG.MAX_MULTIPLIER);
            c.fillStyle=this.theme.colors[this.combo%this.theme.colors.length];
            c.globalAlpha=0.8+Math.sin(this.mTime*5)*0.2;
            c.fillText(`${m.toFixed(1)}x COMBO`,this.cx,sy+fs+6);c.globalAlpha=1;
        }

        if (this.phase > 0) {
            const ps = Math.min(this.w*0.03,12);
            c.font=`600 ${ps}px ${CONFIG.FONT}`;c.textAlign='left';c.textBaseline='top';
            c.fillStyle=rgba(this.theme.accent,0.6);
            c.fillText(`\u{2B22} ${PHASES[this.phase].name.toUpperCase()}`,12,sy);
        }

        // Coin counter
        const coinSz = Math.min(this.w*0.028,11);
        c.font=`600 ${coinSz}px ${CONFIG.FONT}`;c.textAlign='right';c.textBaseline='top';
        c.fillStyle='#FFD700';
        c.fillText(`\u{1FA99} ${this.runCoins}`,this.w-12,sy+16);

        const ts=Math.min(this.w*0.03,12);
        c.font=`500 ${ts}px ${CONFIG.FONT}`;c.textAlign='right';c.textBaseline='top';
        c.fillStyle='rgba(255,255,255,0.35)';
        const sec=Math.floor(this.runTime);
        c.fillText(`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`,this.w-12,sy);
        c.textAlign='center';
    }

    _drawPhaseAnn(c) {
        if (this.phAnnT <= 0) return;
        const a = this.phAnnT > 2 ? (2.5-this.phAnnT)*2 : Math.min(this.phAnnT/0.5, 1);
        const sz = Math.min(this.w * 0.1, 40);
        c.globalAlpha = clamp(a, 0, 1);
        c.font = `900 ${sz}px ${CONFIG.FONT}`;
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.shadowColor = this.theme.accent; c.shadowBlur = 25;
        c.fillStyle = this.theme.accent;
        c.fillText(this.phAnn, this.cx, this.h * 0.28);
        c.shadowBlur = 0; c.globalAlpha = 1;
    }

    _drawAbilBtns(c) {
        const drawBtn = (btn, ab, icon) => {
            if (!ab.ok) return;
            const {x,y,r} = btn;
            const charge = ab === this.abil.shield ? (ab.ready ? 1 : ab.charge/ab.max) : ab.charge/ab.max;
            const ready = ab === this.abil.shield ? ab.ready : (charge >= 1 && !ab.on);
            const active = ab.on;

            c.beginPath();c.arc(x,y,r,0,Math.PI*2);
            c.fillStyle=rgba('#FFFFFF',0.05);c.fill();

            if (charge > 0) {
                c.beginPath();c.arc(x,y,r,-Math.PI/2,-Math.PI/2+charge*Math.PI*2);
                c.strokeStyle=rgba(ready?this.theme.accent:'#FFFFFF',ready?0.55:0.18);c.lineWidth=3;c.stroke();
            }
            if (ready) {
                c.beginPath();c.arc(x,y,r+3,0,Math.PI*2);
                c.strokeStyle=rgba(this.theme.accent,0.25+Math.sin(this.mTime*4)*0.08);c.lineWidth=2;c.stroke();
            }
            if (active) {
                c.beginPath();c.arc(x,y,r+5,0,Math.PI*2);
                c.fillStyle=rgba(this.theme.accent,0.15);c.fill();
            }
            c.font=`700 ${r*0.75}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
            c.fillStyle=rgba('#FFFFFF',ready?0.8:0.3);c.fillText(icon,x,y);
        };
        drawBtn(this.abBtns.dash, this.abil.dash, '\u{26A1}');
        drawBtn(this.abBtns.slow, this.abil.slow, '\u{25C9}');
    }

    // ----- Currency Bar -----
    _drawCurrencyBar(c) {
        const sz = Math.min(this.w * 0.032, 13);
        c.font = `700 ${sz}px ${CONFIG.FONT}`;
        c.textBaseline = 'middle'; c.textAlign = 'right';
        const y = 22;
        c.fillStyle = '#FFD700';
        c.fillText(`\u{1FA99} ${this.prog.coins}`, this.w - 14, y);
        c.fillStyle = '#AA44FF';
        c.fillText(`\u{1F48E} ${this.prog.gems}`, this.w - 14, y + sz + 6);
    }

    // ----- MENU -----
    _drawMenuRings(c) {
        const t=this.mTime;
        for(let i=0;i<4;i++){
            const r=this.ballOrb+30+i*42;
            const rot=t*(0.25+i*0.08)*(i%2?1:-1);
            const n=5+i, sa=(Math.PI*2)/n;
            c.lineWidth=8;c.lineCap='round';
            for(let j=0;j<n;j++){
                if(j%2===0)continue;
                c.beginPath();c.arc(this.cx,this.cy,r,rot+j*sa+0.06,rot+(j+1)*sa-0.06);
                c.strokeStyle=rgba(this.theme.colors[i%this.theme.colors.length],0.12);c.stroke();
            }
        }
    }

    _drawMenu(c) {
        this._drawCurrencyBar(c);

        const titleSz=Math.min(this.w*0.12,50);
        c.font=`900 ${titleSz}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
        c.shadowColor=this.theme.accent;c.shadowBlur=30;c.fillStyle='#FFFFFF';
        c.fillText('DROP RUSH',this.cx,this.h*0.1);c.shadowBlur=0;

        const subSz=Math.min(this.w*0.06,24);
        c.font=`700 ${subSz}px ${CONFIG.FONT}`;
        c.fillStyle=this.theme.accent;c.globalAlpha=0.7;
        c.fillText('EVOLVE',this.cx,this.h*0.1+titleSz*0.7);c.globalAlpha=1;

        // Level bar
        const lbY = this.h * 0.36;
        const lbW = Math.min(this.w * 0.6, 240);
        const lbH = 6;
        const lbX = this.cx - lbW/2;
        const pct = this.prog.xp / this.prog.xpNeeded();
        c.beginPath();this._rr(c,lbX,lbY,lbW,lbH,3);c.fillStyle='rgba(255,255,255,0.1)';c.fill();
        if(pct>0){c.beginPath();this._rr(c,lbX,lbY,lbW*pct,lbH,3);c.fillStyle=this.theme.accent;c.fill();}
        const lvSz=Math.min(this.w*0.032,13);
        c.font=`600 ${lvSz}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.5)';
        c.fillText(`Lv.${this.prog.level}  ${this.prog.xp}/${this.prog.xpNeeded()} XP`,this.cx,lbY+lbH+14);

        // Play button
        const bw=Math.min(this.w*0.56,224),bh=58;
        const bx=this.cx-bw/2,by=this.h*0.43;
        this.btns.play={x:bx,y:by,w:bw,h:bh};
        this._btn(c,bx,by,bw,bh,'PLAY',this.theme.accent,rgba(this.theme.accent,0.7));

        // Pre-run consumable slots
        const conY = by + bh + 12;
        const conSz = 36;
        const conGap = 10;
        const conIds = ['magnet','doubleCoin','extraLife'];
        const conIcons = ['\u{1F9F2}','\u{1F4B0}','\u{1F496}'];
        const totalConW = conSz * 3 + conGap * 2;
        const conStartX = this.cx - totalConW / 2;

        for (let i = 0; i < 3; i++) {
            const cx2 = conStartX + i * (conSz + conGap);
            const owned = this.prog.getConsumable(conIds[i]);
            const sel = this.selectedConsumables[conIds[i]];
            this.btns['con_'+conIds[i]] = {x:cx2, y:conY, w:conSz, h:conSz};

            c.beginPath();this._rr(c,cx2,conY,conSz,conSz,10);
            c.fillStyle = sel ? rgba(this.theme.accent, 0.25) : 'rgba(255,255,255,0.05)';
            c.fill();
            c.beginPath();this._rr(c,cx2,conY,conSz,conSz,10);
            c.strokeStyle = sel ? this.theme.accent : 'rgba(255,255,255,0.15)';
            c.lineWidth = sel ? 2 : 1; c.stroke();

            const iconSz = Math.min(conSz * 0.45, 16);
            c.font = `${iconSz}px ${CONFIG.FONT}`;
            c.textAlign = 'center'; c.textBaseline = 'middle';
            c.globalAlpha = owned > 0 ? 1 : 0.25;
            c.fillStyle = '#FFFFFF';
            c.fillText(conIcons[i], cx2 + conSz/2, conY + conSz/2 - 4);

            const cntSz = Math.min(conSz * 0.28, 10);
            c.font = `600 ${cntSz}px ${CONFIG.FONT}`;
            c.fillStyle = owned > 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)';
            c.fillText(`x${owned}`, cx2 + conSz/2, conY + conSz - 6);
            c.globalAlpha = 1;
        }

        // Bottom tab bar
        const nbW=Math.min(this.w*0.22,88),nbH=36;
        const nbY=this.h*0.62;
        const nbGap=6;
        const totalW=nbW*4+nbGap*3;
        const nbX=this.cx-totalW/2;

        this.btns.shop={x:nbX,y:nbY,w:nbW,h:nbH};
        this.btns.missions={x:nbX+nbW+nbGap,y:nbY,w:nbW,h:nbH};
        this.btns.themes={x:nbX+(nbW+nbGap)*2,y:nbY,w:nbW,h:nbH};
        this.btns.daily={x:nbX+(nbW+nbGap)*3,y:nbY,w:nbW,h:nbH};

        this._smBtn(c,nbX,nbY,nbW,nbH,'Shop');
        this._smBtn(c,nbX+nbW+nbGap,nbY,nbW,nbH,'Missions');
        this._smBtn(c,nbX+(nbW+nbGap)*2,nbY,nbW,nbH,this.theme.name);
        const canD = this.prog.canDaily();
        this._smBtn(c,nbX+(nbW+nbGap)*3,nbY,nbW,nbH,canD?'Daily \u{2605}':'Daily \u{2713}');

        // Multiplayer buttons
        const mpY = nbY + nbH + 10;
        const mpW = Math.min(this.w * 0.35, 140), mpGap = 8;
        const mpTotalW = mpW * 2 + mpGap;
        const mpX = this.cx - mpTotalW / 2;
        this.btns.versus = { x: mpX, y: mpY, w: mpW, h: nbH };
        this.btns.challenge = { x: mpX + mpW + mpGap, y: mpY, w: mpW, h: nbH };
        this._smBtn(c, mpX, mpY, mpW, nbH, 'VS Local');
        this._smBtn(c, mpX + mpW + mpGap, mpY, mpW, nbH, 'Challenge');

        // Best
        if(this.prog.best>0){
            const bs=Math.min(this.w*0.04,16);
            c.font=`600 ${bs}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.4)';c.textAlign='center';
            c.fillText(`BEST: ${this.prog.best}`,this.cx,this.h*0.74);
        }
        // Hint
        const hs=Math.min(this.w*0.032,13);
        c.font=`400 ${hs}px ${CONFIG.FONT}`;
        c.fillStyle=rgba('#FFFFFF',0.25+Math.sin(this.mTime*2)*0.08);
        c.fillText('Drag left / right to rotate rings',this.cx,this.h*0.79);
    }

    // ----- SHOP -----
    _drawShop(c) {
        c.fillStyle='rgba(0,0,0,0.8)';c.fillRect(0,0,this.w,this.h);
        this._drawCurrencyBar(c);

        // Title + Back
        const ts=Math.min(this.w*0.08,32);
        c.font=`800 ${ts}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
        c.fillStyle='#FFFFFF';c.fillText('SHOP',this.cx,this.h*0.07);

        const backSz=Math.min(this.w*0.035,14);
        c.font=`600 ${backSz}px ${CONFIG.FONT}`;c.textAlign='left';
        c.fillStyle='rgba(255,255,255,0.5)';
        const backW=60,backH=30,backX=14,backY=this.h*0.07-15;
        c.fillText('\u{2190} Back',backX+8,backY+backH/2);
        this.btns.shopBack={x:backX,y:backY,w:backW,h:backH};

        // Category tabs
        const tabW=Math.min(this.w*0.27,100),tabH=32,tabGap=6;
        const tabTotalW=tabW*3+tabGap*2;
        const tabX=this.cx-tabTotalW/2;
        const tabY=this.h*0.13;

        for(let i=0;i<SHOP_CATS.length;i++){
            const x=tabX+i*(tabW+tabGap);
            const active = this.shopCat===SHOP_CATS[i];
            this.btns['shopTab'+i]={x,y:tabY,w:tabW,h:tabH};
            c.beginPath();this._rr(c,x,tabY,tabW,tabH,16);
            c.fillStyle=active?rgba(this.theme.accent,0.2):'rgba(255,255,255,0.05)';c.fill();
            c.beginPath();this._rr(c,x,tabY,tabW,tabH,16);
            c.strokeStyle=active?this.theme.accent:'rgba(255,255,255,0.1)';c.lineWidth=active?2:1;c.stroke();
            const tfs=Math.min(this.w*0.03,12);
            c.font=`600 ${tfs}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
            c.fillStyle=active?'#FFFFFF':'rgba(255,255,255,0.5)';
            c.fillText(SHOP_CAT_LABELS[SHOP_CATS[i]],x+tabW/2,tabY+tabH/2);
        }

        // Items list
        const items = SHOP_ITEMS.filter(it => it.cat === this.shopCat);
        const itemH = 64, itemGap = 8;
        const listY = tabY + tabH + 16;
        const listW = Math.min(this.w * 0.88, 340);
        const listX = this.cx - listW / 2;

        c.save();
        c.beginPath();
        c.rect(0, listY, this.w, this.h - listY - 10);
        c.clip();

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const iy = listY + i * (itemH + itemGap) - this.shopScroll;
            if (iy + itemH < listY || iy > this.h) continue;

            let owned = false, equipped = false;
            if (item.cat === 'skin') {
                owned = this.prog.hasSkin(item.id);
                equipped = this.prog.d.activeSkin === item.id;
            } else if (item.cat === 'theme') {
                owned = this.prog.hasTheme(item.id);
                equipped = this.themeKey === item.id;
            }

            c.beginPath();this._rr(c,listX,iy,listW,itemH,14);
            c.fillStyle='rgba(255,255,255,0.04)';c.fill();
            c.beginPath();this._rr(c,listX,iy,listW,itemH,14);
            c.strokeStyle='rgba(255,255,255,0.08)';c.lineWidth=1;c.stroke();

            // Icon
            const iconSz=Math.min(itemH*0.45,22);
            c.font=`${iconSz}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
            c.fillText(item.icon,listX+28,iy+itemH/2);

            // Name + desc
            const nmSz=Math.min(this.w*0.036,14);
            c.font=`700 ${nmSz}px ${CONFIG.FONT}`;c.textAlign='left';c.textBaseline='middle';
            c.fillStyle='#FFFFFF';
            c.fillText(item.name,listX+52,iy+itemH*0.35);
            const dSz=Math.min(this.w*0.028,11);
            c.font=`400 ${dSz}px ${CONFIG.FONT}`;
            c.fillStyle='rgba(255,255,255,0.4)';
            c.fillText(item.desc,listX+52,iy+itemH*0.65);

            // Count for consumables
            if (item.cat === 'consumable') {
                const cnt = this.prog.getConsumable(item.id);
                if (cnt > 0) {
                    c.font=`600 ${dSz}px ${CONFIG.FONT}`;c.textAlign='right';
                    c.fillStyle='rgba(255,255,255,0.35)';
                    c.fillText(`Owned: ${cnt}`,listX+listW-80,iy+itemH*0.35);
                }
            }

            // Buy / Equip button
            const btnW=66,btnH=30;
            const btnX=listX+listW-btnW-10,btnY=iy+itemH/2-btnH/2;
            this.btns['shopItem'+i]={x:btnX,y:btnY+this.shopScroll,w:btnW,h:btnH};

            c.beginPath();this._rr(c,btnX,btnY,btnW,btnH,15);
            let btnLabel='', btnCol='';
            const canAfford = item.currency==='coins'?this.prog.coins>=item.cost:this.prog.gems>=item.cost;

            if (item.cat==='consumable') {
                btnLabel = `${item.cost} ${item.currency==='coins'?'\u{1FA99}':'\u{1F48E}'}`;
                btnCol = canAfford ? this.theme.accent : 'rgba(255,255,255,0.15)';
            } else if (owned && equipped) {
                btnLabel = 'Active';
                btnCol = 'rgba(255,255,255,0.15)';
            } else if (owned) {
                btnLabel = 'Equip';
                btnCol = this.theme.accent;
            } else {
                btnLabel = `${item.cost} ${item.currency==='coins'?'\u{1FA99}':'\u{1F48E}'}`;
                btnCol = canAfford ? this.theme.accent : 'rgba(255,255,255,0.15)';
            }

            c.fillStyle = rgba(typeof btnCol==='string'&&btnCol.startsWith('#')?btnCol:'#FFFFFF', (owned&&equipped)?0.08:0.18);
            c.fill();
            c.beginPath();this._rr(c,btnX,btnY,btnW,btnH,15);
            c.strokeStyle = btnCol; c.lineWidth = 1.5; c.stroke();

            const bfs=Math.min(this.w*0.028,11);
            c.font=`700 ${bfs}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
            c.fillStyle = (owned&&equipped)?'rgba(255,255,255,0.35)':'#FFFFFF';
            c.fillText(btnLabel,btnX+btnW/2,btnY+btnH/2);
        }
        c.restore();
    }

    _drawMissions(c) {
        c.fillStyle='rgba(0,0,0,0.75)';c.fillRect(0,0,this.w,this.h);

        const ts=Math.min(this.w*0.08,32);
        c.font=`800 ${ts}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
        c.fillStyle='#FFFFFF';c.fillText('MISSIONS',this.cx,this.h*0.18);

        const ms=this.prog.d.missions;
        const fs=Math.min(this.w*0.038,15);

        for(let i=0;i<ms.length;i++){
            const m=ms[i], y=this.h*0.32+i*56;
            const done=m.progress>=m.target;

            c.font=`700 ${fs}px ${CONFIG.FONT}`;c.textAlign='center';
            c.fillStyle=done?'#4ECDC4':'rgba(255,255,255,0.3)';
            c.fillText(done?'\u{2713}':'\u{25CB}',this.cx-this.w*0.37,y);

            c.textAlign='left';c.fillStyle=done?'#FFFFFF':'rgba(255,255,255,0.65)';
            c.fillText(m.text,this.cx-this.w*0.3,y);

            c.textAlign='right';
            c.fillStyle=done?'#4ECDC4':'rgba(255,255,255,0.35)';
            c.fillText(done?`+${m.xp} XP`:`${Math.min(Math.floor(m.progress),m.target)}/${m.target}`,this.cx+this.w*0.37,y);
        }
        c.textAlign='center';
        const hs=Math.min(this.w*0.03,12);
        c.font=`400 ${hs}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.25)';
        c.fillText('Tap anywhere to close',this.cx,this.h*0.7);
    }

    // ----- GAME OVER -----
    _drawGO(c) {
        const t=this.goT;
        c.globalAlpha=t*0.65;c.fillStyle='#000';c.fillRect(0,0,this.w,this.h);c.globalAlpha=t;

        const goSz=Math.min(this.w*0.09,36);
        c.font=`800 ${goSz}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
        const isChal = this.mpMode === 'challenge';
        c.fillStyle=isChal?this.theme.accent:'#FF6B6B';
        c.fillText(isChal?'CHALLENGE COMPLETE':'GAME OVER',this.cx,this.h*0.1);

        const lbl=Math.min(this.w*0.033,13);
        c.font=`600 ${lbl}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.4)';c.fillText('SCORE',this.cx,this.h*0.16);

        const scSz=Math.min(this.w*0.18,68);
        c.font=`900 ${scSz}px ${CONFIG.FONT}`;c.fillStyle='#FFFFFF';c.fillText(this.score,this.cx,this.h*0.22);

        const bsSz=Math.min(this.w*0.042,17);
        c.font=`700 ${bsSz}px ${CONFIG.FONT}`;
        if(this.newBest){c.fillStyle='#FFE66D';c.shadowColor='#FFE66D';c.shadowBlur=10;
            c.fillText(`NEW BEST! ${this.prog.best}`,this.cx,this.h*0.28);c.shadowBlur=0;
        } else {c.fillStyle='rgba(255,255,255,0.45)';c.fillText(`BEST: ${this.prog.best}`,this.cx,this.h*0.28);}

        if(this.phase>0){
            const ps=Math.min(this.w*0.03,12);
            c.font=`600 ${ps}px ${CONFIG.FONT}`;c.fillStyle=rgba(this.theme.accent,0.5);
            c.fillText(`Phase ${this.phase+1}: ${PHASES[this.phase].name}`,this.cx,this.h*0.32);
        }

        // Currency earned
        const curSz=Math.min(this.w*0.04,16);
        c.font=`700 ${curSz}px ${CONFIG.FONT}`;
        const curY = this.h * 0.36;
        c.fillStyle='#FFD700';c.fillText(`\u{1FA99} +${this.runCoins}`,this.cx-40,curY);
        c.fillStyle='#AA44FF';c.fillText(`\u{1F48E} +${this.runGems}`,this.cx+40,curY);

        // XP
        const xpSz=Math.min(this.w*0.045,18);
        c.font=`700 ${xpSz}px ${CONFIG.FONT}`;c.fillStyle=this.theme.accent;
        c.fillText(`+${this.xpEarned} XP`,this.cx,this.h*0.39);

        // Level bar
        const lbY=this.h*0.42;const lbW=Math.min(this.w*0.55,220);const lbH=6;const lbX=this.cx-lbW/2;
        const pct=this.prog.xp/this.prog.xpNeeded();
        c.beginPath();this._rr(c,lbX,lbY,lbW,lbH,3);c.fillStyle='rgba(255,255,255,0.1)';c.fill();
        if(pct>0){c.beginPath();this._rr(c,lbX,lbY,lbW*pct,lbH,3);c.fillStyle=this.theme.accent;c.fill();}
        const lvS=Math.min(this.w*0.028,11);
        c.font=`600 ${lvS}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.4)';
        c.fillText(`Lv.${this.prog.level}`,this.cx,lbY+lbH+12);

        if(this.lvlUpT>0){
            const la=clamp(this.lvlUpT,0,1);
            c.globalAlpha=la*t;c.font=`800 ${Math.min(this.w*0.05,20)}px ${CONFIG.FONT}`;
            c.fillStyle='#FFE66D';c.shadowColor='#FFE66D';c.shadowBlur=15;
            c.fillText('LEVEL UP!',this.cx,lbY+lbH+30);
            if(this.lvlUpUnlocks.length){
                c.font=`600 ${Math.min(this.w*0.032,13)}px ${CONFIG.FONT}`;
                c.fillStyle='#FFFFFF';
                c.fillText(`Unlocked: ${this.lvlUpUnlocks.map(u=>u.name).join(', ')}`,this.cx,lbY+lbH+50);
            }
            c.shadowBlur=0;c.globalAlpha=t;
        }

        // Mission results
        if(this.msnRes){
            const my=this.h*0.50;const mfs=Math.min(this.w*0.032,13);
            const missions=this.prog.d.missions;
            for(let i=0;i<Math.min(missions.length,3);i++){
                const m=missions[i],y=my+i*22;
                const done=m.progress>=m.target;
                c.font=`600 ${mfs}px ${CONFIG.FONT}`;c.textAlign='center';
                c.fillStyle=done?'#4ECDC4':'rgba(255,255,255,0.3)';
                c.fillText(`${done?'\u{2713}':'\u{25CB}'} ${m.text}  ${done?`+${m.xp}XP`:`${Math.min(Math.floor(m.progress),m.target)}/${m.target}`}`,this.cx,y);
            }
        }

        // Buttons
        const bw=Math.min(this.w*0.4,160),bh=48;
        const btnGap=10;
        const totalBW=bw*2+btnGap;
        const bx1=this.cx-totalBW/2, bx2=this.cx-totalBW/2+bw+btnGap;
        const by=this.h*0.61;

        this.btns.restart={x:bx1,y:by,w:bw,h:bh};
        this._btn(c,bx1,by,bw,bh,'RESTART',this.theme.accent,rgba(this.theme.accent,0.7));

        this.btns.goMenu={x:bx2,y:by,w:bw,h:bh};
        c.beginPath();this._rr(c,bx2,by,bw,bh,24);
        c.fillStyle='rgba(255,255,255,0.08)';c.fill();
        c.beginPath();this._rr(c,bx2,by,bw,bh,24);
        c.strokeStyle='rgba(255,255,255,0.22)';c.lineWidth=2;c.stroke();
        c.font=`700 ${Math.min(this.w*0.045,18)}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.7)';
        c.textAlign='center';c.textBaseline='middle';
        c.fillText('MENU',bx2+bw/2,by+bh/2);

        if(!isChal){
            let adY = by+bh+12;
            const adW = Math.min(this.w*0.52,210), adH=38;
            const adX = this.cx-adW/2;
            const adFs = Math.min(this.w*0.032,13);

            if (!this.revived) {
                this.btns.revive={x:adX,y:adY,w:adW,h:adH};
                c.beginPath();this._rr(c,adX,adY,adW,adH,19);
                c.fillStyle='rgba(255,255,255,0.06)';c.fill();
                c.beginPath();this._rr(c,adX,adY,adW,adH,19);
                c.strokeStyle='rgba(255,255,255,0.2)';c.lineWidth=1.5;c.stroke();
                c.font=`600 ${adFs}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.55)';
                c.textAlign='center';c.textBaseline='middle';
                c.fillText('\u{25B6} Watch Ad to Revive',adX+adW/2,adY+adH/2);
                adY += adH + 8;
            }

            if (!this.doubledRewards) {
                this.btns.doubleRwd={x:adX,y:adY,w:adW,h:adH};
                c.beginPath();this._rr(c,adX,adY,adW,adH,19);
                c.fillStyle='rgba(255,215,0,0.06)';c.fill();
                c.beginPath();this._rr(c,adX,adY,adW,adH,19);
                c.strokeStyle='rgba(255,215,0,0.25)';c.lineWidth=1.5;c.stroke();
                c.font=`600 ${adFs}px ${CONFIG.FONT}`;c.fillStyle='#FFD700';
                c.textAlign='center';c.textBaseline='middle';
                c.fillText('\u{25B6} Watch Ad for 2x Coins',adX+adW/2,adY+adH/2);
            } else {
                c.font=`600 ${adFs}px ${CONFIG.FONT}`;c.fillStyle='#FFD700';
                c.textAlign='center';c.textBaseline='middle';
                c.fillText('\u{2713} Coins Doubled!',this.cx,adY+adH/2);
            }
        }

        if(isChal){
            const chalY = by + bh + 18;
            const chalSz = Math.min(this.w*0.055,22);
            c.font=`800 ${chalSz}px ${CONFIG.FONT}`;c.textAlign='center';c.textBaseline='middle';
            c.fillStyle=this.theme.accent;
            c.fillText(`Code: ${this.challengeCode}`,this.cx,chalY);

            const chalSubSz = Math.min(this.w*0.028,11);
            c.font=`400 ${chalSubSz}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.35)';
            c.fillText('Share this code to challenge friends!',this.cx,chalY+chalSz+4);

            const copyW=90,copyH=30;
            const copyX=this.cx-copyW/2-52,copyY=chalY+chalSz+16;
            this.btns.chalCopy={x:copyX,y:copyY,w:copyW,h:copyH};
            c.beginPath();this._rr(c,copyX,copyY,copyW,copyH,15);
            c.fillStyle='rgba(255,255,255,0.06)';c.fill();
            c.beginPath();this._rr(c,copyX,copyY,copyW,copyH,15);
            c.strokeStyle='rgba(255,255,255,0.15)';c.lineWidth=1;c.stroke();
            c.font=`600 ${Math.min(this.w*0.028,11)}px ${CONFIG.FONT}`;
            c.fillStyle='rgba(255,255,255,0.5)';c.fillText('COPY CODE',copyX+copyW/2,copyY+copyH/2);

            const retryW=90,retryH=30;
            const retryX=this.cx-retryW/2+52,retryY=copyY;
            this.btns.chalRetry={x:retryX,y:retryY,w:retryW,h:retryH};
            c.beginPath();this._rr(c,retryX,retryY,retryW,retryH,15);
            c.fillStyle=rgba(this.theme.accent,0.12);c.fill();
            c.beginPath();this._rr(c,retryX,retryY,retryW,retryH,15);
            c.strokeStyle=this.theme.accent;c.lineWidth=1;c.stroke();
            c.font=`600 ${Math.min(this.w*0.028,11)}px ${CONFIG.FONT}`;
            c.fillStyle=this.theme.accent;c.fillText('RETRY SAME',retryX+retryW/2,retryY+retryH/2);
        }
        c.globalAlpha=1;
    }

    _drawDailyPop(c) {
        const a = clamp(this.dailyPop, 0, 1);
        c.globalAlpha = a;
        const y = this.h * 0.45;
        c.font = `800 ${Math.min(this.w*0.07,28)}px ${CONFIG.FONT}`;
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.shadowColor = '#FFE66D'; c.shadowBlur = 20;
        c.fillStyle = '#FFE66D';
        c.fillText(`+${this.dailyAmt} XP`, this.cx, y);
        c.font = `600 ${Math.min(this.w*0.04,16)}px ${CONFIG.FONT}`;
        c.fillStyle = '#AA44FF';
        c.fillText(`+${this.dailyGems} \u{1F48E}`, this.cx, y + 28);
        c.fillStyle = '#FFFFFF';
        c.fillText(`Day ${this.prog.streak()} Streak!`, this.cx, y + 52);
        c.shadowBlur = 0; c.globalAlpha = 1;
    }

    // ----- helpers -----
    _btn(c,x,y,w,h,text,c1,c2) {
        const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,c1);g.addColorStop(1,c2);
        c.beginPath();this._rr(c,x,y,w,h,29);c.fillStyle=g;c.fill();
        c.shadowColor=c1;c.shadowBlur=16;c.beginPath();this._rr(c,x,y,w,h,29);c.fill();c.shadowBlur=0;
        const fs=Math.min(this.w*0.055,22);
        c.font=`800 ${fs}px ${CONFIG.FONT}`;c.fillStyle='#FFFFFF';c.textAlign='center';c.textBaseline='middle';
        c.fillText(text,x+w/2,y+h/2+1);
    }

    _smBtn(c,x,y,w,h,text) {
        c.beginPath();this._rr(c,x,y,w,h,18);c.fillStyle='rgba(255,255,255,0.06)';c.fill();
        c.beginPath();this._rr(c,x,y,w,h,18);c.strokeStyle='rgba(255,255,255,0.12)';c.lineWidth=1;c.stroke();
        const fs=Math.min(this.w*0.03,12);
        c.font=`600 ${fs}px ${CONFIG.FONT}`;c.fillStyle='rgba(255,255,255,0.55)';
        c.textAlign='center';c.textBaseline='middle';c.fillText(text,x+w/2,y+h/2);
    }

    _rr(c,x,y,w,h,r) {
        c.moveTo(x+r,y);c.lineTo(x+w-r,y);c.quadraticCurveTo(x+w,y,x+w,y+r);
        c.lineTo(x+w,y+h-r);c.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
        c.lineTo(x+r,y+h);c.quadraticCurveTo(x,y+h,x,y+h-r);c.lineTo(x,y+r);
        c.quadraticCurveTo(x,y,x+r,y);c.closePath();
    }

    _loop(time) {
        const dt=Math.min((time-this._lastT)/1000,0.05);this._lastT=time;
        this._update(dt);this._render();
        requestAnimationFrame(t=>this._loop(t));
    }
}

// =====================================================================
// BOOT
// =====================================================================
window.addEventListener('load', () => { const c = document.getElementById('gameCanvas'); if (c) new Game(c); });
