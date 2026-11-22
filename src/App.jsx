import React,{useState,useEffect} from 'react';
import {projects,skills} from './data.js';
import {contact} from './contact.js';
const asset = name => import.meta.env.BASE_URL+name;
const read = key => {try{return localStorage.getItem(key)}catch{return null}};
const sections = [['about','Tentang','About'],['projects','Proyek','Projects'],['education','Pendidikan','Education'],['experience','Pengalaman','Experience'],['skills','Keahlian','Skills'],['certificates','Sertifikat','Certificates'],['contact','Kontak','Contact']];
function External({href,children,...props}){return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children} ↗</a>}
const galleries = {
  pos: [
    ['morojoyo.png', 'Halaman depan Morojoyo', 'Morojoyo homepage'],
    ['pos-report.png', 'Laporan keuangan per cabang', 'Financial report by outlet']
  ],
  lab: [
    ['lab-home.png', 'Halaman utama laboratorium', 'Laboratory homepage'],
    ['lab-admin.png', 'Dashboard administrator', 'Administrator dashboard']
  ],
  mobile: [
    ['eco-home.jpg', 'Beranda EcoPlant AI', 'EcoPlant AI home'],
    ['eco-result.jpg', 'Detail hasil identifikasi awal', 'Initial identification result']
  ]
};
function ProjectCard({project,lang}) {
 const t=(id,en)=>lang?en:id;
 const dialog=React.useRef(null);
 const [index,setIndex]=useState(0);
 const items=galleries[project.art];
 const [file,id,en]=items[index];
 const move=n=>setIndex(i=>(i+n+items.length)%items.length);
 const open=()=>{setIndex(0);dialog.current.showModal()};
 return <article className="project">
   <button className="preview-image" onClick={open} aria-label={t('Lihat proyek','View project')+' '+project.name[lang]}>
     <img loading="lazy" src={asset('projects/'+items[0][0])} alt={t(items[0][1],items[0][2])}/>
   </button>
   <div className="project-body">
     <div className="project-meta"><span className={project.art==='mobile'?'project-status ongoing':'project-status'}>{project.art==='mobile'?'In Development':t('Aplikasi web','Web application')}</span><small>{project.year}</small></div>
     <h3>{project.name[lang]}</h3><p className="role-small">{project.role}</p>
     <p>{project.desc[lang]}</p>
     <div className="flex flex-wrap gap-2 mt-4">{project.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div>
     <button className="text-link project-action" onClick={open}>{t('Lihat proyek','View project')} ↗</button>
   </div>
   <dialog ref={dialog} className="gallery-dialog" onClick={e=>{if(e.target===dialog.current)dialog.current.close()}} onKeyDown={e=>{if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)}} aria-label={project.name[lang]}>
     <div className="dialog-inner"><div className="flex justify-between items-center gap-3"><strong>{project.name[lang]}</strong><button autoFocus className="control" onClick={()=>dialog.current.close()} aria-label={t('Tutup','Close')}>×</button></div>
     <img className="dialog-image" src={asset('projects/'+file)} alt={t(id,en)}/><p aria-live="polite">{t(id,en)} · {index+1}/{items.length}</p>
     <div className="flex justify-between gap-3 my-3"><button className="button" onClick={()=>move(-1)}>← {t('Sebelumnya','Previous')}</button><button className="button" onClick={()=>move(1)}>{t('Berikutnya','Next')} →</button></div>
     <div className="case-notes"><h4>{t('Permasalahan','Problem')}</h4><p>{project.problem[lang]}</p><h4>{t('Tujuan','Objective')}</h4><p>{project.desc[lang]}</p><h4>{t('Kontribusiku','My contribution')}</h4><ul>{project.tasks[lang].map(task=><li key={task}>{task}</li>)}</ul></div></div>
   </dialog>
 </article>;
}
function ContactRow({label,value,href}) {
 return href?<a className="contact-row" href={href} target={href.startsWith('mailto:')?undefined:'_blank'} rel="noopener noreferrer"><strong>{label}</strong><span>{value} ↗</span></a>:<div className="contact-row"><strong>{label}</strong><span>{value}</span></div>;
}
export default function App(){
 const [lang,L]=useState(()=>read('language')==='en'?1:0),[dark,D]=useState(()=>read('theme')==='dark'),[menu,M]=useState(false);
 const t=(id,en)=>lang?en:id;
 useEffect(()=>{document.documentElement.lang=lang?'en':'id';document.documentElement.classList.toggle('dark',dark);document.title=t('Siti Mutmainah — Portofolio','Siti Mutmainah — Portfolio');try{localStorage.setItem('language',lang?'en':'id');localStorage.setItem('theme',dark?'dark':'light')}catch{}},[lang,dark]);
 const sectionTitle=(n,id,en)=><div className="section-heading"><span>{n}</span><h2>{t(id,en)}</h2></div>;
 return <><a className="skip" href="#main">{t('Ke konten utama','Skip to content')}</a><header><nav className="wrap nav" aria-label={t('Navigasi utama','Main navigation')}><a href="#home" className="brand">Siti Mutmainah<span>.</span></a><button className="menu" onClick={()=>M(!menu)} aria-expanded={menu} aria-controls="navlinks">{t('Menu','Menu')} {menu?'×':'☰'}</button><div id="navlinks" className={menu?'links open':'links'}>{sections.map(([id,a,b])=><a key={id} href={'#'+id} onClick={()=>M(false)}>{t(a,b)}</a>)}</div><div className="flex gap-2"><button className="control" onClick={()=>L(1-lang)} aria-label={t('Ubah ke bahasa Inggris','Switch to Indonesian')}>{t('EN','ID')}</button><button className="control" onClick={()=>D(!dark)} aria-label={t('Ubah tema','Change theme')} aria-pressed={dark}>{dark?'☀':'☾'}</button></div></nav></header>
 <main id="main"><section id="home" className="wrap hero grid items-center gap-10 md:grid-cols-[1.3fr_1fr]"><div><p className="hello">{t('Halo, kenalin aku Iin.','Hi, I’m Iin.')}</p><h1>Siti<br/>Mutmainah<span>.</span></h1><p className="role">Full-Stack Development & Networking</p><p className="intro">{t('Aku suka membangun aplikasi, memahami cara sistem bekerja, dan belajar hal baru di dunia teknologi. Saat ini aku menempuh pendidikan Teknik Informatika di Politeknik Negeri Malang.','I enjoy building applications, understanding how systems work, and learning new things in technology. I currently study Informatics at Politeknik Negeri Malang.')}</p><div className="flex flex-wrap gap-3 mt-7"><a className="button primary" href="#projects">{t('Lihat proyek','Explore projects')} ↘</a><a className="button" href={asset('cvIin.pdf')} target="_blank" rel="noopener noreferrer">{t('Lihat CV','View CV')} ↗</a></div></div><figure className="portrait"><img src={asset('portrait.jpg')} alt={t('Foto profil Siti Mutmainah','Portrait of Siti Mutmainah')}/></figure>
 </section>
 <section id="about" className="wrap section">{sectionTitle('01','Sedikit tentang aku','A little about me')}<div className="grid gap-6 md:grid-cols-[1.5fr_1fr]"><div className="prose-copy"><p>{t('Perjalananku di bidang IT dimulai dari Teknik Komputer dan Jaringan di SMK. Kini, sebagai mahasiswa D-IV Teknik Informatika semester 5, aku belajar membangun aplikasi web dan mobile, mulai dari analisis kebutuhan hingga integrasi basis data dan pengujian.','My journey in IT began with computer and network engineering in vocational school. Now, as a fifth-semester applied Informatics student, I build web and mobile applications, from requirements analysis to database integration and testing.')}</p><p>{t('Fokusku adalah full-stack development dan jaringan komputer. Aku juga tertarik pada analisis data, machine learning, dan computer vision.','My focus is full-stack development and computer networking. I am also interested in data analytics, machine learning and computer vision.')}</p></div><aside className="note"><span>{t('IPK saat ini','Current GPA')}</span><strong>{t('3,68','3.68')}<small> / 4.00</small></strong><p>{t('Politeknik Negeri Malang · Semester 5','Politeknik Negeri Malang · Semester 5')}</p></aside></div></section>
 <section id="projects" className="wrap section">{sectionTitle('02','Proyek yang aku kerjakan','Projects I’ve worked on')}<div className="project-grid">{[projects[0],projects[2],projects[1]].map(project=><ProjectCard key={project.art} project={project} lang={lang}/>)}</div></section>
 <section id="education" className="wrap section">{sectionTitle('03','Pendidikan','Education')}<div className="grid gap-5 md:grid-cols-2"><article className="paper"><p className="kicker">{t('2024 – Sekarang','2024 – Present')}</p><h3>Politeknik Negeri Malang</h3><p className="role-small">{t('D-IV Teknik Informatika','Applied Bachelor of Informatics')}</p><p>{t('Semester 5 · IPK 3,68/4,00 · Diterima jalur SNBT 2024.','Semester 5 · GPA 3.68/4.00 · Admitted through SNBT 2024.')}</p></article><article className="paper"><p className="kicker">2021 – 2024</p><h3>SMK Negeri 1 Rembang</h3><p className="role-small">{t('Teknik Komputer dan Jaringan','Computer and Network Engineering')}</p><p>{t('Peringkat pertama dalam pemeringkatan siswa eligible angkatan TKJ 2024.','Ranked first among eligible students in the 2024 computer and network engineering cohort.')}</p></article></div></section>
 <section id="experience" className="wrap section">{sectionTitle('04','Pengalaman','Experience')}<div className="grid gap-7 md:grid-cols-2"><article><p className="kicker">{t('Pengalaman kerja','Work experience')}</p><h3>Selecta Grafika</h3><p className="role-small">Graphic Designer & Customer Service</p><p className="muted">{t('Juni – Desember 2022','June – December 2022')}</p><p>{t('Mendesain kebutuhan digital printing dengan CorelDRAW, Adobe dan Canva, menyesuaikan desain, melayani konsultasi, pemesanan dan revisi pelanggan.','Created digital printing designs using CorelDRAW, Adobe and Canva, adapting designs and handling consultations, orders and revisions.')}</p></article><article><p className="kicker">{t('Pengalaman organisasi','Organizational experience')}</p><h3>UKM Bhakti Karya Mahasiswa</h3><p className="role-small">{t('Departemen Pengabdian Masyarakat','Community Service Department')}</p><p className="muted">{t('2024 – Sekarang','2024 – Present')}</p><p>{t('Berperan sebagai penanggung jawab hubungan masyarakat, pemateri dan pembawa acara dalam program kerja.','Served as public relations lead, speaker and event host in organizational programs.')}</p></article></div></section>
 <section id="skills" className="wrap section">{sectionTitle('05','Keahlian','Skills')}<div className="grid gap-x-10 gap-y-5 md:grid-cols-2">{skills.map(s=><article className="skill" key={s[0]}><h3>{s[lang]}</h3><p>{Array.isArray(s[2])?s[2][lang]:s[2]}</p></article>)}</div></section>
 <section id="certificates" className="wrap section">{sectionTitle('06','Sertifikat','Certificates')}<div className="grid gap-4 md:grid-cols-2">{[['Networking Basics','networking.pdf'],['Computer Hardware Basics','hardware.pdf']].map(([name,file])=><article className="paper" key={file}><p className="kicker">Cisco Networking Academy · {t('Oktober 2023','October 2023')}</p><h3>{name}</h3><p>{t('Sertifikat penyelesaian pelatihan','Certificate of course completion')}</p><External href={asset(file)} className="text-link">{t('Lihat sertifikat','View certificate')}</External></article>)}</div></section>
 <section id="contact" className="wrap contact"><div className="contact-copy"><p className="kicker">07 / {t('Kontak','Contact')}</p><h2>{t('Mari berkenalan.','Let’s connect.')}<br/><em>{t('Mulai dari satu pesan.','It starts with a hello.')}</em></h2><p>{t('Terbuka untuk kesempatan magang, diskusi proyek dan kolaborasi di bidang pengembangan web dan jaringan komputer.','Open to internships, project discussions and collaborations in web development and computer networking.')}</p><span className="contact-signature">— Iin</span></div><div className="contact-list"><ContactRow label="Email" value={contact.email} href={'mailto:'+contact.email}/><ContactRow label="WhatsApp" value={/^\d{8,15}$/.test(contact.whatsapp)?t('Kirim pesan','Send a message'):t('Belum tersedia','Not available yet')} href={/^\d{8,15}$/.test(contact.whatsapp)?'https://wa.me/'+contact.whatsapp:null}/><ContactRow label="LinkedIn" value={contact.linkedin?t('Lihat profil','View profile'):t('Cari profil','Find profile')} href={contact.linkedin||'https://www.linkedin.com/search/results/people/?keywords=Siti%20Mutmainah'}/><ContactRow label="GitHub" value="SitiMutmainah15" href={contact.github}/></div></section></main><footer className="wrap flex flex-wrap justify-between gap-3"><span>© 2026 Siti Mutmainah</span><a href="#home">{t('Kembali ke atas','Back to top')} ↑</a></footer></>;
}
