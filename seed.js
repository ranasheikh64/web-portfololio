/**
 * seed.js — populates MongoDB with the initial portfolio data.
 * Run with:  node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Profile = require('./models/Profile');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅  Connected to MongoDB');

    // ── Clear collections ────────────────────────────────────────────────────
    await Promise.all([
        Profile.deleteMany({}),
        Skill.deleteMany({}),
        Project.deleteMany({}),
        Experience.deleteMany({}),
        Education.deleteMany({}),
    ]);
    console.log('🗑️   Collections cleared');

    // ── Profile ──────────────────────────────────────────────────────────────
    await Profile.create({
        name: 'Rana Sheikh',
        role: ['Flutter', 'Android'],
        tagline: 'Available for freelance & full-time roles',
        description:
            'Crafting beautiful cross-platform mobile apps with Flutter & native Android experiences that users love. From pixel-perfect UI to production-ready architecture.',
        email: 'rofikul6424islam@gmail.com',
        available: true,
        stats: { appsBuilt: 20, yearsExp: 3, happyClients: 15, githubRepos: 50 },
        socials: {
            github: '#', linkedin: '#', twitter: '#', playStore: '#', whatsapp: '#',
        },
    });

    // ── Skills (cards) ────────────────────────────────────────────────────────
    await Skill.insertMany([
        {
            title: 'Flutter Development', icon: '🐦', type: 'flutter', order: 1,
            desc: 'Building beautiful cross-platform apps for iOS & Android with Flutter, pixel-perfect UI and buttery 60fps animations.',
            tags: ['Dart', 'Flutter', 'BLoC', 'GetX', 'Riverpod', 'Provider'],
            barName: '🐦 Flutter', barPct: 92, barClass: 'fill-flutter',
        },
        {
            title: 'Native Android', icon: '🤖', type: 'android', order: 2,
            desc: 'Deep knowledge of native Android development with Kotlin & Java, Jetpack Compose, MVVM architecture and Jetpack libraries.',
            tags: ['Kotlin', 'Jetpack', 'Compose', 'Room DB', 'ViewModel'],
            barName: '🤖 Native Android (Kotlin)', barPct: 85, barClass: 'fill-android',
        },
        {
            title: 'Backend Integration', icon: '🔥', type: 'backend', order: 3,
            desc: 'Seamless API integration with REST & GraphQL, real-time data with Firebase, push notifications and cloud functions.',
            tags: ['Firebase', 'REST API', 'GraphQL', 'FCM', 'Dio'],
            barName: '🎯 Dart', barPct: 90, barClass: 'fill-dart',
        },
        {
            title: 'Dev Tools & Workflow', icon: '🛠️', type: 'tools', order: 4,
            desc: 'Proficient in modern dev workflows including CI/CD pipelines, version control, testing strategies and Play Store deployments.',
            tags: ['Git', 'GitHub Actions', 'Fastlane', 'Figma', 'Postman'],
            barName: '🔥 Firebase', barPct: 88, barClass: 'fill-firebase',
        },
    ]);

    // ── Projects ──────────────────────────────────────────────────────────────
    await Project.insertMany([
        {
            title: 'ShopEase — E-Commerce App', thumb: 1, mock: '🛍️', badgeType: 'flutter', order: 1,
            desc: 'Full-featured e-commerce app with cart, wishlist, payment gateway, real-time order tracking and push notifications.',
            tech: ['Flutter', 'Firebase', 'Stripe', 'BLoC', 'GetX'],
            githubUrl: '#', demoUrl: '#',
        },
        {
            title: 'HealthSync — Fitness Tracker', thumb: 2, mock: '💪', badgeType: 'android', order: 2,
            desc: 'Native Android health monitoring app with Google Fit integration, AI-powered insights and beautiful data visualizations.',
            tech: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Google Fit', 'ML Kit'],
            githubUrl: '#', demoUrl: '#',
        },
        {
            title: 'ChatFlow — Messaging App', thumb: 3, mock: '💬', badgeType: 'flutter', order: 3,
            desc: 'Real-time cross-platform messaging app with end-to-end encryption, video calls, and group chat functionality.',
            tech: ['Flutter', 'Firebase RTDB', 'WebRTC', 'FCM', 'Riverpod'],
            githubUrl: '#', demoUrl: '#',
        },
        {
            title: 'FinTrack — Finance Manager', thumb: 4, mock: '💰', badgeType: 'flutter', order: 4,
            desc: 'Personal finance tracker with budget planning, expense categorization, analytics charts, and bank sync.',
            tech: ['Flutter', 'SQLite', 'Dio', 'Provider', 'FL Chart'],
            githubUrl: '#', demoUrl: '#',
        },
        {
            title: 'EduLearn — LMS App', thumb: 5, mock: '📚', badgeType: 'android', order: 5,
            desc: 'Learning management system with video streaming, quiz engine, offline downloads and progress tracking.',
            tech: ['Kotlin', 'ExoPlayer', 'Retrofit', 'MVVM', 'Coroutines'],
            githubUrl: '#', demoUrl: '#',
        },
        {
            title: 'DeliveryX — Logistics App', thumb: 6, mock: '🚚', badgeType: 'flutter', order: 6,
            desc: 'Food and parcel delivery platform with real-time GPS tracking, driver app, and admin dashboard.',
            tech: ['Flutter', 'Google Maps', 'Firebase', 'GetX', 'Node.js'],
            githubUrl: '#', demoUrl: '#',
        },
    ]);

    // ── Experience ────────────────────────────────────────────────────────────
    await Experience.insertMany([
        {
            period: '2023 — Present', title: 'Senior Flutter Developer',
            company: 'Freelance / Remote', order: 1,
            dotColor: 'var(--flutter-sky)', glowColor: 'var(--glow-blue)',
            desc: 'Building production-grade Flutter apps for clients worldwide. Specialized in e-commerce, healthcare and fintech domains. Delivered 10+ apps on Play Store & App Store.',
        },
        {
            period: '2022 — 2023', title: 'Android Developer',
            company: 'TechStartup BD, Dhaka', order: 2,
            dotColor: 'var(--android-green)', glowColor: 'var(--glow-green)',
            desc: 'Native Android development using Kotlin and Jetpack libraries. Built and maintained 5+ apps. Migrated legacy Java codebase to Kotlin with MVVM architecture.',
        },
        {
            period: '2021 — 2022', title: 'Junior Flutter Developer',
            company: 'DevAgency, Dhaka', order: 3,
            dotColor: 'var(--purple)', glowColor: 'rgba(124,77,255,0.4)',
            desc: 'Started Flutter journey building cross-platform apps. Learned BLoC pattern, Firebase integration and REST API consumption. Shipped 3 apps to production.',
        },
    ]);

    // ── Education ─────────────────────────────────────────────────────────────
    await Education.insertMany([
        {
            period: '2017 — 2021', degree: 'B.Sc. in Computer Science & Engineering',
            school: 'University of Dhaka, Bangladesh', icon: '🎓', order: 1,
            dotColor: 'var(--flutter-sky)', glowColor: 'var(--glow-blue)',
            tagColor: 'var(--flutter-sky)', tagBorder: 'rgba(84,197,248,0.3)', tagBg: 'rgba(84,197,248,0.08)',
            desc: 'Graduated with distinction. Core coursework in Data Structures, Algorithms, Operating Systems, Software Engineering and Mobile App Development. Final year project: AI-powered health monitoring Android app — won Best Project Award.',
            tags: ['CGPA 3.8 / 4.0', 'Best Project Award', "Dean's List"],
        },
        {
            period: '2022', degree: 'Android & Flutter Development',
            school: 'Google Developer Certification', icon: '📱', order: 2,
            dotColor: 'var(--android-green)', glowColor: 'var(--glow-green)',
            tagColor: 'var(--android-green)', tagBorder: 'rgba(61,220,132,0.3)', tagBg: 'rgba(61,220,132,0.08)',
            desc: "Completed Google's official Android Developer certification covering Jetpack Compose, Kotlin Coroutines, Material Design 3, and modern MVVM architecture patterns.",
            tags: ['Certified', 'Kotlin', 'Jetpack Compose'],
        },
        {
            period: '2023', degree: 'Firebase & Cloud Architecture',
            school: 'Coursera / Google Cloud', icon: '🔥', order: 3,
            dotColor: 'var(--purple)', glowColor: 'rgba(124,77,255,0.4)',
            tagColor: '#BCA0FF', tagBorder: 'rgba(124,77,255,0.3)', tagBg: 'rgba(124,77,255,0.08)',
            desc: 'Completed advanced coursework in Firebase ecosystem — Cloud Functions, Firestore data modeling, Remote Config and Analytics for scalable production mobile applications.',
            tags: ['Firebase', 'Cloud Functions', 'Firestore'],
        },
    ]);

    console.log('🌱  Database seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch(err => {
    console.error('❌  Seed failed:', err);
    process.exit(1);
});
