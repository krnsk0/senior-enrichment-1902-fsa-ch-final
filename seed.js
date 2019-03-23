const { green, red } = require('chalk');
const { db } = require('./server/db');
const Campus = require('./server/db/campus');
const Student = require('./server/db/student');

// helpers for randomCampusFactory
const campusNamesFirst = [
  'Omicron',
  'Poseidon',
  'Alpha',
  'Proxima',
  'Omega',
  'Psi',
  'Galerius',
  'Antaeus',
  'Xian',
  'Florian'
];
const campusNamesSecond = [
  'Centurion',
  'Zeconis',
  'Valissian',
  'Geminus',
  'Prime',
  'Gorganos',
  'Helion',
  'Hephaestus',
  'Argosa',
  'Tiberius'
];
const addressParts = [
  'Orion Nebula',
  'Ring Nebula',
  'Oort Cloud',
  'Sirius A',
  ' Sirius B',
  'M80',
  'Pleadies',
  'Whirlpool Galaxy',
  'Galactic Filament 842.B',
  'Abel 901/902 Supercluster'
];
const firstNames = [
  'Jarvis',
  'Debora',
  'Joline',
  'Sanora',
  'Ronald',
  'Daniel',
  'Amelia',
  'Paul',
  'Dwayne',
  'Terrence'
];

const lastNames = [
  'Ogden',
  'Nagler',
  'Baynes',
  'Harris',
  'Ambler',
  'Hsu',
  'Dilorenzo',
  'Findley',
  'Wollver',
  'Legosier'
];
// thanks to http://fillerama.io/
const sentences = [
  "We'll go deliver this crate like professionals, and then we'll go home.",
  'In your face, Gandhi!',
  "Fry, you can't just sit here in the dark listening to classical music.",
  'The way I see it, every life is a pile of good things and bad things.',
  "Oh I beg to differ, I think we have a lot to discuss. After all, you are a client. Tonight's the night. And it's going to happen again and again.",
  "Don't be too proud of this technological terror you've constructed. The ability to destroy a planet is insignificant next to the power of the Force.",
  'Mrs. Krabappel and Principal Skinner were in the closet making babies and I saw one of the babies and then the baby looked at me.',
  "There's only one man I've ever called a coward, and that's Brian Doyle Murray.",
  "There's so many poorly chosen words in that sentence.",
  'Hokey religions and ancient weapons are no match for a good blaster at your side, kid.'
];

const randomIndex = length => {
  return Math.floor(Math.random() * length);
};

// creates a campus object
const randomCampusFactory = () => {
  const campusFName = campusNamesFirst[randomIndex(10)];
  const campusLName = campusNamesSecond[randomIndex(10)];
  const address = `${randomIndex(100)}.${randomIndex(1000)} ${
    addressParts[randomIndex(10)]
  }`;
  const description = `${sentences[randomIndex(10)]} ${
    sentences[randomIndex(10)]
  } ${sentences[randomIndex(10)]}`;
  return {
    name: `${campusFName} ${campusLName}`,
    imageUrl: `/planet-images/${randomIndex(10) + 1}.jpg`,
    address,
    description
  };
};

// creates a student object assigned to the provided campus id for passing into the db
const randomStudentFactory = (campusId = null) => {
  const firstName = firstNames[randomIndex(10)];
  const lastName = lastNames[randomIndex(10)];
  return {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}@${lastName.toLowerCase()}.com`,
    imageUrl: `https://robohash.org/${firstName}${lastName}`,
    campusId,
    gpa: Number((Math.random() * 4).toFixed(2))
  };
};

// Build an array of six campuses. These will have ids 0 through 5
const randomCampusArray = Array.from({ length: 6 }, () =>
  randomCampusFactory());

// Build an array of fifty students, cycling through each campus 0 through 4. Campus index 5 will have no students.
const randomStudentArray = Array.from({ length: 50 }, (_, i) =>
  randomStudentFactory((i % 5) + 1));

// create one student with no campus and add to array
const studentWithNoCampus = randomStudentFactory();
randomStudentArray.push(studentWithNoCampus);

// do the seeding
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Campus.bulkCreate(randomCampusArray, { validate: true });
    await Student.bulkCreate(randomStudentArray, { validate: true });
    db.close();
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
