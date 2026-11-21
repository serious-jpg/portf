/* ============================================================
   DATA FILE. Edit this file to change skills, projects, journey, goals.
   ============================================================ */

// ---------- SKILLS ----------
// Levels allowed: "Learning", "Beginner", "Developing", "Familiar". (Or leave level out.)
const SKILLS = [
  { category: "Programming", icon: "fa-code", items: [
    { name: "Python", level: "Familiar", icon: "fa-brands fa-python" },
    { name: "Object-Oriented Programming", level: "Familiar", icon: "fa-solid fa-cubes" },
    { name: "Data Structures and Algorithms", level: "Familiar", icon: "fa-solid fa-diagram-project" },
    { name: "Assembly Language", level: "Learning", icon: "fa-solid fa-microchip" } ]},
  { category: "Web Development", icon: "fa-globe", items: [
    { name: "HTML", level: "Familiar", icon: "fa-brands fa-html5" },
    { name: "CSS", level: "Familiar", icon: "fa-brands fa-css3-alt" },
    { name: "JavaScript", level: "Familiar", icon: "fa-brands fa-js" },
    { name: "PHP", level: "Familiar", icon: "fa-brands fa-php" } ]},
  { category: "Database", icon: "fa-database", items: [
    { name: "MySQL", level: "Familiar", icon: "fa-solid fa-database" } ]},
  { category: "Python Libraries", icon: "fa-layer-group", items: [
    { name: "NumPy", level: "Familiar", icon: "fa-solid fa-square-root-variable" },
    { name: "Pandas", level: "Familiar", icon: "fa-solid fa-table" } ]},
  { category: "Computer Fundamentals", icon: "fa-gears", items: [
    { name: "Digital Logic Design (DLD)", level: "Course completed", icon: "fa-solid fa-microchip" } ]},
  { category: "Office & Documents", icon: "fa-file-lines", items: [
    { name: "Microsoft Office", level: "Familiar", icon: "fa-solid fa-file-word" },
    { name: "CV Making", level: "Familiar", icon: "fa-solid fa-id-card" } ]},
  { category: "Data Collection", icon: "fa-magnifying-glass-chart", items: [
    { name: "Data Scraping from Google", level: "Developing", icon: "fa-brands fa-google" } ]},
  { category: "Marketing", icon: "fa-bullhorn", items: [
    { name: "Marketing Knowledge", level: "Developing", icon: "fa-solid fa-chart-line" } ]},
  { category: "Tools", icon: "fa-screwdriver-wrench", items: [
    { name: "GitHub", icon: "fa-brands fa-github" },
    { name: "Visual Studio Code", icon: "fa-solid fa-terminal" } ]},
  { category: "Office & Productivity", icon: "fa-briefcase", items: [
    { name: "Microsoft Office", level: "Familiar", icon: "fa-brands fa-microsoft" },
    { name: "CV Making", level: "Familiar", icon: "fa-solid fa-file-lines" } ]},
  { category: "Data & Marketing", icon: "fa-chart-line", items: [
    { name: "Data Scraping from Google", level: "Developing", icon: "fa-solid fa-magnifying-glass-chart" },
    { name: "Marketing Knowledge", level: "Developing", icon: "fa-solid fa-bullhorn" } ]},
  { category: "Areas of Interest", icon: "fa-lightbulb", items: [
    { name: "Artificial Intelligence", icon: "fa-solid fa-robot" },
    { name: "Machine Learning", icon: "fa-solid fa-brain" },
    { name: "Software Development", icon: "fa-solid fa-laptop-code" },
    { name: "Web Designing", icon: "fa-solid fa-pen-ruler" } ]}
];

// ---------- PROJECTS ----------
// HOW TO ADD A REAL PROJECT: copy one object below, paste it in the list,
// set category: "real", and change the text. Optional: add github: "https://..." or live: "https://..."
// (only if the link really exists). Real projects look different and have no SAMPLE badge.
const PROJECTS = [
  {
    id: "todo", category: "sample", status: "Sample Concept", icon: "fa-list-check", visual: "v1",
    title: "To-Do List App",
    description: "Add tasks, tick them off and delete them. A perfect first JavaScript project.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Add a new task", "Mark task as done", "Delete a task"],
    limitations: ["Tasks disappear on refresh unless saved with localStorage", "Single user, no login"],
    note: "This is a sample idea only. It is not built yet. Build it yourself, then add it as a real project."
  },
  {
    id: "calculator", category: "sample", status: "Sample Concept", icon: "fa-calculator", visual: "v2",
    title: "Simple Calculator",
    description: "A calculator with buttons for add, subtract, multiply and divide.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Number and operator buttons", "Clear and delete buttons", "Result display"],
    limitations: ["Basic operations only", "No scientific functions"],
    note: "This is a sample idea only. It is not built yet. Build it yourself, then add it as a real project."
  },
  {
    id: "clock", category: "sample", status: "Sample Concept", icon: "fa-clock", visual: "v3",
    title: "Digital Clock",
    description: "A live clock that shows the current time and date and updates every second.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Live time using setInterval", "Today's date", "Optional 12/24 hour switch"],
    limitations: ["Shows the device time only", "No alarms"],
    note: "This is a sample idea only. It is not built yet. Build it yourself, then add it as a real project."
  },
  {
    id: "guess", category: "sample", status: "Sample Concept", icon: "fa-dice", visual: "v4",
    title: "Number Guessing Game",
    description: "The computer picks a secret number and you try to guess it with hints.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Random number from 1 to 100", "Higher / lower hints", "Attempts counter and restart button"],
    limitations: ["Single player", "No score saving"],
    note: "This is a sample idea only. It is not built yet. Build it yourself, then add it as a real project."
  },
  {
    id: "quiz", category: "sample", status: "Sample Concept", icon: "fa-circle-question", visual: "v5",
    title: "Quiz App",
    description: "A small multiple-choice quiz about programming with a final score.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: ["Questions and four options", "Score at the end", "Restart button"],
    limitations: ["Questions are fixed in the code", "No timer or leaderboard"],
    note: "This is a sample idea only. It is not built yet. Build it yourself, then add it as a real project."
  }
  /* ---------- EXAMPLE REAL PROJECT (copy, uncomment, edit) ----------
  ,{
    id: "my-first-project", category: "real", status: "Completed", icon: "fa-code", visual: "v1",
    title: "My Project Name",
    description: "One or two sentences about what it does.",
    tech: ["Python"],
    features: ["Feature one", "Feature two"],
    limitations: ["What it cannot do yet"],
    github: "https://github.com/serious-jpg/your-repo"
  }
  --------------------------------------------------------------- */
];

// ---------- LEARNING JOURNEY (in order) ----------
// status: "done", "current" or leave out
const JOURNEY = [
  { text: "Learning Python programming" },
  { text: "Understanding OOP concepts" },
  { text: "Digital Logic Design", status: "done", tag: "Completed" },
  { text: "Data Structures and Algorithms" },
  { text: "Database fundamentals with MySQL" },
  { text: "Web development: PHP, HTML, CSS, JavaScript" },
  { text: "Data tools: NumPy and Pandas" },
  { text: "Assembly language", status: "current", tag: "Currently learning" },
  { text: "Exploring AI and Machine Learning" }
];

// ---------- GOALS ----------
const GOALS = [
  { icon: "fa-laptop-code", text: "Becoming a skilled web developer" },
  { icon: "fa-pen-ruler", text: "Improving web design and frontend skills" },
  { icon: "fa-hammer", text: "Building practical real-world projects" },
  { icon: "fa-brain", text: "Exploring AI and Machine Learning" },
  { icon: "fa-microchip", text: "Strengthening problem solving and core programming, including low-level concepts like Assembly" },
  { icon: "fa-book-open-reader", text: "Continuous learning of new technologies" }
];
