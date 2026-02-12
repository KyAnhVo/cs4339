// Problem 1: Generate ID

function generateIds(titles) {
    return titles.map(
        t => t.toLowerCase().replaceAll(' ', '-'));
}

console.log(generateIds(["About Us", "Our Projects", "Contact Info"]));

// PROBLEM 2: Highlight Important

function highlightImportant(titles) {
    let arr = [];
    for (let i = 0; i < titles.length; i++) {
        let currTitle = titles[i];
        if (currTitle.toLowerCase().includes("important")) {
            arr.push(currTitle);
        }
    }
    return generateIds(arr);
}

console.log(highlightImportant([
    "About Us",
    "Important Notice",
    "Our Projects",
    "Very Important Update"
]));

// PROBLEM 3: World Frequency

function wordFrequency(titles) {
    let counter = {};
    titles.forEach((title) => {
        let wordArr = title.toLowerCase().split(' ');
        wordArr.forEach((word) => {
            if (word in counter) {
                counter[word]++;
            } else {
                counter[word] = 1;
            }
        })
    })
    return counter;
}

console.log(wordFrequency([
    "About Us",
    "Our Projects",
    "Important Projects",
    "Contact Us"
]));

// PROBLEM 4: Delayed Message

function delayedMessage(message, delay) {
    setTimeout(() => console.log(message), delay);
}

delayedMessage("Welcome to our site!", 2000);

// PROBLEM 5: Custom Message Formatter

function showFormattedMessage(message, formatter) {
    console.log(formatter(message));
}

showFormattedMessage("hello world", msg => msg.toUpperCase());
showFormattedMessage("new user joined", msg => "# " + msg + " #");

// PROBLEM 6: Format Navigation System

function formatMenu(items, formatter) {
    return items.map(formatter);
}

const menu = ["Home", "About", "Contact"];
console.log(formatMenu(menu, item => item.toUpperCase()));

// PROBLEM 7: Update User Profile
// 
// Assumption: All keys in update that does not appear
// in user is to be ginored.

function updateUser(user, update) {
    const updatedUser = structuredClone(user);
    for (const key of Object.keys(update)) {
        if (!(key in updateUser)) {
            continue;
        }
        updatedUser[key] = update[key];
    }

    return updatedUser
}

const user = { name: "Maya", age: 25, city: "Boston" };
const updates = { age: 26, city: "New York" };
console.log(updateUser(user, updates));

// PROBLEM 8: Remove Sensitive Data
//
// Assumption: Only password is sensitive info.

function removeSensitive(user) {
    const updatedUser = {};
    for (const key of Object.keys(user)) {
        if (key == "password") continue;
        updatedUser[key] = user[key];
    }
    return updatedUser;
}

const user2 = { name: "Maya", age: 26, password: "secret123" };
console.log(removeSensitive(user2));

// PROBLEM 9: Merge multiple profiles

function mergeProfiles(...profiles) {
    const finalProfile = {};
    for (const profile of profiles) {
        for (const key of Object.keys(profile)) {
            finalProfile[key] = profile[key];
        }
    }
    return finalProfile;
}

console.log(mergeProfiles(
  { name: "Maya", age: 25 },
  { age: 26 },
  { city: "NY" }
));

// PROBLEM 10: Build mini navigation System

function buildNavigation(sections, formatter) {
    const lst = [];
    for (const section of sections) {
        if (section.priority <= 1) continue;
    }
}
