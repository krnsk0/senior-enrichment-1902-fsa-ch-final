const { green, red } = require('chalk');
const { db } = require('./server/db');
const Campus = require('./server/db/campus');
const Student = require('./server/db/student');

// shuffle using fisher-yates
// some lists shuffled to prevent repeat data
const shuffle = array => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const campusNamesFirst = shuffle([
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
]);

const campusNamesSecond = shuffle([
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
]);

const campusNamesThird = shuffle([
  '',
  '',
  '',
  '',
  '',
  '',
  'IV',
  'X',
  'Z',
  'A',
  'B',
  'III',
  'I',
  'II',
  'V',
  '6'
]);
const addressParts = shuffle([
  'Orion Nebula',
  'Ring Nebula',
  'Oort Cloud',
  'Sirius A',
  'Sirius B',
  'M80',
  'Pleadies',
  'Whirlpool Galaxy',
  'Galactic Filament 842.B',
  'Abel 901/902 Supercluster'
]);
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
  'Terrence',
  'Bobby',
  'Frank',
  'Susan',
  'Peter',
  'Daphne',
  'Annie',
  'Janora',
  'Danielle',
  'Tara',
  'Samuel',
  'Einde',
  'Anand',
  'Eze',
  'Ozath',
  'Urko',
  'Iehmit',
  'Strumme',
  'Rhea',
  'Kitty',
  'Gerry',
  'Gertrude',
  'Darlene',
  'Darryl',
  'Gwyneth',
  'Haley',
  'Jamie',
  'Janeczka',
  'Jenny',
  'Daniel',
  'Natasha',
  'Anne',
  'Chloe',
  'Chris',
  'Andrew',
  'Mikey',
  'Fluffy'
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
  'Legosier',
  'Chen',
  'Bennett',
  'Wood',
  'Barnes',
  'Hernandez',
  'Green',
  'Taylor',
  'Cox',
  'Butler',
  'Diaz',
  'Harris',
  'Perry',
  'Ramirez',
  'Zhang',
  'Zhao',
  'Basak',
  'Jani',
  'Khatri',
  'Banerjee',
  'Gixols',
  'Grax',
  'Xzyvxzq',
  'Starswonk',
  'Koerm',
  'Thunberg',
  'Mueller',
  'Harris'
];

// thanks to https://www.allegro.cc/iotd/view/2005-08-24
const planetImageIndices = shuffle(Array.from({ length: 10 }, (_, i) => i + 1));

// thanks to http://fillerama.io/ and https://www.infoplease.com/arts-entertainment/movies-and-videos/top-100-movie-quotes
const sentences = shuffle([
  "We'll go deliver this crate like professionals, and then we'll go home.",
  'In your face, Gandhi!',
  "Fry, you can't just sit here in the dark listening to classical music.",
  'The way I see it, every life is a pile of good things and bad things.',
  "Oh I beg to differ, I think we have a lot to discuss. After all, you are a client. Tonight's the night. And it's going to happen again and again.",
  "Don't be too proud of this technological terror you've constructed. The ability to destroy a planet is insignificant next to the power of the Force.",
  'Mrs. Krabappel and Principal Skinner were in the closet making babies and I saw one of the babies and then the baby looked at me.',
  "There's only one man I've ever called a coward, and that's Brian Doyle Murray.",
  "There's so many poorly chosen words in that sentence.",
  'Hokey religions and ancient weapons are no match for a good blaster at your side, kid.',
  "Bad news. Andy Griffith turned us down. He didn't like his trailer.",
  "I hear the jury's still out on science. I care deeply for nature.",
  "I'm not the monster he wants me to be. So I'm neither man nor beast. I'm something new entirely. With my own set of rules.",
  "All I want is to be a monkey of moderate intelligence who wears a suit. That's why I'm transferring to business school!",
  "Don't shoot fire stick in space canoe! Cause explosive decompression!",
  'Goodbye, cruel world. Goodbye, cruel lamp. Goodbye, cruel velvet drapes, lined with what would appear to be some sort of cruel muslin and the cute little pom-pom curtain pull cords. Cruel though they may be... ',
  'This is the greatest case of false advertising I\'ve seen since I sued the movie "The Never Ending Story."',
  'Kids, we need to talk for a moment about Krusty Brand Chew Goo Gum Like Substance.',
  'Send a distress signal, and inform the Senate that all on board were killed.',
  'Several transmissions were beamed to this ship by Rebel spies. I want to know what happened to the plans they sent you.',
  "I'm going to make him an offer he can't refuse.",
  "Frankly, my dear, I don't give a damn.",
  "You don't understand! I coulda had class. I coulda been a contender. I coulda been somebody, instead of a bum, which is what I am.",
  "Toto, I've got a feeling we're not in Kansas anymore.",
  "I'm going to make him an offer he can't refuse.",
  "What we've got here is failure to communicate.",
  'A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti.',
  "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
  "Badges? We ain't got no badges! We don't need no badges! I don't have to show you any stinking badges!",
  'I love the smell of napalm in the morning.'
]);

const randomInt = length => {
  return Math.floor(Math.random() * length);
};

// creates a campus object
const randomCampusFactory = () => {
  const address = `${randomInt(100)}.${randomInt(1000)} ${addressParts.pop()}`;
  const description = `${sentences.pop()} ${sentences.pop()} ${sentences.pop()}`;
  return {
    name: `${campusNamesFirst.pop()} ${campusNamesSecond.pop()} ${campusNamesThird.pop()}`.trim(),
    imageUrl: `/images/${planetImageIndices.pop()}.png`,
    address,
    description
  };
};

// creates a student object assigned to the provided campus id
const randomStudentFactory = (campusId = null) => {
  const firstName = firstNames[randomInt(firstNames.length - 1)];
  const lastName = lastNames[randomInt(lastNames.length - 1)];
  return {
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}@${lastName.toLowerCase()}.com`,
    imageUrl: `https://robohash.org/${firstName}${lastName}`,
    campusId,
    gpa: Number((Math.random() * 4).toFixed(2))
  };
};

// Build an array of ten campuses. These will have ids 0 through 9
const randomCampusArray = Array.from({ length: 10 }, () =>
  randomCampusFactory());

// Build an array of 90 students, cycling through each campus 0 through 9.
// Campus index 9 will have no students.
const randomStudentArray = Array.from({ length: 90 }, (_, i) =>
  randomStudentFactory((i % 9) + 1));

// create one student with no campus and add to array
const studentWithNoCampus = randomStudentFactory();
randomStudentArray.push(studentWithNoCampus);

// do the seeding
const seed = async () => {
  try {
    await db.sync({ force: true });
    await Campus.bulkCreate(randomCampusArray, { validate: true });
    await Student.bulkCreate(randomStudentArray, { validate: true });
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
