import { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";

/* ═══════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════ */
const I = {
  Users: (p:any={}) => <svg {...p} width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  TrendUp: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>,
  Shield: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>,
  Zap: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>,
  Brain: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
  Heart: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
  Check: (p:any={}) => <svg {...p} width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>,
  Alert: (p:any={}) => <svg {...p} width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 4 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
  Bar: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>,
  Send: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/></svg>,
  ChevR: (p:any={}) => <svg {...p} width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
  X: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  Layers: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>,
  Settings: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  DollarSign: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  GitBranch: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
  MessageCircle: (p:any={}) => <svg {...p} width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>,
};

/* ═══════════════════════════════════════════
   PRIMITIVES
   ═══════════════════════════════════════════ */
function Spark({ data, color, w=100, h=28 }: { data: number[]; color: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data), r = max - min || 1;
  const pts = data.map((v,i) => `${(i/(data.length-1))*w},${h-((v-min)/r)*h}`).join(" ");
  return <svg width={w} height={h} className="overflow-visible"><polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx={w} cy={h-((data[data.length-1]-min)/r)*h} r="2.5" fill={color}/></svg>;
}
function Dot({ s }: { s: "on"|"warn"|"off"|"crit" }) {
  const c = { on:"bg-emerald-400", warn:"bg-amber-400", crit:"bg-red-400", off:"bg-slate-500" };
  return <span className="relative flex h-2 w-2">{s==="on"&&<span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c[s]} opacity-75`}/>}<span className={`relative inline-flex rounded-full h-2 w-2 ${c[s]}`}/></span>;
}

function DrillCard({ title, value, unit, change, spark, color, icon, children }: {
  title:string; value:string; unit?:string; change:number; spark:number[]; color:string; icon:ReactNode; children:ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group relative bg-[#0f1923] border border-[#1e2d3d] rounded-lg p-4 hover:border-[#2a4a6b] transition-all cursor-pointer overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:`radial-gradient(ellipse at 50% 0%,${color}08 0%,transparent 70%)`}}/>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2"><span className="opacity-60">{icon}</span><span className="text-[10px] uppercase tracking-[0.1em] text-[#6b8aad] font-medium">{title}</span></div>
              <div className={`flex items-center gap-1 text-[10px] font-medium ${change>=0?"text-emerald-400":"text-red-400"}`}><span>{change>=0?"\u2191":"\u2193"}</span>{Math.abs(change)}%</div>
            </div>
            <div className="flex items-end justify-between">
              <div><div className="text-xl font-semibold text-[#e8f0f8]">{value}<span className="text-xs text-[#6b8aad] ml-1">{unit}</span></div></div>
              <Spark data={spark} color={color}/>
            </div>
            <div className="text-[10px] text-[#3a5a7a] mt-1 flex items-center gap-1">Click to drill down <I.ChevR/></div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#0a1218] border-[#1e2d3d] text-[#c8dff0] max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="text-[#e8f0f8] flex items-center gap-2">{icon} {title} Deep Dive</DialogTitle></DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function DrillRow({ label, children }: { label:string; children:ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#162535] last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 py-2.5 text-xs text-[#a8c8e0] hover:text-[#e8f0f8] transition-colors">
        <I.ChevR className={`transition-transform ${open?"rotate-90":""}`}/><span className="flex-1 text-left">{label}</span>
      </button>
      {open && <div className="pl-7 pb-3 text-[11px] text-[#6b8aad] space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const programs = [
  { area:"Career Mobility Programs", participants:"4,280", growth:18.2, desc:"Internal advancement pathways including tuition assistance, mentorship, and skills certification", budget:"$8.2M", roi:"3.4x", details:[
    {metric:"Promotions from program",value:"682",trend:"+22%"},{metric:"Avg time to promotion",value:"14 months",trend:"-3mo"},{metric:"Retention rate (participants)",value:"94.2%",trend:"+4.1%"},{metric:"Manager satisfaction",value:"91.8%",trend:"+2.3%"},
  ]},
  { area:"Pay Equity Analysis", participants:"67K analyzed", growth:1.2, desc:"Continuous monitoring ensuring equitable compensation across all demographics and roles", budget:"$1.8M", roi:"Risk mitigation", details:[
    {metric:"Gender pay gap",value:"0.8%",trend:"-0.3%"},{metric:"Race/ethnicity gap",value:"1.2%",trend:"-0.5%"},{metric:"Adjustments made",value:"1,247",trend:"+18%"},{metric:"Total adjustment cost",value:"$3.4M",trend:"Investment"},
  ]},
  { area:"Inclusive Benefits", participants:"67K eligible", growth:8.4, desc:"Extended family leave, fertility coverage, gender-affirming care, eldercare support", budget:"$12.4M", roi:"2.1x retention", details:[
    {metric:"Utilization rate",value:"34.2%",trend:"+6.8%"},{metric:"New benefit claims",value:"8,420",trend:"+24%"},{metric:"Employee satisfaction",value:"92.4%",trend:"+3.1%"},{metric:"Competitive benchmark",value:"Top 10%",trend:"Stable"},
  ]},
  { area:"Community Health Workers", participants:"342", growth:24.6, desc:"Hired from local communities to bridge care gaps, building economic opportunity", budget:"$14.6M", roi:"4.2x", details:[
    {metric:"Communities served",value:"48",trend:"+12"},{metric:"ED diversions",value:"8,420",trend:"+34%"},{metric:"Patient trust scores",value:"96.1%",trend:"+5.2%"},{metric:"Economic multiplier",value:"$4.20 per $1",trend:"+$0.40"},
  ]},
  { area:"Veteran & Military Family", participants:"1,850", growth:12.1, desc:"Transition programs, credentialing support, deployment-flexible scheduling", budget:"$3.2M", roi:"2.8x", details:[
    {metric:"Veteran hires (annual)",value:"312",trend:"+18%"},{metric:"Credentialing completions",value:"189",trend:"+24%"},{metric:"Retention rate",value:"91.4%",trend:"+3.8%"},{metric:"Deployment accommodations",value:"67",trend:"+12"},
  ]},
  { area:"Disability Employment", participants:"890", growth:15.3, desc:"Removing barriers to employment and advancement for teammates with disabilities", budget:"$2.1M", roi:"3.1x", details:[
    {metric:"Accommodations fulfilled",value:"1,248",trend:"+22%"},{metric:"Avg accommodation cost",value:"$420",trend:"-$80"},{metric:"Satisfaction score",value:"89.4%",trend:"+4.2%"},{metric:"Advancement rate",value:"78.2%",trend:"+6.1%"},
  ]},
];

const sgrData = [
  { name:"SGR Talent Pipeline", progress:62, status:"Active", desc:"Building local pipelines in SE markets reflecting community demographics", owner:"VP Talent Acquisition", milestones:[
    {m:"HBCU partnership agreements signed",done:true},{m:"Community college program launches",done:true},{m:"First cohort enrolled (Q2)",done:false},{m:"Pipeline-to-hire conversion targets set",done:true},{m:"Year 1 hiring targets met",done:false},
  ]},
  { name:"SGR Community Partnerships", progress:45, status:"Building", desc:"Partnerships with HBCUs, community colleges, and workforce dev orgs across GA, SC, AL, NC", owner:"Dir. Community Relations", milestones:[
    {m:"Stakeholder mapping complete",done:true},{m:"MOUs drafted with 8 institutions",done:true},{m:"Joint programs designed",done:false},{m:"Funding allocated",done:true},{m:"Launch events scheduled",done:false},
  ]},
  { name:"Leadership Representation", progress:71, status:"On Track", desc:"Leadership at all levels reflects communities served, with quarterly benchmarks", owner:"CHRO / Fernando", milestones:[
    {m:"Baseline metrics established",done:true},{m:"Representation goals set by level",done:true},{m:"Sponsorship program launched",done:true},{m:"Mid-year review complete",done:false},{m:"Board diversity targets met",done:false},
  ]},
  { name:"Health Equity Research", progress:30, status:"Planning", desc:"Academic partnerships studying SDOH and access barriers in underserved communities", owner:"VP Research", milestones:[
    {m:"Research priorities identified",done:true},{m:"Wake Forest partnership formalized",done:false},{m:"IRB approvals submitted",done:false},{m:"First study cohort recruited",done:false},{m:"Preliminary findings published",done:false},
  ]},
];

const governanceItems = [
  { body:"A&O Executive Council", chair:"Fernando (SVP)", frequency:"Monthly", members:12, lastMeeting:"Feb 28, 2026", nextMeeting:"Mar 28, 2026", decisions:["Approved SGR talent pipeline budget ($4.2M)","Endorsed pay equity adjustment methodology","Set Q2 representation targets"] },
  { body:"Equity Data Governance Board", chair:"CDO + CIO", frequency:"Quarterly", members:8, lastMeeting:"Jan 15, 2026", nextMeeting:"Apr 15, 2026", decisions:["Approved SDOH data collection standards","Endorsed demographic data refresh cadence","Set data quality thresholds"] },
  { body:"Community Advisory Council", chair:"VP Community Relations", frequency:"Bi-Monthly", members:18, lastMeeting:"Feb 10, 2026", nextMeeting:"Apr 14, 2026", decisions:["Prioritized rural access initiatives","Endorsed CHW expansion plan","Recommended cultural competency training updates"] },
  { body:"Supplier Diversity Review Committee", chair:"CPO", frequency:"Monthly", members:10, lastMeeting:"Mar 3, 2026", nextMeeting:"Apr 7, 2026", decisions:["Approved 3 new MBE supplier contracts","Set FY26 diverse spend targets","Launched innovation pilot evaluation framework"] },
];

const feedbackLoops = [
  { source:"Teammate Pulse Surveys", frequency:"Quarterly", lastRun:"Feb 2026", responseRate:"78.2%", keyFindings:["Belonging score: 84.1% (+2.6%)","Career clarity concern in interpreter roles","Cross-state communication gap identified","Strong mission alignment (92.4%)"], actions:["Interpreter career ladder communication plan","Cross-state town hall series launched","Manager toolkit for belonging conversations"] },
  { source:"Patient Experience (CAHPS)", frequency:"Continuous", lastRun:"Rolling", responseRate:"32.4%", keyFindings:["LEP patients report 8% lower satisfaction","Disability accommodation requests up 22%","Cultural competency scores improving (+4.1%)","Digital access gap for 65+ population"], actions:["LEP patient experience task force formed","Accommodation request process streamlined","Cultural competency training V2 launched"] },
  { source:"Community Listening Sessions", frequency:"Bi-Monthly", lastRun:"Feb 2026", responseRate:"N/A (242 attendees)", keyFindings:["Transportation barrier cited in rural GA","Trust deficit in immigrant communities","Desire for bilingual health educators","Food insecurity affecting chronic disease mgmt"], actions:["Mobile health unit proposal developed","Community navigator program expanded","SDOH screening integration in Epic piloted"] },
  { source:"Exit Interview Analytics", frequency:"Monthly", lastRun:"Feb 2026", responseRate:"61.4%", keyFindings:["Pay competitiveness concern (interpreters)","Limited advancement visibility","Strong team culture ratings","Workload distribution during consolidation"], actions:["Market-rate pay study initiated","Career pathway visualization tool built","Workload rebalancing project launched"] },
];

const costModel = {
  totalBudget: 92.6,
  breakdown: [
    { category:"Language Services Operations", amount:42.8, pct:46.2, projected:44.1, note:"Includes interpreter salaries, vendor contracts, technology" },
    { category:"Community Health Workers", amount:14.6, pct:15.8, projected:16.2, note:"342 CHWs across 6 states, expansion planned" },
    { category:"Inclusive Benefits Programs", amount:12.4, pct:13.4, projected:13.8, note:"Family leave, fertility, gender-affirming care" },
    { category:"Career Mobility & Development", amount:8.2, pct:8.9, projected:9.4, note:"Tuition, mentorship, certification programs" },
    { category:"Civil Rights & Compliance", amount:5.8, pct:6.3, projected:5.6, note:"Investigations, training, monitoring" },
    { category:"Supplier Acceleration", amount:3.4, pct:3.7, projected:4.1, note:"Program management, innovation pilots" },
    { category:"Accessibility (ADA/Digital)", amount:3.2, pct:3.5, projected:3.8, note:"Facility audits, digital remediation, assistive tech" },
    { category:"Technology & AI", amount:2.2, pct:2.4, projected:3.6, note:"Agent platform, predictive models, analytics" },
  ],
  scenarios: [
    { name:"Baseline", growth:5.4, total:97.6 },
    { name:"Moderate Expansion", growth:8.2, total:100.2 },
    { name:"Aggressive (SGR Full Build)", growth:14.1, total:105.7 },
  ],
};

const predictiveModels = [
  { model:"Workforce Representation Forecast", status:"Active", accuracy:"91.2%", desc:"Predicts representation gaps 12-18 months ahead using attrition, growth, and pipeline data", predictions:[
    {p:"Hispanic/Latino representation in leadership will drop 2.1% by Q4 without intervention",confidence:"87%",action:"Accelerate sponsorship program enrollment"},
    {p:"SGR markets will need 240+ new hires to meet representation targets",confidence:"92%",action:"Activate community college pipelines"},
    {p:"Interpreter pipeline sufficient for current demand; Dari/Pashto gap emerging",confidence:"89%",action:"Launch targeted recruitment"},
  ]},
  { model:"Pay Equity Drift Detector", status:"Active", accuracy:"94.8%", desc:"Continuously monitors for emerging pay gaps before they become systemic", predictions:[
    {p:"Clinical support roles showing 1.8% gender drift in NC market",confidence:"91%",action:"Market adjustment recommended"},
    {p:"New hire offers trending 3.2% above incumbent pay in IT",confidence:"88%",action:"Compression analysis triggered"},
  ]},
  { model:"Community Need Anticipator", status:"Building", accuracy:"78.4%", desc:"Combines census, migration, SDOH, and Epic data to forecast community health access needs", predictions:[
    {p:"Rural GA counties will need 3x current CHW capacity by 2028",confidence:"82%",action:"Budget scenario modeling initiated"},
    {p:"Arabic-speaking community in Charlotte growing faster than interpreter capacity",confidence:"90%",action:"Cross-train existing bilingual staff"},
  ]},
];

const engagementData = {
  overall:82.4, belonging:84.1, recommend:86.3, response:78.2,
  categories:[
    {cat:"I feel valued at Advocate Health",score:85.2,trend:2.1},{cat:"Equal opportunity to advance",score:81.6,trend:3.4},{cat:"Team reflects diverse perspectives",score:79.8,trend:4.2},{cat:"Leadership committed to equity",score:83.1,trend:1.8},{cat:"I can bring my whole self to work",score:84.7,trend:2.6},
  ],
  byRegion:[
    {region:"Illinois",score:84.2,response:81.3},{region:"Wisconsin",score:82.1,response:79.4},{region:"North Carolina",score:80.8,response:76.2},{region:"South Carolina",score:79.4,response:74.1},{region:"Georgia",score:78.9,response:72.8},{region:"Alabama",score:77.2,response:70.4},
  ],
};

const dataAggregation = {
  sources:[
    {name:"Epic EHR",records:"12.4M patients",fields:["Demographics","LEP flags","Encounter history","SDOH screening"],refresh:"Real-time",quality:97.2},
    {name:"Workday HR",records:"67K teammates",fields:["Demographics","Comp data","Performance","Career history"],refresh:"Daily",quality:98.1},
    {name:"Census ACS",records:"6-state demographics",fields:["Language","Income","Education","Migration"],refresh:"Annual + supplements",quality:95.4},
    {name:"CAHPS/Patient Exp.",records:"2.1M surveys",fields:["Satisfaction","Access","Communication","Cultural"],refresh:"Continuous",quality:88.7},
    {name:"Community Surveys",records:"24K responses",fields:["Access barriers","Trust","Needs","Preferences"],refresh:"Bi-monthly",quality:82.1},
    {name:"Supplier Portal",records:"487 suppliers",fields:["Certifications","Spend","Performance","Innovation"],refresh:"15 min",quality:96.8},
  ],
  qualityScore:93.4,
  integrationStatus:"8 of 10 sources fully integrated",
};

/* ═══════════════════════════════════════════
   AGENT PANEL
   ═══════════════════════════════════════════ */
type Msg = {role:"user"|"agent"|"sys"; content:string; ts:string; actions?:string[]};

function AgentPanel() {
  const [msgs, setMsgs] = useState<Msg[]>([{role:"sys",content:"A&O Intelligence Agent online.\nConnected: Epic, Workday, Census, CAHPS, Community, Supplier Portal.\nActionable intelligence mode. Ask about representation, equity, SGR, cost modeling, or predictions.",ts:"09:00"}]);
  const [inp, setInp] = useState(""); const [thinking, setThinking] = useState(false); const ref = useRef<HTMLDivElement>(null);

  const respond = (q:string) => {
    setThinking(true);
    const ql = q.toLowerCase();
    let r = { content:"Searching across 6 connected systems...\n\nI found relevant data points. Ask about representation forecasts, pay equity, SGR pipeline, community health needs, cost scenarios, or engagement trends.", actions:["Run full scan","Executive brief"] };
    if (ql.includes("represent") || ql.includes("sgr") || ql.includes("pipeline")) r = { content:"\u{1F4CA} Representation Analysis\n\nCurrent index: 87.4% (up 3.2%)\nSGR markets: 78.2% (gap identified)\n\nPredictive model shows Hispanic/Latino leadership will drop 2.1% by Q4 without intervention.\n\nSGR talent pipeline currently at 62% progress. First HBCU cohort enrolls Q2.\n\n\u26A0\uFE0F Recommend accelerating sponsorship program.", actions:["View SGR details","Launch sponsorship accelerator","Generate board report"] };
    else if (ql.includes("pay") || ql.includes("equity") || ql.includes("comp")) r = { content:"\u{1F4B0} Pay Equity Status\n\nGender gap: 0.8% (down 0.3%)\nRace/ethnicity gap: 1.2% (down 0.5%)\nAdjustments made: 1,247 ($3.4M invested)\n\n\u26A0\uFE0F Drift detected: Clinical support roles in NC showing 1.8% gender drift.\nNew hire offers trending 3.2% above incumbents in IT.\n\nRecommend: Market adjustment for NC clinical support.", actions:["View drift details","Initiate adjustment","Cost impact analysis"] };
    else if (ql.includes("cost") || ql.includes("budget") || ql.includes("model")) r = { content:"\u{1F4B5} Cost Model Summary\n\nTotal budget: $92.6M\nLargest: Language Ops ($42.8M, 46.2%)\nFastest growing: Technology & AI (+63.6% projected)\n\nScenarios:\n\u2022 Baseline: $97.6M (+5.4%)\n\u2022 Moderate expansion: $100.2M (+8.2%)\n\u2022 SGR full build: $105.7M (+14.1%)\n\nROI leaders: CHWs (4.2x), Career Mobility (3.4x)", actions:["Run scenario model","Compare to benchmark","Generate CFO brief"] };
    setTimeout(() => { setMsgs(p => [...p,{role:"agent",content:r.content,ts:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),actions:r.actions}]); setThinking(false); },1500);
  };

  const send = () => { if(!inp.trim())return; const ts=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}); setMsgs(p=>[...p,{role:"user",content:inp,ts}]); respond(inp); setInp(""); };
  useEffect(()=>{ref.current?.scrollTo({top:ref.current.scrollHeight,behavior:"smooth"});},[msgs]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e2d3d]">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/><span className="text-xs font-semibold text-[#8ab4d8] tracking-wider uppercase">A&O Agent</span>
        <Badge variant="outline" className="ml-auto text-[10px] border-emerald-500/30 text-emerald-400">Actionable</Badge>
      </div>
      <ScrollArea className="flex-1 p-4" ref={ref}>
        <div className="space-y-3">
          {msgs.map((m,i) => (
            <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${m.role==="user"?"bg-[#1a3a5c] text-[#c8dff0] border border-[#2a5a8c]":m.role==="sys"?"bg-[#0a1520] text-[#4a7a9a] border border-[#162535] font-mono text-xs":"bg-[#111f2e] text-[#a8c8e0] border border-[#1e2d3d]"}`}>
                <div className="whitespace-pre-wrap">{m.content}</div>
                {m.actions&&<div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-[#1e2d3d]">{m.actions.map((a,j)=><button key={j} className="text-[10px] px-2 py-1 rounded bg-[#1a3a5c] text-[#8ab4d8] border border-[#2a5a8c] hover:bg-[#2a5a8c] transition-colors">{a}</button>)}</div>}
              </div>
            </div>
          ))}
          {thinking&&<div className="flex justify-start"><div className="bg-[#111f2e] border border-[#1e2d3d] rounded-lg px-4 py-3"><div className="flex gap-1.5">{[0,150,300].map(d=><div key={d} className="w-2 h-2 rounded-full bg-[#3a7abd] animate-bounce" style={{animationDelay:`${d}ms`}}/>)}</div></div></div>}
        </div>
      </ScrollArea>
      <div className="p-3 border-t border-[#1e2d3d]">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {["Representation forecast","Pay equity status","Cost model scenarios","SGR pipeline update"].map((q,i)=><button key={i} onClick={()=>{const ts=new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});setMsgs(p=>[...p,{role:"user",content:q,ts}]);respond(q);}} className="text-[10px] px-2 py-1 rounded-full border border-[#1e2d3d] text-[#6b8aad] hover:border-[#3a7abd] hover:text-[#8ab4d8] transition-colors">{q}</button>)}
        </div>
        <div className="flex gap-2">
          <Input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask the A&O agent..." className="bg-[#0a1520] border-[#1e2d3d] text-[#c8dff0] placeholder:text-[#3a5a7a] text-sm focus-visible:ring-[#2a5a8c]"/>
          <Button onClick={send} size="sm" className="bg-[#1a3a5c] hover:bg-[#2a5a8c] border border-[#2a5a8c]"><I.Send/></Button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
type Section = "dashboard"|"programs"|"sgr"|"governance"|"feedback"|"cost"|"predictive"|"data"|"engagement";

export default function App() {
  const [sec, setSec] = useState<Section>("dashboard");
  const [agentOpen, setAgentOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),60000);return()=>clearInterval(t);},[]);

  const nav: {id:Section;label:string;icon:ReactNode}[] = [
    {id:"dashboard",label:"Dashboard",icon:<I.Bar/>},
    {id:"programs",label:"Opportunity Programs",icon:<I.Heart/>},
    {id:"sgr",label:"SGR Initiatives",icon:<I.Users/>},
    {id:"governance",label:"Governance",icon:<I.Shield/>},
    {id:"feedback",label:"Feedback Loops",icon:<I.MessageCircle/>},
    {id:"cost",label:"Cost Modeling",icon:<I.DollarSign/>},
    {id:"predictive",label:"Predictive Analytics",icon:<I.Brain/>},
    {id:"data",label:"Data Aggregation",icon:<I.Layers/>},
    {id:"engagement",label:"Engagement",icon:<I.Heart/>},
  ];

  return (
    <div className="min-h-screen bg-[#080e14] text-[#c8dff0]" style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
      {/* Header */}
      <header className="h-12 border-b border-[#1e2d3d] bg-[#0a1218]/80 backdrop-blur-lg flex items-center px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#2a5a8c] to-[#1a3a5c] flex items-center justify-center"><span className="text-[10px] font-bold text-white">A&O</span></div>
          <div><div className="text-sm font-semibold text-[#e8f0f8] leading-none">Access & Opportunity Hub</div><div className="text-[10px] text-[#4a6a8a] leading-none mt-0.5">Advocate Health &middot; SVP Fernando</div></div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="text-[10px] text-[#4a6a8a] font-mono hidden sm:block">{time.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}</span>
          <div className="flex items-center gap-1.5 hidden sm:flex"><Dot s="on"/><span className="text-[10px] text-emerald-400">6 Systems Online</span></div>
          <Dialog open={agentOpen} onOpenChange={setAgentOpen}>
            <DialogTrigger asChild><Button size="sm" className="h-7 bg-[#1a3a5c] hover:bg-[#2a5a8c] border border-[#2a5a8c] text-xs gap-1.5"><I.Brain/> Agent</Button></DialogTrigger>
            <DialogContent className="bg-[#0a1218] border-[#1e2d3d] text-[#c8dff0] max-w-2xl h-[75vh] p-0 flex flex-col"><AgentPanel/></DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-52 shrink-0 border-r border-[#1e2d3d] bg-[#0a1218]/50 min-h-[calc(100vh-48px)] sticky top-12 self-start hidden md:block">
          <div className="p-2 space-y-0.5">
            {nav.map(n=>(
              <button key={n.id} onClick={()=>setSec(n.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-[11px] transition-all ${sec===n.id?"bg-[#1a2a3c] text-[#e8f0f8] border border-[#2a4a6b]":"text-[#6b8aad] hover:text-[#a8c8e0] hover:bg-[#0f1923] border border-transparent"}`}>
                {n.icon}<span>{n.label}</span>
              </button>
            ))}
          </div>
        </nav>
        {/* Mobile Nav */}
        <div className="md:hidden w-full sticky top-12 z-40 bg-[#0a1218] border-b border-[#1e2d3d] overflow-x-auto">
          <div className="flex p-2 gap-1">{nav.map(n=><button key={n.id} onClick={()=>setSec(n.id)} className={`flex items-center gap-1 px-2 py-1.5 rounded text-[10px] whitespace-nowrap ${sec===n.id?"bg-[#1a2a3c] text-[#e8f0f8] border border-[#2a4a6b]":"text-[#6b8aad] border border-transparent"}`}>{n.icon}{n.label}</button>)}</div>
        </div>
        {/* Content */}
        <main className="flex-1 p-4 md:p-6 max-w-[1100px]">
          {sec==="dashboard"&&<DashboardView/>}
          {sec==="programs"&&<ProgramsView/>}
          {sec==="sgr"&&<SGRView/>}
          {sec==="governance"&&<GovernanceView/>}
          {sec==="feedback"&&<FeedbackView/>}
          {sec==="cost"&&<CostView/>}
          {sec==="predictive"&&<PredictiveView/>}
          {sec==="data"&&<DataView/>}
          {sec==="engagement"&&<EngagementView/>}
        </main>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VIEWS
   ═══════════════════════════════════════════ */
function DashboardView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.Users size={20}/> Access & Opportunity</h2><p className="text-xs text-[#4a6a8a] mt-1">Opportunity for All: Teammates, Patients, Communities, Suppliers, and SGR</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <DrillCard title="Representation Index" value="87.4" unit="%" change={3.2} spark={[78,80,81,82,83,84,85,85.5,86,86.5,87,87.4]} color="#3a7abd" icon={<I.Users/>}>
          <div className="space-y-3 mt-4">
            <p className="text-xs text-[#6b8aad]">Composite index measuring workforce representation across race, ethnicity, gender, disability, and veteran status compared to community demographics.</p>
            {engagementData.byRegion.map(r=><div key={r.region} className="flex items-center gap-3"><span className="w-24 text-xs text-[#a8c8e0]">{r.region}</span><div className="flex-1"><Progress value={r.score} className="h-1.5 bg-[#162535]"/></div><span className="text-xs font-mono text-[#6b8aad]">{r.score}%</span></div>)}
          </div>
        </DrillCard>
        <DrillCard title="Advancement Equity" value="92.1" unit="%" change={4.8} spark={[82,83,84,85,86,87,88,89,90,91,91.5,92.1]} color="#10b981" icon={<I.TrendUp/>}>
          <div className="space-y-3 mt-4">
            <p className="text-xs text-[#6b8aad]">Measures promotion parity: the ratio of advancement rates across demographic groups compared to overall rates.</p>
            {[{g:"Women",r:"93.4%",t:"+2.1%"},{g:"Black/African American",r:"89.2%",t:"+5.4%"},{g:"Hispanic/Latino",r:"90.8%",t:"+3.8%"},{g:"Asian",r:"94.1%",t:"+1.2%"},{g:"Veterans",r:"91.4%",t:"+3.8%"},{g:"Persons with Disabilities",r:"85.2%",t:"+6.1%"}].map(x=><div key={x.g} className="flex items-center justify-between text-xs"><span className="text-[#a8c8e0]">{x.g}</span><div className="flex gap-3"><span className="font-mono text-[#6b8aad]">{x.r}</span><span className="text-emerald-400">{x.t}</span></div></div>)}
          </div>
        </DrillCard>
        <DrillCard title="Diverse Spend" value="18.4" unit="%" change={3.2} spark={[12,13,13.5,14,14.8,15.5,16,16.8,17.2,17.8,18.1,18.4]} color="#f59e0b" icon={<I.DollarSign/>}>
          <div className="space-y-3 mt-4">
            <p className="text-xs text-[#6b8aad]">Percentage of total procurement spend with certified diverse suppliers (MBE, WBE, VOBE, LGBTBE, DOBE).</p>
            {[{c:"MBE",s:"$412M",p:40.6},{c:"WBE",s:"$298M",p:29.2},{c:"VOBE",s:"$124M",p:13.8},{c:"LGBTBE",s:"$68M",p:7},{c:"DOBE",s:"$52M",p:5.7}].map(x=><div key={x.c} className="flex items-center gap-3"><span className="w-16 text-xs text-[#a8c8e0]">{x.c}</span><div className="flex-1 h-2 bg-[#162535] rounded-full overflow-hidden"><div className="h-full rounded-full bg-[#f59e0b]" style={{width:`${x.p}%`}}/></div><span className="text-xs font-mono text-[#6b8aad]">{x.s}</span></div>)}
          </div>
        </DrillCard>
        <DrillCard title="Community Impact" value="94.8" unit="%" change={5.1} spark={[84,86,87,88,89,90,91,92,93,93.5,94.2,94.8]} color="#8b5cf6" icon={<I.Heart/>}>
          <div className="space-y-3 mt-4">
            <p className="text-xs text-[#6b8aad]">Composite measure of community health impact including CHW reach, community partnership effectiveness, and health equity improvements.</p>
            {[{m:"Communities served by CHWs",v:"48",t:"+12"},{m:"ED diversions through CHWs",v:"8,420",t:"+34%"},{m:"Economic multiplier",v:"$4.20 per $1",t:"+$0.40"},{m:"Patient trust score",v:"96.1%",t:"+5.2%"}].map(x=><div key={x.m} className="flex justify-between text-xs py-1"><span className="text-[#a8c8e0]">{x.m}</span><div className="flex gap-2"><span className="font-mono text-[#6b8aad]">{x.v}</span><span className="text-emerald-400">{x.t}</span></div></div>)}
          </div>
        </DrillCard>
      </div>
      {/* Quick summaries */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0f1923] border-[#1e2d3d]"><CardHeader className="pb-2"><CardTitle className="text-sm text-[#8ab4d8]">SGR Progress</CardTitle></CardHeader><CardContent>
          {sgrData.map(s=><div key={s.name} className="py-2 border-b border-[#162535] last:border-0"><div className="flex justify-between text-xs mb-1"><span className="text-[#a8c8e0]">{s.name}</span><span className="font-mono text-[#6b8aad]">{s.progress}%</span></div><Progress value={s.progress} className="h-1 bg-[#162535]"/></div>)}
        </CardContent></Card>
        <Card className="bg-[#0f1923] border-[#1e2d3d]"><CardHeader className="pb-2"><CardTitle className="text-sm text-[#8ab4d8]">Governance Decisions</CardTitle></CardHeader><CardContent>
          {governanceItems.slice(0,3).map(g=><div key={g.body} className="py-2 border-b border-[#162535] last:border-0"><div className="text-xs text-[#a8c8e0] mb-1">{g.body}</div><div className="text-[10px] text-[#4a6a8a]">Last: {g.lastMeeting} &middot; Next: {g.nextMeeting}</div></div>)}
        </CardContent></Card>
        <Card className="bg-[#0f1923] border-[#1e2d3d]"><CardHeader className="pb-2"><CardTitle className="text-sm text-[#8ab4d8]">Predictive Alerts</CardTitle></CardHeader><CardContent>
          {predictiveModels[0].predictions.slice(0,3).map((p,i)=><div key={i} className="py-2 border-b border-[#162535] last:border-0"><div className="text-xs text-[#a8c8e0] mb-1">{p.p}</div><div className="flex justify-between text-[10px]"><span className="text-amber-400">{p.confidence} confidence</span><span className="text-emerald-400">{p.action}</span></div></div>)}
        </CardContent></Card>
      </div>
    </div>
  );
}

function ProgramsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8]">Opportunity Programs</h2><p className="text-xs text-[#4a6a8a] mt-1">Drillable detail on every program, with ROI, budget, and metrics</p></div>
      {programs.map(p=>(
        <Card key={p.area} className="bg-[#0f1923] border-[#1e2d3d]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="text-sm font-medium text-[#e8f0f8]">{p.area}</h3><p className="text-[11px] text-[#4a6a8a] mt-1">{p.desc}</p></div>
              <div className="text-right shrink-0 ml-4"><div className="text-xs text-emerald-400">+{p.growth}%</div><div className="text-[10px] text-[#4a6a8a]">{p.participants}</div></div>
            </div>
            <div className="flex gap-4 mb-3 text-[10px]">
              <span className="text-[#4a6a8a]">Budget: <span className="text-[#8ab4d8] font-mono">{p.budget}</span></span>
              <span className="text-[#4a6a8a]">ROI: <span className="text-emerald-400 font-mono">{p.roi}</span></span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {p.details.map(d=>(
                <div key={d.metric} className="bg-[#0a1520] border border-[#162535] rounded-lg p-3">
                  <div className="text-[10px] text-[#4a6a8a] mb-1">{d.metric}</div>
                  <div className="text-sm font-semibold text-[#e8f0f8]">{d.value}</div>
                  <div className={`text-[10px] ${d.trend.startsWith("+")||d.trend.startsWith("-")?(d.trend.includes("-")&&d.metric.includes("time"))?"text-emerald-400":d.trend.startsWith("+")?"text-emerald-400":"text-red-400":"text-[#6b8aad]"}`}>{d.trend}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SGRView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8]">Strategic Growth Region Initiatives</h2><p className="text-xs text-[#4a6a8a] mt-1">Drillable milestone tracking across GA, SC, AL, NC</p></div>
      {sgrData.map(s=>(
        <Card key={s.name} className="bg-[#0f1923] border-[#1e2d3d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div><h3 className="text-sm font-medium text-[#e8f0f8]">{s.name}</h3><p className="text-[11px] text-[#4a6a8a]">{s.desc}</p><p className="text-[10px] text-[#3a5a7a] mt-1">Owner: {s.owner}</p></div>
              <div className="text-right"><Badge variant="outline" className="text-[10px] border-[#2a4a6b] text-[#6b8aad]">{s.status}</Badge><div className="text-lg font-semibold text-[#e8f0f8] mt-1">{s.progress}%</div></div>
            </div>
            <Progress value={s.progress} className="h-2 bg-[#162535] mb-4"/>
            <div className="space-y-2">
              {s.milestones.map((m,i)=>(
                <div key={i} className="flex items-center gap-3 text-xs">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${m.done?"bg-emerald-500/20":"bg-[#162535]"}`}>
                    {m.done?<I.Check className="text-emerald-400"/>:<span className="text-[10px] text-[#4a6a8a]">{i+1}</span>}
                  </div>
                  <span className={m.done?"text-[#a8c8e0]":"text-[#4a6a8a]"}>{m.m}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function GovernanceView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.Shield size={20}/> Governance</h2><p className="text-xs text-[#4a6a8a] mt-1">Decision bodies, meeting cadence, and recent decisions</p></div>
      {governanceItems.map(g=>(
        <Card key={g.body} className="bg-[#0f1923] border-[#1e2d3d]">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="text-sm font-medium text-[#e8f0f8]">{g.body}</h3><div className="text-[11px] text-[#4a6a8a] mt-1">Chair: {g.chair} &middot; {g.members} members &middot; {g.frequency}</div></div>
              <div className="text-right text-[10px] text-[#4a6a8a]"><div>Last: {g.lastMeeting}</div><div>Next: {g.nextMeeting}</div></div>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-[#3a5a7a] mb-2">Recent Decisions</div>
            {g.decisions.map((d,i)=><div key={i} className="flex items-center gap-2 py-1.5 text-xs text-[#a8c8e0] border-b border-[#162535] last:border-0"><I.Check className="text-emerald-400 shrink-0"/>{d}</div>)}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function FeedbackView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.MessageCircle size={20}/> Feedback Loops</h2><p className="text-xs text-[#4a6a8a] mt-1">Structured listening across teammates, patients, and communities</p></div>
      {feedbackLoops.map(f=>(
        <Card key={f.source} className="bg-[#0f1923] border-[#1e2d3d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-[#e8f0f8]">{f.source}</h3>
              <div className="flex gap-2"><Badge variant="outline" className="text-[10px] border-[#2a4a6b] text-[#6b8aad]">{f.frequency}</Badge><Badge variant="outline" className="text-[10px] border-[#2a4a6b] text-[#6b8aad]">{f.responseRate}</Badge></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#3a5a7a] mb-2">Key Findings</div>
                {f.keyFindings.map((k,i)=><div key={i} className="flex items-start gap-2 py-1 text-[11px] text-[#a8c8e0]"><I.ChevR className="shrink-0 mt-0.5 text-[#4a6a8a]"/>{k}</div>)}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#3a5a7a] mb-2">Actions Taken</div>
                {f.actions.map((a,i)=><div key={i} className="flex items-start gap-2 py-1 text-[11px] text-emerald-400/80"><I.Check className="shrink-0 mt-0.5"/>{a}</div>)}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CostView() {
  const [scenario, setScenario] = useState(0);
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.DollarSign size={20}/> Cost Modeling</h2><p className="text-xs text-[#4a6a8a] mt-1">Budget breakdown, projections, and scenario modeling</p></div>
      <div className="grid grid-cols-3 gap-3">
        {costModel.scenarios.map((s,i)=>(
          <button key={s.name} onClick={()=>setScenario(i)} className={`rounded-lg p-4 text-center transition-all ${scenario===i?"bg-[#1a2a3c] border border-[#2a4a6b]":"bg-[#0f1923] border border-[#1e2d3d] hover:border-[#2a4a6b]"}`}>
            <div className="text-xs text-[#6b8aad] mb-1">{s.name}</div>
            <div className="text-xl font-semibold text-[#e8f0f8]">${s.total}M</div>
            <div className="text-[10px] text-emerald-400">+{s.growth}%</div>
          </button>
        ))}
      </div>
      <Card className="bg-[#0f1923] border-[#1e2d3d]">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-[#8ab4d8]">Budget Breakdown (Current: ${costModel.totalBudget}M)</CardTitle></CardHeader>
        <CardContent className="space-y-1">
          {costModel.breakdown.map(b=>(
            <DrillRow key={b.category} label={`${b.category} - $${b.amount}M (${b.pct}%)`}>
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-[#4a6a8a]">Current: </span><span className="text-[#a8c8e0] font-mono">${b.amount}M</span></div>
                <div><span className="text-[#4a6a8a]">Projected: </span><span className="text-amber-400 font-mono">${b.projected}M</span></div>
              </div>
              <p className="text-[#4a6a8a]">{b.note}</p>
              <div className="mt-1"><Progress value={b.pct} className="h-2 bg-[#162535]"/></div>
            </DrillRow>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function PredictiveView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.Brain size={20}/> Predictive Optimization</h2><p className="text-xs text-[#4a6a8a] mt-1">AI-powered forecasting with actionable recommendations</p></div>
      {predictiveModels.map(m=>(
        <Card key={m.model} className="bg-[#0f1923] border-[#1e2d3d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div><h3 className="text-sm font-medium text-[#e8f0f8]">{m.model}</h3><p className="text-[11px] text-[#4a6a8a] mt-1">{m.desc}</p></div>
              <div className="flex gap-2"><Badge variant="outline" className={`text-[10px] ${m.status==="Active"?"border-emerald-500/30 text-emerald-400":"border-amber-500/30 text-amber-400"}`}>{m.status}</Badge><Badge variant="outline" className="text-[10px] border-[#2a4a6b] text-[#6b8aad]">{m.accuracy} accuracy</Badge></div>
            </div>
            <div className="space-y-3">
              {m.predictions.map((p,i)=>(
                <div key={i} className="bg-[#0a1520] border border-[#162535] rounded-lg p-3">
                  <div className="text-xs text-[#a8c8e0] mb-2">{p.p}</div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] border-amber-500/30 text-amber-400">{p.confidence} confidence</Badge>
                    <span className="text-[10px] text-emerald-400 font-medium">{p.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DataView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.Layers size={20}/> Structured Data Aggregation</h2><p className="text-xs text-[#4a6a8a] mt-1">Connected sources, data quality, and integration status</p></div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-[#0f1923] border border-[#1e2d3d] rounded-lg p-4 text-center"><div className="text-2xl font-semibold text-[#e8f0f8]">{dataAggregation.sources.length}</div><div className="text-[10px] text-[#4a6a8a]">Data Sources</div></div>
        <div className="bg-[#0f1923] border border-[#1e2d3d] rounded-lg p-4 text-center"><div className="text-2xl font-semibold text-emerald-400">{dataAggregation.qualityScore}%</div><div className="text-[10px] text-[#4a6a8a]">Data Quality Score</div></div>
        <div className="bg-[#0f1923] border border-[#1e2d3d] rounded-lg p-4 text-center"><div className="text-sm font-semibold text-[#e8f0f8]">{dataAggregation.integrationStatus}</div><div className="text-[10px] text-[#4a6a8a]">Integration Status</div></div>
      </div>
      {dataAggregation.sources.map(s=>(
        <Card key={s.name} className="bg-[#0f1923] border-[#1e2d3d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><Dot s="on"/><h3 className="text-sm font-medium text-[#e8f0f8]">{s.name}</h3></div>
              <div className="flex gap-2"><Badge variant="outline" className="text-[10px] border-[#2a4a6b] text-[#6b8aad]">{s.records}</Badge><Badge variant="outline" className="text-[10px] border-[#2a4a6b] text-[#6b8aad]">{s.refresh}</Badge></div>
            </div>
            <div className="flex items-center gap-3 mb-2"><span className="text-[10px] text-[#4a6a8a]">Quality:</span><Progress value={s.quality} className="h-1.5 bg-[#162535] flex-1"/><span className="text-xs font-mono text-[#6b8aad]">{s.quality}%</span></div>
            <div className="flex flex-wrap gap-1.5">{s.fields.map(f=><Badge key={f} variant="outline" className="text-[10px] border-[#162535] text-[#4a6a8a]">{f}</Badge>)}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EngagementView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div><h2 className="text-lg font-semibold text-[#e8f0f8] flex items-center gap-2"><I.Heart size={20}/> Teammate Engagement</h2><p className="text-xs text-[#4a6a8a] mt-1">Belonging, equity, and satisfaction across all regions</p></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[{l:"Overall",v:engagementData.overall},{l:"Belonging",v:engagementData.belonging},{l:"Would Recommend",v:engagementData.recommend},{l:"Response Rate",v:engagementData.response}].map(x=>(
          <div key={x.l} className="bg-[#0f1923] border border-[#1e2d3d] rounded-lg p-4 text-center"><div className="text-2xl font-semibold text-[#e8f0f8]">{x.v}%</div><div className="text-[10px] text-[#4a6a8a]">{x.l}</div></div>
        ))}
      </div>
      <Card className="bg-[#0f1923] border-[#1e2d3d]">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-[#8ab4d8]">Engagement by Category</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {engagementData.categories.map(c=>(
            <DrillRow key={c.cat} label={`${c.cat} - ${c.score}% (+${c.trend}%)`}>
              <div className="flex items-center gap-3"><Progress value={c.score} className="h-2 bg-[#162535] flex-1"/><span className="text-emerald-400">+{c.trend}% YoY</span></div>
              <p className="text-[#4a6a8a] mt-1">Benchmarked against healthcare industry median (76.4%). Advocate Health exceeds benchmark by {(c.score-76.4).toFixed(1)} points.</p>
            </DrillRow>
          ))}
        </CardContent>
      </Card>
      <Card className="bg-[#0f1923] border-[#1e2d3d]">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-[#8ab4d8]">Engagement by Region</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {engagementData.byRegion.map(r=>(
            <div key={r.region} className="flex items-center gap-3 py-2 border-b border-[#162535] last:border-0">
              <span className="w-28 text-xs text-[#a8c8e0]">{r.region}</span>
              <div className="flex-1"><Progress value={r.score} className="h-1.5 bg-[#162535]"/></div>
              <span className="text-xs font-mono text-[#6b8aad] w-12 text-right">{r.score}%</span>
              <span className="text-[10px] text-[#4a6a8a] w-16 text-right">{r.response}% resp</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
