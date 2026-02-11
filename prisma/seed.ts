import { CourseFormat, PrismaClient, SessionVisibility, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const courseSeeds = [
  {
    title: "Scratch Creativ pentru Începători",
    slug: "scratch-creativ-incepatori",
    shortDesc: "Primii pași în programare prin povești și jocuri interactive.",
    description:
      "Copiii învață gândire algoritmică folosind Scratch: animații, jocuri și proiecte cu impact social pentru comunitatea lor.",
    category: "Programare Creativă",
    level: "Începător",
    ageGroup: "8-11 ani",
    format: CourseFormat.RECORDED,
    durationText: "8 săptămâni",
    priceRon: 499,
    imageUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Andreea Pop",
    learnPoints: ["Evenimente și bucle", "Variabile și scor", "Design de joc", "Pitch social"],
    modules: [
      {
        title: "Fundamente Scratch",
        lessons: [
          { title: "Interfața Scratch", slug: "interfata-scratch", preview: true },
          { title: "Sprite-uri și mișcare", slug: "sprite-uri-miscare", preview: false }
        ]
      },
      {
        title: "Proiect final",
        lessons: [
          { title: "Joc educativ", slug: "joc-educativ", preview: false },
          { title: "Publicare proiect", slug: "publicare-proiect", preview: false }
        ]
      }
    ]
  },
  {
    title: "Web Design & HTML/CSS pentru Adolescenți",
    slug: "web-design-html-css-adolescenti",
    shortDesc: "Construiește site-uri moderne și accesibile.",
    description:
      "Curs practic orientat spre portofoliu: noțiuni de UI/UX, HTML semantic, CSS modern și publicare proiecte.",
    category: "Web",
    level: "Începător",
    ageGroup: "12-15 ani",
    format: CourseFormat.HYBRID,
    durationText: "10 săptămâni",
    priceRon: 749,
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Vlad Ionescu",
    learnPoints: ["HTML semantic", "CSS layout", "Responsive design", "Accesibilitate"],
    modules: [
      {
        title: "Bazele Web",
        lessons: [
          { title: "Structura unei pagini", slug: "structura-pagina", preview: true },
          { title: "Stilizare avansată", slug: "stilizare-avansata", preview: false }
        ]
      }
    ]
  },
  {
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    shortDesc: "Logica din spatele aplicațiilor web interactive.",
    description:
      "Tinerii învață variabile, funcții, array-uri, DOM și proiecte utile comunității.",
    category: "Web",
    level: "Intermediar",
    ageGroup: "13-17 ani",
    format: CourseFormat.LIVE,
    durationText: "12 săptămâni",
    priceRon: 990,
    imageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Matei Radu",
    learnPoints: ["Fundamente JS", "DOM", "Fetch API", "Mini-app civic"],
    modules: [
      {
        title: "Core JavaScript",
        lessons: [
          { title: "Variabile și tipuri", slug: "variabile-si-tipuri", preview: true },
          { title: "Funcții și scope", slug: "functii-si-scope", preview: false }
        ]
      }
    ]
  },
  {
    title: "Python for Good",
    slug: "python-for-good",
    shortDesc: "Automatizare și analiză de date pentru proiecte cu impact.",
    description:
      "Introducere în Python cu proiecte dedicate ONG-urilor și inițiativelor locale.",
    category: "Python",
    level: "Intermediar",
    ageGroup: "14-18 ani",
    format: CourseFormat.HYBRID,
    durationText: "10 săptămâni",
    priceRon: 1090,
    imageUrl:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Ioana Enache",
    learnPoints: ["Sintaxă Python", "Fișiere și date", "Automatizare", "Script social impact"],
    modules: [
      {
        title: "Python Fundamentals",
        lessons: [
          { title: "Sintaxă și condiții", slug: "sintaxa-si-conditii", preview: true },
          { title: "Bucles și funcții", slug: "bucles-si-functii", preview: false }
        ]
      }
    ]
  },
  {
    title: "Arduino & IoT pentru Orașe Inteligente",
    slug: "arduino-iot-orase-inteligente",
    shortDesc: "Hardware + software pentru prototipuri smart city.",
    description: "Construiește senzori și sisteme automate cu Arduino pentru probleme reale din comunitate.",
    category: "Hardware",
    level: "Intermediar",
    ageGroup: "12-17 ani",
    format: CourseFormat.LIVE,
    durationText: "9 săptămâni",
    priceRon: 1290,
    imageUrl:
      "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Sorin Tudor",
    learnPoints: ["Electronică de bază", "Senzori", "Programare Arduino", "Prototip smart city"],
    modules: []
  },
  {
    title: "Cyber Safety & Ethical Hacking Basics",
    slug: "cyber-safety-ethical-hacking-basics",
    shortDesc: "Securitate digitală pentru adolescenți responsabili.",
    description: "Învață bune practici de securitate, phishing awareness și noțiuni de testare etică.",
    category: "Cybersecurity",
    level: "Începător",
    ageGroup: "13-18 ani",
    format: CourseFormat.RECORDED,
    durationText: "6 săptămâni",
    priceRon: 690,
    imageUrl:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Cristina Moga",
    learnPoints: ["Securitate conturi", "Atacuri comune", "Igienă digitală", "Simulări CTF"],
    modules: []
  },
  {
    title: "AI for Good – Introducere",
    slug: "ai-for-good-introducere",
    shortDesc: "AI explicat simplu, cu proiecte etice.",
    description: "Concepte de machine learning și utilizarea responsabilă a AI pentru cauze sociale.",
    category: "AI",
    level: "Începător",
    ageGroup: "13-18 ani",
    format: CourseFormat.HYBRID,
    durationText: "8 săptămâni",
    priceRon: 1190,
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Raluca Dragomir",
    learnPoints: ["Date & modele", "Bias", "Prompting", "Proiect civic AI"],
    modules: []
  },
  {
    title: "Game Development cu Godot",
    slug: "game-development-godot",
    shortDesc: "De la idee la joc publicabil.",
    description: "Construcție de jocuri 2D, design de nivel și publishing.",
    category: "Game Dev",
    level: "Intermediar",
    ageGroup: "12-18 ani",
    format: CourseFormat.RECORDED,
    durationText: "10 săptămâni",
    priceRon: 950,
    imageUrl:
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Alex Nistor",
    learnPoints: ["Scene și noduri", "Physics", "UI joc", "Lansare demo"],
    modules: []
  },
  {
    title: "Data Storytelling pentru ONG-uri",
    slug: "data-storytelling-pentru-ong-uri",
    shortDesc: "Vizualizări care conving și mobilizează comunități.",
    description: "Învață să prezinți date clar folosind instrumente accesibile tinerilor.",
    category: "Data",
    level: "Intermediar",
    ageGroup: "15-18 ani",
    format: CourseFormat.LIVE,
    durationText: "7 săptămâni",
    priceRon: 840,
    imageUrl:
      "https://images.unsplash.com/photo-1551281044-8f8cf7465f11?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Diana Oprea",
    learnPoints: ["Curățare date", "Vizualizare", "Narațiune", "Dashboard impact"],
    modules: []
  },
  {
    title: "No-Code Apps pentru Inițiative Locale",
    slug: "no-code-apps-pentru-initiative-locale",
    shortDesc: "Construiește rapid aplicații utile comunității.",
    description: "Fluxuri no-code, prototipare, testare și lansare.",
    category: "Product",
    level: "Începător",
    ageGroup: "12-18 ani",
    format: CourseFormat.HYBRID,
    durationText: "5 săptămâni",
    priceRon: 590,
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    instructorName: "Laura Marinescu",
    learnPoints: ["Maparea proceselor", "Automatizări", "Design UI", "Validare cu utilizatori"],
    modules: []
  }
];

async function main() {
  await prisma.lessonProgress.deleteMany();
  await prisma.liveSession.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.course.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.passwordReset.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Admin Youth Code",
      email: "admin@youthcodeacademy.ro",
      passwordHash: await bcrypt.hash("Admin123!", 10),
      role: UserRole.ADMIN
    }
  });

  const demoUser = await prisma.user.create({
    data: {
      name: "Elev Demo",
      email: "elev@youthcodeacademy.ro",
      passwordHash: await bcrypt.hash("Elev123!", 10),
      role: UserRole.USER
    }
  });

  for (const courseSeed of courseSeeds) {
    const createdCourse = await prisma.course.create({
      data: {
        title: courseSeed.title,
        slug: courseSeed.slug,
        shortDesc: courseSeed.shortDesc,
        description: courseSeed.description,
        category: courseSeed.category,
        level: courseSeed.level,
        ageGroup: courseSeed.ageGroup,
        format: courseSeed.format,
        durationText: courseSeed.durationText,
        priceRon: courseSeed.priceRon,
        imageUrl: courseSeed.imageUrl,
        instructorName: courseSeed.instructorName,
        learnPoints: courseSeed.learnPoints,
        faq: [
          { q: "Pot participa fără experiență?", a: "Da, curriculumul este ghidat pas cu pas." },
          { q: "Primește copilul certificat?", a: "Da, la finalul proiectului capstone." }
        ]
      }
    });

    for (let i = 0; i < courseSeed.modules.length; i++) {
      const moduleSeed = courseSeed.modules[i];
      const createdModule = await prisma.module.create({
        data: {
          title: moduleSeed.title,
          position: i + 1,
          courseId: createdCourse.id
        }
      });

      for (let j = 0; j < moduleSeed.lessons.length; j++) {
        const lessonSeed = moduleSeed.lessons[j];
        await prisma.lesson.create({
          data: {
            title: lessonSeed.title,
            slug: lessonSeed.slug,
            position: j + 1,
            isPreview: lessonSeed.preview,
            moduleId: createdModule.id,
            contentHtml: `<h2>${lessonSeed.title}</h2><p>Această lecție conține explicații, exerciții și un mini-proiect cu impact social.</p>`
          }
        });
      }
    }
  }

  const jsCourse = await prisma.course.findUnique({ where: { slug: "javascript-essentials" } });
  const pythonCourse = await prisma.course.findUnique({ where: { slug: "python-for-good" } });

  if (jsCourse && pythonCourse) {
    const now = new Date();
    const sessions = [
      {
        courseId: jsCourse.id,
        title: "Workshop Live: DOM & Interactivitate",
        startAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 3),
        durationMin: 90,
        meetingUrl: "https://meet.google.com/demo-js-live-1",
        visibility: SessionVisibility.ENROLLED,
        notes: "Pregătiți editorul VS Code și browserul Chrome."
      },
      {
        courseId: jsCourse.id,
        title: "Q&A Proiect Civic",
        startAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10),
        durationMin: 60,
        meetingUrl: "https://meet.google.com/demo-js-live-2",
        visibility: SessionVisibility.ENROLLED,
        notes: "Sesiune de feedback individual."
      },
      {
        courseId: pythonCourse.id,
        title: "Python Lab pentru ONG",
        startAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 5),
        durationMin: 75,
        meetingUrl: "https://meet.google.com/demo-python-live-1",
        visibility: SessionVisibility.ENROLLED,
        notes: "Vom construi un parser simplu pentru date CSV."
      },
      {
        courseId: jsCourse.id,
        title: "Webinar Gratuit: Cum înveți JavaScript eficient",
        startAt: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 2),
        durationMin: 60,
        meetingUrl: "https://meet.google.com/demo-public-webinar",
        visibility: SessionVisibility.PUBLIC,
        notes: "Eveniment deschis pentru toți participanții."
      }
    ];

    await prisma.liveSession.createMany({ data: sessions });

    await prisma.enrollment.create({
      data: {
        userId: demoUser.id,
        courseId: jsCourse.id,
        status: "ACTIVE"
      }
    });
  }

  await prisma.blogPost.createMany({
    data: [
      {
        title: "Cum alegi primul curs tech pentru copilul tău",
        slug: "cum-alegi-primul-curs-tech",
        excerpt: "Un ghid practic pentru părinți: nivel, ritm și motivație.",
        contentHtml:
          "<h2>De unde începi</h2><p>Evaluăm interesul copilului și alegem un traseu gradual, cu obiective clare și proiecte mici.</p>",
        imageUrl:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "5 proiecte tech cu impact social pentru adolescenți",
        slug: "proiecte-tech-impact-social-adolescenti",
        excerpt: "Idei concrete de proiecte care ajută comunitatea locală.",
        contentHtml:
          "<h2>Exemple</h2><p>Hartă a rampelor de acces, chatbot informativ pentru ONG-uri, dashboard pentru reciclare.</p>",
        imageUrl:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
      },
      {
        title: "Introducere în siguranța online pentru elevi",
        slug: "introducere-siguranta-online-elevi",
        excerpt: "Reguli simple care reduc riscurile digitale.",
        contentHtml:
          "<h2>Checklist</h2><p>Parole unice, 2FA, verificarea surselor și raportarea comportamentelor suspecte.</p>",
        imageUrl:
          "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80"
      }
    ]
  });

  console.log("Seed complet. Utilizatori demo:");
  console.log("admin@youthcodeacademy.ro / Admin123!");
  console.log("elev@youthcodeacademy.ro / Elev123!");
  console.log(`Admin ID: ${admin.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
