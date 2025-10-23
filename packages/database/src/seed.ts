// seed.ts (Optimized)
import { faker } from '@faker-js/faker';
import { PrismaClient } from './client';
import { Role, SubmissionType, SubmissionStatus } from './enums';

const prisma = new PrismaClient();

// helper utilities
const fakePfp = () =>
  `https://i.pravatar.cc/150?img=${faker.number.int({ min: 1, max: 70 })}`;

const makeBio = () => {
  const r = Math.random();
  if (r < 0.18) return null;
  if (r < 0.58) return faker.lorem.sentence();
  if (r < 0.9)
    return faker.lorem.paragraphs(faker.number.int({ min: 1, max: 2 }));
  return faker.lorem.paragraphs(faker.number.int({ min: 3, max: 6 }));
};

const generateModuleNames = (count: number): string[] =>
  Array.from(
    { length: count },
    () => `${faker.company.buzzPhrase()} ${faker.hacker.noun()}`,
  );

const longCourseDescription = () =>
  faker.lorem.paragraphs(faker.number.int({ min: 2, max: 4 }), '\n\n');

// helper: chunk large arrays
const chunk = <T>(array: T[], size: number) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );

async function main() {
  // --- USERS ---
  const instructorsCount = 5;
  const taCount = 5;
  const studentCount = 20;
  const adminCount = 3;

  const instructors = Array.from({ length: instructorsCount }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.INSTRUCTOR,
    bio: makeBio(),
    profilePicture: fakePfp(),
  }));
  const tas = Array.from({ length: taCount }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.TA,
    bio: makeBio(),
    profilePicture: fakePfp(),
  }));
  const students = Array.from({ length: studentCount }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.STUDENT,
    bio: makeBio(),
    profilePicture: fakePfp(),
  }));
  const admins = Array.from({ length: adminCount }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.ADMIN,
    bio: makeBio(),
    isAdmin: true,
    profilePicture: fakePfp(),
  }));

  await prisma.user.createMany({
    data: [...instructors, ...tas, ...students, ...admins],
  });

  const [instructorIds, taIds, studentIds] = await Promise.all([
    prisma.user.findMany({
      where: { role: Role.INSTRUCTOR },
      select: { id: true },
    }),
    prisma.user.findMany({ where: { role: Role.TA }, select: { id: true } }),
    prisma.user.findMany({
      where: { role: Role.STUDENT },
      select: { id: true },
    }),
  ]);

  // --- COURSES ---
  const totalCourses = 3;
  const courseData = Array.from({ length: totalCourses }).map(() => {
    const instructor = faker.helpers.arrayElement(instructorIds).id;
    const assignedTAs = faker.helpers.arrayElements(taIds, { min: 1, max: 2 });
    return {
      courseName: faker.company.buzzPhrase(),
      description: longCourseDescription(),
      professorId: instructor,
      tas: { connect: assignedTAs.map((t) => ({ id: t.id })) },
    };
  });

  // we have to create courses individually due to relation connections
  const createdCourses = [];
  for (const data of courseData) {
    const course = await prisma.course.create({ data });
    createdCourses.push(course);
  }

  // --- ENROLL STUDENTS ---
  for (const s of studentIds) {
    const randomCourses = faker.helpers.arrayElements(
      createdCourses,
      faker.number.int({ min: 1, max: 3 }),
    );
    await prisma.user.update({
      where: { id: s.id },
      data: {
        enrolledCourses: { connect: randomCourses.map((c) => ({ id: c.id })) },
      },
    });
  }

  // --- FILES ---
  const testFiles = [
    { displayName: 'Syllabus.pdf', mimeType: 'application/pdf' },
    { displayName: 'Lecture-01.pdf', mimeType: 'application/pdf' },
    { displayName: 'Course-Policies.txt', mimeType: 'text/plain' },
  ];

  const fileInserts = [];
  for (const course of createdCourses) {
    for (const f of testFiles) {
      if (Math.random() > 0.25) {
        fileInserts.push({
          courseID: course.id,
          uploaderID: course.professorId!,
          displayName: f.displayName,
          mimeType: f.mimeType,
          size: faker.number.int({ min: 1024, max: 1024 * 50 }),
        });
      }
    }
  }
  await prisma.file.createMany({ data: fileInserts });

  // --- ASSIGNMENTS, SUBMISSIONS, ANNOUNCEMENTS ---
  const submissionBatch: any[] = [];
  const gradeBatch: any[] = [];

  for (const course of createdCourses) {
    const taGrader = taIds.length ? faker.helpers.arrayElement(taIds).id : null;
    const moduleNames = generateModuleNames(
      faker.number.int({ min: 2, max: 3 }),
    );

    const enrolledStudents = await prisma.user.findMany({
      where: {
        role: Role.STUDENT,
        enrolledCourses: { some: { id: course.id } },
      },
      select: { id: true },
    });

    for (const moduleName of moduleNames) {
      const assignmentsInModule = faker.number.int({ min: 1, max: 2 });
      for (let a = 0; a < assignmentsInModule; a++) {
        const assignment = await prisma.assignment.create({
          data: {
            title: `${moduleName}: ${faker.helpers.arrayElement([
              `Worksheet ${a + 1}`,
              `Lab ${a + 1}`,
              `Project ${a + 1}`,
            ])}`,
            description: faker.lorem.paragraph(),
            module: moduleName,
            dueDate: faker.date.future(),
            courseID: course.id,
            graderID: taGrader,
            totalPoints: faker.number.int({ min: 10, max: 100 }),
            published: true,
          },
        });

        for (const s of enrolledStudents) {
          const points = faker.number.int({
            min: 0,
            max: assignment.totalPoints,
          });
          submissionBatch.push({
            assignmentID: assignment.id,
            courseID: course.id,
            studentID: s.id,
            submissionType: faker.helpers.arrayElement(
              Object.values(SubmissionType),
            ),
            pointsEarned: points,
            createdAt: faker.date.soon({
              days: 10,
              refDate: assignment.dueDate,
            }),
            status: faker.helpers.arrayElement(Object.values(SubmissionStatus)),
            type: faker.helpers.arrayElement(Object.values(SubmissionType)),
          });

          gradeBatch.push({
            courseID: course.id,
            studentID: s.id,
            numericGrade: faker.number.int({ min: 50, max: 100 }),
          });
        }
      }
    }

    // Announcements
    const announcementData = Array.from({
      length: faker.number.int({ min: 1, max: 3 }),
    }).map(() => ({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(2, '\n\n'),
      courseID: course.id,
      posterID: course.professorId!,
      pinned: Math.random() > 0.8,
    }));
    await prisma.announcement.createMany({ data: announcementData });
  }

  // --- BATCH SUBMISSIONS & GRADES ---
  for (const batch of chunk(submissionBatch, 100)) {
    await prisma.submission.createMany({ data: batch });
  }

  // upsert for course grades
  for (const batch of chunk(gradeBatch, 100)) {
    // Upsert isn't supported in createMany, so we’ll use transaction
    await prisma.$transaction(
      batch.map((g) =>
        prisma.courseGrade.upsert({
          where: {
            courseID_studentID: {
              courseID: g.courseID,
              studentID: g.studentID,
            },
          },
          update: {},
          create: g,
        }),
      ),
    );
  }
}

main()
  .then(() => console.log('✅ Fast seeding completed.'))
  .catch((err) => {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// code generated with the help of ChatGPT
