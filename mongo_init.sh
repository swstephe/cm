mongo <<SCRIPT
use contacts
db.contacts.remove({})
db.contacts.insert({
    "first" : "John",
    "last" : "Tolkien",
    "email" : "tolien@inklinks.com",
    "phone" : "867-5309"
})
db.contacts.insert({
    "first" : "Clive",
    "last" : "Lewis",
    "email" : "lewis@inklings.com",
    "phone" : "867-5309"
})
db.contacts.insert({
    "first" : "Owen",
    "last" : "Barfield",
    "email" : "barfield@inklings.com",
    "phone" : "867-5309"
})
db.contacts.insert({
    "first" : "Charles",
    "last" : "Williams",
    "email" : "williams@inklings.com",
    "phone" : "867-5309"
})
db.contacts.insert({
    "first" : "Roger",
    "last" : "Green",
    "email" : "green@inklings.com",
    "phone" : "867-5309"
})
SCRIPT
