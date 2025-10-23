import { faker } from '@faker-js/faker';
import { PrismaClient } from './client';
import { Role, SubmissionType, SubmissionStatus } from './enums';

const prisma = new PrismaClient();

async function main() {
  const optionalBio = () =>
    Math.random() > 0.5 ? faker.lorem.sentences(2) : null;
  const fakePfp = () =>
    `https://i.pravatar.cc/150?img=${faker.number.int({ min: 1, max: 70 })}`;

  // --- USERS ---
  // Create instructors (professors)
  const instructorData = Array.from({ length: 14 }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.INSTRUCTOR,
    bio: optionalBio(),
    profilePicture: fakePfp(),
  }));
  await prisma.user.createMany({ data: instructorData });

  // Create TAs
  const taData = Array.from({ length: 15 }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.TA,
    bio: optionalBio(),
    profilePicture: fakePfp(),
  }));
  await prisma.user.createMany({ data: taData });

  // Create Students
  const studentData = Array.from({ length: 40 }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.STUDENT,
    bio: optionalBio(),
    profilePicture: fakePfp(),
  }));
  await prisma.user.createMany({ data: studentData });

  // Create Admins
  const adminData = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    role: Role.ADMIN,
    bio: optionalBio(),
    isAdmin: true,
    profilePicture: fakePfp(),
  }));
  await prisma.user.createMany({ data: adminData });

  const instructors = await prisma.user.findMany({
    where: { role: Role.INSTRUCTOR },
    select: { id: true },
  });
  const tas = await prisma.user.findMany({
    where: { role: Role.TA },
    select: { id: true },
  });
  const students = await prisma.user.findMany({
    where: { role: Role.STUDENT },
    select: { id: true },
  });

  // --- COURSES ---
  for (let i = 0; i < 6; i++) {
    const randomInstructor = faker.helpers.arrayElement(instructors).id;
    const assignedTAs =
      i === 0 ? [] : faker.helpers.arrayElements(tas, { min: 1, max: 2 });
    const enrolledStudents = faker.helpers.arrayElements(students, {
      min: 20,
      max: 30,
    });

    const course = await prisma.course.create({
      data: {
        courseName: faker.company.catchPhrase(),
        description: faker.lorem.sentences(3),
        professorId: randomInstructor,
        tas: { connect: assignedTAs.map((t) => ({ id: t.id })) },
        students: { connect: enrolledStudents.map((s) => ({ id: s.id })) },
      },
    });

    // --- FOLDERS ---
    const root = await prisma.folder.create({
      data: { courseID: course.id, name: 'Root Folder' },
    });
    const child = await prisma.folder.create({
      data: { courseID: course.id, name: 'Week 1', parentId: root.id },
    });
    const grandchild = await prisma.folder.create({
      data: { courseID: course.id, name: 'Lecture Slides', parentId: child.id },
    });

    // --- FILES ---
    const testFiles = [
      { displayName: 'Intro.pdf', mimeType: 'application/pdf' },
      {
        displayName: 'Notes.docx',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      },
      { displayName: 'Homework.zip', mimeType: 'application/zip' },
      { displayName: 'Image1.jpg', mimeType: 'image/jpeg' },
      { displayName: 'Syllabus.txt', mimeType: 'text/plain' },
    ];

    for (const f of testFiles) {
      if (Math.random() > 0.3) {
        await prisma.file.create({
          data: {
            courseID: course.id,
            folderID: grandchild.id,
            uploaderID: randomInstructor,
            displayName: f.displayName,
            path: `/files/${f.displayName}`,
            mimeType: f.mimeType,
            size: faker.number.int({ min: 1024, max: 1024 * 50 }),
          },
        });
      }
    }

    // --- ASSIGNMENTS ---
    const moduleNames = faker.helpers.arrayElements(
      ['Module A', 'Module B', 'Module C', 'Module D'],
      { min: 2, max: 4 },
    );

    for (let a = 0; a < 3; a++) {
      const taGrader = tas.length ? faker.helpers.arrayElement(tas).id : null;
      const allowEC = Math.random() > 0.5;
      const revokedEC = Math.random() > 0.7;
      const moduleName = faker.helpers.arrayElement(moduleNames);

      const assignment = await prisma.assignment.create({
        data: {
          title: `Assignment ${a + 1}: ${faker.hacker.phrase()}`,
          description: faker.lorem.sentences(2),
          module: moduleName,
          dueDate: faker.date.future(),
          courseID: course.id,
          graderID: taGrader,
          totalPoints: faker.number.int({ min: 10, max: 100 }),
          published: a !== 2,
          allowEarlyECSubmissionIncentive: allowEC,
          extraCreditTotalPointsIncentive: allowEC
            ? parseFloat((Math.random() * 1 + 0.1).toFixed(1))
            : 0,
          revokedECSubmissionIncentive: revokedEC,
        },
      });

      // --- SUBMISSIONS + GRADES ---
      for (const s of enrolledStudents) {
        const daysEarly = allowEC ? faker.number.int({ min: 0, max: 5 }) : 0;
        const submissionDate = new Date(assignment.dueDate);
        submissionDate.setDate(submissionDate.getDate() - daysEarly);

        let feedbackText: string | null = null;
        let feedbackPosterId: string | null = null;
        if (Math.random() > 0.5) {
          feedbackPosterId = taGrader ?? randomInstructor;
          feedbackText = faker.lorem.sentences(2);
        }

        const maxPoints =
          assignment.totalPoints + assignment.extraCreditTotalPointsIncentive;

        const draftContent =
          Math.random() > 0.5 ? faker.lorem.paragraph() : null;
        const scheduledSubmitAt =
          Math.random() > 0.5 ? faker.date.future() : null;
        const isScheduledSubmitEnabled = Math.random() > 0.7;
        const status = faker.helpers.arrayElement(
          Object.values(SubmissionStatus),
        );
        const submissionType = faker.helpers.arrayElement(
          Object.values(SubmissionType),
        );

        await prisma.submission.create({
          data: {
            assignmentID: assignment.id,
            courseID: course.id,
            studentID: s.id,
            submissionType,
            pointsEarned: faker.number.int({
              min: 0,
              max: Math.floor(maxPoints),
            }),
            createdAt: submissionDate,
            feedback: feedbackText,
            feedbackPosterId: feedbackPosterId,
            draftContent,
            scheduledSubmitAt,
            isScheduledSubmitEnabled,
            status,
            type: submissionType,
          },
        });

        // Create or upsert grade — ensures every student has a grade in the course
        await prisma.courseGrade.upsert({
          where: {
            courseID_studentID: {
              courseID: course.id,
              studentID: s.id,
            },
          },
          update: {},
          create: {
            courseID: course.id,
            studentID: s.id,
            numericGrade: faker.number.int({ min: 50, max: 100 }),
          },
        });
      }
    }

    // --- ANNOUNCEMENTS ---
    const announcementCount = faker.number.int({ min: 2, max: 5 });
    for (let j = 0; j < announcementCount; j++) {
      await prisma.announcement.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(2),
          courseID: course.id,
          posterID: randomInstructor,
          pinned: Math.random() > 0.8,
        },
      });
    }
  }
}

main()
  .then(() =>
    console.log(
      '✅ Seeding completed with consistent professors, grades, announcements, and descriptions',
    ),
  )
  .catch((err) => {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Seed code was generated with the help of ChatGPT
