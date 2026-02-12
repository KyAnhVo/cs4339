// ===============================
// E3: JavaScript Starter File (with JSDoc)
// ===============================

/**
 * Generate IDs for an array of titles.
 * Converts titles to lowercase and replaces spaces with hyphens.
 *
 * @param {string[]} titles - An array of section titles.
 * @returns {string[]} Array of generated IDs.
 */
function generateIds(titles) {
    // TODO: implement
    // Suggested methods: map, split, join, toLowerCase
    return titles.map(
        t => t.toLowerCase().replaceAll(' ', '-'));
}

/**
 * Filter titles containing the word "Important" and return their IDs.
 *
 * @param {string[]} titles - An array of section titles.
 * @returns {string[]} IDs of important titles.
 */
function highlightImportant(titles) {
    // TODO: implement
    // Suggested methods: filter, map, includes, split, join, toLowerCase
    let arr = [];
    for (let i = 0; i < titles.length; i++) {
        let currTitle = titles[i];
        if (currTitle.toLowerCase().includes("important")) {
            arr.push(currTitle);
        }
    }
    return generateIds(arr);
}

/**
 * Count the frequency of each word across an array of titles.
 *
 * @param {string[]} titles - An array of section titles.
 * @returns {Object} Word frequency object (word -> count).
 */
function wordFrequency(titles) {
    // TODO: implement
    // Suggested methods: flatMap, reduce, split, toLowerCase
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

/**
 * Show a message after a delay.
 *
 * @param {string} message - The message to display.
 * @param {number} delay - Delay in milliseconds.
 * @returns {void}
 */
function delayedMessage(message, delay) {
    // TODO: implement
    // Suggested methods: setTimeout, arrow function
    setTimeout(() => console.log(message), delay);
}

/**
 * Format and display a message using a callback.
 *
 * @param {string} message - The message to format.
 * @param {(msg: string) => string} formatter - Callback to format the message.
 * @returns {void}
 */
function showFormattedMessage(message, formatter) {
    // TODO: implement
    // Suggested methods: callback function
    console.log(formatter(message));
}

/**
 * Format an array of menu items using a callback.
 *
 * @param {string[]} items - Menu item labels.
 * @param {(item: string) => string} formatter - Callback to format each item.
 * @returns {string[]} Array of formatted menu items.
 */
function formatMenu(items, formatter) {
    // TODO: implement
    // Suggested methods: map, callback function
    return items.map(formatter);
}

/**
 * Update a user profile with new values.
 *
 * @param {Object} user - Original user object.
 * @param {Object} updates - Object containing fields to update.
 * @returns {Object} New user object with updates applied.
 */
function updateUser(user, updates) {
    // TODO: implement
    // Suggested methods: spread syntax
    const updatedUser = structuredClone(user);
    for (const key of Object.keys(updates)) {
        if (!(key in updateUser)) {
            continue;
        }
        updatedUser[key] = updates[key];
    }
    return updatedUser
}

/**
 * Remove the password property from a user object.
 *
 * @param {Object} user - User object that may contain a password.
 * @returns {Object} New user object without the password field.
 */
function removeSensitive(user) {
    // TODO: implement
    // Suggested methods: rest syntax
    const updatedUser = {};
    for (const key of Object.keys(user)) {
        if (key == "password") continue;
        updatedUser[key] = user[key];
    }
    return updatedUser;
}

/**
 * Merge multiple user profile objects into one.
 * Properties of later object should overide the earlier ones
 *
 * @param {...Object} profiles - User profile objects.
 * @returns {Object} Combined user profile.
 */
function mergeProfiles(...profiles) {
    // TODO: implement
    // Suggested methods: rest parameters, Object.assign or spread
    const finalProfile = {};
    for (const profile of profiles) {
        for (const key of Object.keys(profile)) {
            finalProfile[key] = profile[key];
        }
    }
    return finalProfile;
}

/**
 * Build a navigation menu from sections with priority >= 2.
 *
 * @param {Object[]} sections - List of sections (title, priority, classes).
 * @param {(title: string) => string} formatter - Callback to format section label.
 * @returns {Object[]} Array of navigation entries with id, label, and classes.
 */
function buildNavigation(sections, formatter) {
    // TODO: implement
    // Suggested methods: filter, map, split, join, toLowerCase, callback, spread

    const lst = [];
    for (const section of sections) {
        if (section.priority <= 1) continue;
    }
}

// ===============================
// Example Usage / Testing
// ===============================

// Part 1 Examples
console.log(generateIds(["About Us", "Our Projects", "Contact Info"]));
// Expected Output: ["about-us", "our-projects", "contact-info"]

console.log(highlightImportant([
  "About Us",
  "Important Notice",
  "Our Projects",
  "Very Important Update"
]));
// Expected Output: ["important-notice", "very-important-update"]

console.log(wordFrequency([
  "About Us",
  "Our Projects",
  "Important Projects",
  "Contact Us"
]));
// Expected Output: { about: 1, us: 2, our: 1, projects: 2, important: 1, contact: 1 }

// Part 2 Examples
delayedMessage("Hello after 2 seconds", 2000);
// Expected Output (after ~2 seconds): "Hello after 2 seconds"

showFormattedMessage("hello world", msg => msg.toUpperCase());
// Expected Output: "HELLO WORLD"

showFormattedMessage("new user joined", msg => "# " + msg + " #");
// Expected Output: "# new user joined #"

console.log(formatMenu(["Home", "About", "Contact"], item => "-- " + item + " --"));
// Expected Output: ["-- Home --", "-- About --", "-- Contact --"]

// Part 3 Examples
const user = { name: "Maya", age: 25, city: "Boston" };
console.log(updateUser(user, { age: 26, city: "NY" }));
// Expected Output: { name: "Maya", age: 26, city: "NY" }

console.log(removeSensitive({ name: "Maya", age: 26, password: "secret123" }));
// Expected Output: { name: "Maya", age: 26 }

console.log(mergeProfiles({ name: "Maya", age: 25 }, { age: 26 }, { city: "NY" }));
// Expected Output: { name: "Maya", age: 26, city: "NY" }

// Problem 10
const sections = [
  { title: "Home", priority: 1, classes: ["menu-item"] },
  { title: "Important Updates", priority: 3, classes: ["menu-item", "highlight"] },
  { title: "Contact", priority: 2, classes: ["menu-item"] }
];

console.log(buildNavigation(sections, title => "# " + title.toUpperCase() + " #"));
// Expected Output:
// [
//   { id: "important-updates", label: "# IMPORTANT UPDATES #", classes: ["menu-item","highlight"] },
//   { id: "contact", label: "# CONTACT #", classes: ["menu-item"] }
// ]
